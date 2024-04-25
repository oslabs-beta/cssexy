import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchElementRules } from '../features/fetchElementRules.js';
import { getCssValueOptions } from '../features/getCssValueOptions.js';

function SidebarStyling(props) {
    // console.log('SidebarStyling: props', props);
    const dispatch = useDispatch();

    const rules = useSelector(state => state.rules)
    const target = useSelector(state => state.target)
    const storeVar = { rules, target }

    const inlineRules = rules.inlineRules;

    // spread operator to make a deep copy of props, so that we can then modify it.
    const liveProps = { ...props };

    const [values, setValues] = useState({});
    const [clickedPropertyField, setClickedPropertyField] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const [dropdownItems, setDropdownItems] = useState([]);

    // this useEffect ensures that 'values' is updated only when props.cssProperties changes, rather than on every re-render.
    // i was getting some rerendering errors prior to this when modifying source files.
    useEffect(() => {
        setValues(
            liveProps.cssProperties.reduce((acc, cssProp) => {
                acc[cssProp.name] = cssProp.value;
                return acc;
            }, {})
        );
    }, [props.cssProperties]);

    const handleSubmit = async (cssProp, item) => {
        // setShowDropdown(false);

        const newValue = typeof item === 'string' ? item : values[cssProp.name];
        // console.log('newValue', newValue);

        // console.log('cssProp', cssProp);
        const data = { ...cssProp }
        data.value = newValue;
        data.valuePrev = cssProp.value;
        data.textPrev = cssProp.text;
        data.text = `${cssProp.name}: ${newValue};`;
        data.path = cssProp.path;
        data.textPrevAll = inlineRules[0].rule.style.cssText;
        data.line = liveProps?.line;
        data.lineText = liveProps?.lineText;
        data.type = liveProps?.type;
        data.typeValue = liveProps?.typeValue;
        data.selector = target.targetSelector;

        // console.log(cssProp.name);
        // console.log(cssProp.value);
        // console.log('->');
        // console.log(data.value);
        // console.log('\n');
        // console.log('data', data);
        // console.log('\n\n');
        // console.log('TRY: /patch');
        try {
            const response = await fetch('/patch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data, target}),

            });
            const result = await response.json();

            if (result === true) {
                console.log('result, true', result);
                // console.log('TRY: /runCdp');

                // wait for .5 seconds. not doing this atm leads to a mismatch between the value in the input field and the corresponding value in the file, which then prevents further editing of that value (until the element is clicked again) because our patchFile function matches one to the other in order to replace the value with the new value.
                // inline styles need a bit more time, so if theres no source path, wait 1 second.
                await new Promise(resolve => data.type ? setTimeout(resolve, 1000) : setTimeout(resolve, 500));

                // running CDP again to update our redux store after patching the file.
                await fetchElementRules({data, dispatch, storeVar});
                setValues({});


                // probably around here is where we'll track undo/redo.
            }
        }
        catch (error) {
            console.log('error in runCdp', error);
        }
    };


    const handleClickField = (cssProp) => {
        const possibleValues = getCssValueOptions(cssProp);
        setDropdownItems(possibleValues);
        setShowDropdown(true);
        setClickedPropertyField(cssProp.name);
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const styleParagraphs = liveProps.cssProperties.map((cssProp, idx) => {
        if ((liveProps.origin === 'user-agent')) {
            return (
                <p key={`styleParagraphs-${idx}`} className='style-paragraph'>
                    <span className={`style-property-span ${!cssProp.isActive ? 'style-property-overwritten-span' : ''}`}>
                        {cssProp.name}:
                    </span>
                    <span className={`style-value-span ${!cssProp.isActive ? 'style-value-overwritten-span' : ''}`}>
                        {cssProp.value}
                    </span>
                </p>
            )
        }
        // if not user agent style, then it's a regular or inline style (at the moment 2024-04-03), which we make editable below.
        else if (liveProps.origin && cssProp.text) {
            // cssProperties arr includes both user defined 'shorthand' styles and css 'longhand' styles. We want to render only user defined styles => style is user defined if it has .text property
            // shorthand example: 'border-bottom: 3px solid blueviolet'
            // longhand example: border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: blueviolet
            return (
                <div>
                    <p key={`styleParagraphs-${idx}`} className='style-paragraph'>
                        <span className={`style-property-span ${!cssProp.isActive ? 'style-property-overwritten-span' : ''}`}>
                            {cssProp.name}:
                        </span>
                        <input
                            className={`style-value-input-span ${!cssProp.isActive ? 'style-value-input-overwritten-span' : ''}`}
                            value={values[cssProp.name] || cssProp.value || ''}
                            onClick={(e) => handleClickField(cssProp, e)}
                            onChange={(e) => {
                                setValues({ ...values, [cssProp.name]: e.target.value })
                                // console.log('values', values)
                            }}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    // console.log('e.target.value', e.target.value);
                                    handleSubmit(cssProp, e)
                                    // 'blur': makes the input field lose focus, i.e. the cursor disappears, it won't be editable until it's clicked again
                                    e.currentTarget.blur()
                                }
                            }}
                            spellCheck='false' /* Disable spellcheck, i.e. no more red squiggles under the values when clicked/edited but not a complete word */
                        />
                    </p>
                    {showDropdown && clickedPropertyField === cssProp.name && (
                        <div className='property-dropdown'
                            ref={dropdownRef}
                            style={{ left: `${cssProp.name.length * 8 + 5}px` }}>
                            {dropdownItems.map((item, index) => (
                                <div
                                    className='property-dropdown-item'
                                    key={`property-dropdown-item-${index}`}
                                    onClick={(e) => {
                                        // console.log('click in dropdown', item);
                                        // console.log('cssProp', cssProp);
                                        // setValues({ ...values, [cssProp.name]: item })
                                        // console.log('values', values)
                                        setShowDropdown(false);
                                        handleSubmit(cssProp, item)
                                    }}
                                //     onMouseOver={
                                //         () => {
                                //      console.log('item hovered', item)
                                //     if (liveProps.origin === 'regular') {
                                //         handleSubmit(cssProp, item)
                                //     }
                                //     }
                                // }
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            )
        }
    }
    )

    return (
        <div className='style-container'>
            <div className='selector-div'>
                {liveProps.selector && <p key={liveProps.selector}>{liveProps.selector} </p>}
                {/* {liveProps?.source?.paths[0] && <p key={liveProps?.source?.paths[0]}>{liveProps?.source?.paths[0]} </p>} */}
            </div>
            {styleParagraphs.map((paragraph, index) => (
                <React.Fragment key={`style-paragraph-${index}`}>{paragraph}</React.Fragment>
            ))}
            <br />
        </div>
    )
};


export default SidebarStyling;
