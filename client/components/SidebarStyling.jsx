import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateNodeData, updateMidShortMap } from '../slices/rulesSlice.js';

function SidebarStyling(props) {

    const dispatch = useDispatch();

    const data = useSelector(state => state.nodeData.data);
    const inlineRules = useSelector(state => state.rules.inlineRules);

    // console.log('SidebarStyling: props', props);

    // spread operator to make a deep copy of props, so that we can then modify it.
    const liveProps = {...props};

    // console.log('liveProps', liveProps);

    const [values, setValues] = useState({});

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

    // this is the same as the fetch and reducer code in iFrameComp.jsx.
    // a good refactor would be to place this into its own reducer and fetch function, or at least in a nother file that is called by both iFrameComp and this file.
    const callCdp = async () => {
            if (!data) {
              console.log('RunCdp: runCdp: data is undefined');
              return;
            }
              const response = await fetch('/cdp', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              });

              const result = await response.json();
              console.log('sidebarStyling: runCdp: result', result);

            if (result) {
                console.log('sidebarStyling: runCdp: data', data);
                dispatch(updateNodeData(data));

                dispatch(updateInlineRules(result.inlineRules));
                dispatch(updateRegularRules(result.regularRules));
                dispatch(updateUserAgentRules(result.userAgentRules));
                dispatch(updateStyleSheets(result.styleSheets));
                dispatch(updateInheritedRules(result.inheritedRules));

                // actions needed for style overwrite functionality
                dispatch(updateShortLongMaps());
                dispatch(updateMidShortMap());
                dispatch(setIsActiveFlag());
                dispatch(findActiveStyles());

            }
    };

    const handleSubmit = async (cssProp, event) => {
        // console.log('cssProp', cssProp);
        const updatedCssProp = {...cssProp, value: values[cssProp.name]};
        updatedCssProp.valuePrev = cssProp.value;
        updatedCssProp.textPrev = updatedCssProp.text;
        updatedCssProp.text = `${cssProp.name}: ${values[updatedCssProp.name]};`;
        // console.log('\n');
        // console.log(cssProp.name);
        // console.log(cssProp.value);
        // console.log('->');
        // console.log(updatedCssProp.value);
        // console.log('\n');

        updatedCssProp.selector = liveProps.selector;
        updatedCssProp.sourcePath = liveProps.sourcePath;

        const textPrevAll = inlineRules[0].rule.style.cssText;
        updatedCssProp.textPrevAll = textPrevAll;

        console.log('updatedCssProp', updatedCssProp);
        // console.log('TRY: /patch');
        try {
            const response = await fetch('/patch', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedCssProp),

            });
            const result = await response.json();

            if (result === true) {
                // console.log('TRY: /runCdp');

                // wait for .5 seconds. not doing this atm leads to a mismatch between the value in the input field and the corresponding value in the file, which then prevents further editing of that value (until the element is clicked again) because our patchFile function matches one to the other in order to replace the value with the new value.
                // inline styles need a bit more time, so if theres no source path, wait 1 second.
                await new Promise(resolve => updatedCssProp.sourcePath ? setTimeout(resolve, 500) : setTimeout(resolve, 1000));

                // running CDP again to update our redux store after patching the file.
                await callCdp();

                // probably around here is where we'll track undo/redo.
            }
        }
        catch(error) {
            console.log('error in runCdp', error);
        }
    };

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
        else if ((liveProps.origin && cssProp.text)) {
            // cssProperties arr includes both user defined 'shorthand' styles and css 'longhand' styles. We want to render only user defined styles => style is user defined if it has .text property
            // shorthand example: 'border-bottom: 3px solid blueviolet'
            // longhand example: border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: blueviolet
            return (
                <p key={`styleParagraphs-${idx}`} className='style-paragraph'>
                    <span className={`style-property-span ${!cssProp.isActive ? 'style-property-overwritten-span' : ''}`}>
                        {cssProp.name}:
                    </span>
                        <input
                            className={`style-value-input-span ${!cssProp.isActive ? 'style-value-input-overwritten-span' : ''}`}
                            value={values[cssProp.name] || cssProp.value || ''}
                            onChange={(e) => setValues({...values, [cssProp.name]: e.target.value})}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmit(cssProp, e)
                                    // 'blur': makes the input field lose focus, i.e. the cursor disappears, it won't be editable until it's clicked again
                                    e.currentTarget.blur()
                                }
                            }}
                            spellCheck='false' /* Disable spellcheck, i.e. no more red squiggles under the values when clicked/edited but not a complete word */
                        />

                </p>
            )
        }
        }
    )

    return (
        <div className='style-container'>
            <div className='selector-div'>
                {liveProps.selector && <p>{liveProps.selector} </p>}
            {/* {liveProps?.source?.paths[0] && <p>{liveProps?.source?.paths[0]} </p>} */}
            </div>
            {styleParagraphs}
            <br />
        </div>
    )
};

export default SidebarStyling;
