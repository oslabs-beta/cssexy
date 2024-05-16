import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchElementRules } from '../slices/targetSlice.js';

import { getCssValueOptions } from '../features/getCssValueOptions.js';

import { openSourceFile } from '../features/openSourceFile.js';


function SidebarStyling(props) {
    console.log('sidebarStyling');
    // console.log('SidebarStyling: props', props);
    const dispatch = useDispatch();

    const rules = useSelector(state => state.rules)
    const target = useSelector(state => state.target);
    const inlineRules = rules.inlineRules;

    // spread operator to make a deep copy of props, so that we can then modify it.
    const liveProps = { ...props };
    // console.warn('SidebarStyling: liveProps', liveProps);

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
        console.warn('SidebarStyling: liveProps updated', liveProps);

    }, [props.cssProperties]);

    const handleSubmit = async (cssProp, item) => {
        // console.log('SidebarStyling: handleSubmit: cssProp', cssProp);
        // console.log('SidebarStyling: handleSubmit: item', item);
        setShowDropdown(false);

        const newValue = typeof item === 'string' ? item : values[cssProp.name];

        const data = {
            ...cssProp,
            value: newValue,
            valuePrev: cssProp.value,
            textPrev: cssProp.text,
            // todo 2024-05-15_07-46-AM: remove this property, as it doesn’t string match to textPrev.
            text: `${cssProp.name}: ${newValue},`,
            path: cssProp.path,
            textPrevAll: inlineRules[0].rule.style.cssText,
            line: liveProps?.line,
            type: liveProps?.type,
            typeValue: liveProps?.typeValue,
            selector: target.targetSelector,
        }

        // console.log('SidebarStyling: handleSubmit: data', data);
        // console.log('SidebarStyling: handleSubmit: target', target);

        // console.log('\n\n');
        // console.log('TRY: /patch');
        try {
            const response = await fetch('/patch', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, target }),

            });
            const result = await response.json();

            console.log('SidebarStyling: handleSubmit: result', result);

            if (result === true) {
                console.warn('sidebarStyling: result, true', result);
                // console.log('TRY: /runCdp');

                // wait for .5 seconds. not doing this atm leads to a mismatch between the value in the input field and the corresponding value in the file, which then prevents further editing of that value (until the element is clicked again) because our patchFile function matches one to the other in order to replace the value with the new value.
                // inline styles need a bit more time, so if theres no source path, wait 1 second.
                // 2024-05-15_07-46-AM: doesn’t maintain the modified regular value in the sidebar at the moment.
                await new Promise(resolve => data.type ? setTimeout(resolve, 1000) : setTimeout(resolve, 1500));

                // running CDP again to update our redux store after patching the file.
        console.warn('SidebarStyling: handleSubmit: result true: passing data to fetchElementRules. looking for the value of our modified property', data);

                fetchElementRules({ data });
                // setValues({});


                // probably around here is where we'll track undo/redo.
            }
        }
        catch (error) {
            console.log('sidebarStyling: error in runCdp', error);
        }
    };

    const handleClickField = (cssProp) => {
        const possibleValues = getCssValueOptions(cssProp);
        setDropdownItems(possibleValues);
        setShowDropdown(true);
        setClickedPropertyField(cssProp.name);
        console.warn('sidebar styling: clicked field', cssProp);
    };

    const handleFieldChange = (e) => {
        if (e.target.value.length > -1) {
            // console.log('values not null', values)
            setValues({ ...values, [clickedPropertyField]: e.target.value });
        }
        else {
            setValues({ [clickedPropertyField]: null });
            console.log('sidebarStyling: values should be null', values)
        }
    };

    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                // console.log('dropdown should get hidden', dropdownRef.current);
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);
    const styleParagraphs = liveProps.cssProperties.map((cssProp, idx) => {
        // USER AGENT STYLE
        if ((liveProps.origin === 'user-agent')) {
            // console.warn('user agent style', cssProp);
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
        // REGULAR STYLE
        else if (liveProps.origin === 'regular') {
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
                            onChange={(e) => handleFieldChange(e)}
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
                        // the dropdown of standard css values for the given property
                        <div className='property-dropdown'
                            ref={dropdownRef}
                            style={{ left: `${cssProp.name.length * 8 + 5}px` }}>
                            {dropdownItems.map((item, index) => (
                                <div
                                    className='property-dropdown-item'
                                    key={`property-dropdown-item-${index}`}
                                    onClick={(e) => {
                                        setShowDropdown(false);
                                        handleSubmit(cssProp, item)
                                    }}
                                >
                                    {item}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            )
        }

        // INLINE STYLE
        else if (liveProps.origin === 'inline') {
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
                            onChange={(e) => handleFieldChange(e)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(cssProp, e)
                                    e.currentTarget.blur()
                                }
                            }}
                            spellCheck='false'
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
                                        setShowDropdown(false);
                                        handleSubmit(cssProp, item)
                                    }}
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
