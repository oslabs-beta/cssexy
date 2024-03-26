import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, findActiveStyles, updateShortLongMaps, setIsActiveFlag, updateNodeData } from '../slices/rulesSlice.js';

function SidebarStyling(props) {

    const dispatch = useDispatch();

    const data = useSelector(state => state.nodeData.data);
    const inlineRules = useSelector(state => state.rules.inlineRules);

    // making a deep copy of props, so that we can then modify it. props is immutable.
    // using JSON.parse(JSON.stringify()) instead of
    // copying props to liveProps. using JSON.parse(JSON.stringify(props)) to do so. this is a bit hacky, but it works. it involves converting props to a json string and then parsing it back into a new object.
    // const liveProps = JSON.parse(JSON.stringify(props)); // using JSON.parse and JSON.stringify to create a deep copy of props. this is often used to make a copy of an object in js.

    const liveProps = {...JSON.parse(JSON.stringify(props))}; // using the spread operator to create a deep copy of props, and JSON.parse to make sure any function or symbol values are preserved.

    // creating a copy of props using the spread operator ({...props}). this is a new syntax in ES6 and it creates a shallow copy of the object.
    // const liveProps = {...props};

    // using Object.assign to make a shallow copy of props. Object.assign is a built-in function in js that is used to copy the values of all enumerable properties from one or more source objects to a target object.
    // const liveProps = Object.assign({}, props);

    // console.log('\n\n\n');
    // console.log('liveProps', liveProps);
    // console.log('\n\n\n');

    const [values, setValues] = useState({});

    useEffect(() => {
        setValues(
            liveProps.cssProperties.reduce((acc, cssProp) => {
                acc[cssProp.name] = cssProp.value;
                return acc;
            }, {})
        );
    }, [props.cssProperties]);

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

              console.log('runCdp: response', response);

              const result = await response.json();
              console.log('runCdp:');

            if (result) {
              dispatch(updateNodeData(data));

              dispatch(updateInlineRules(result.inlineRules));
              dispatch(updateRegularRules(result.regularRules));
              dispatch(updateUserAgentRules(result.userAgentRules));
              dispatch(updateStyleSheets(result.styleSheets));
              dispatch(updateShortLongMaps());
              dispatch(setIsActiveFlag());
              dispatch(findActiveStyles());
            }
          };


    const handleSubmit = async (cssProp, event) => {
        console.log('cssProp', cssProp);
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

        console.log('data', updatedCssProp);
        console.log('TRY: /patch');
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
                console.log('TRY: /runCdp');
                console.log('\n\n\n');

                // wait for .5 seconds. not doing this atm leads to a mismatch between the value in the input field and the corresponding value in the file, which then prevents further editing of that value (until the element is clicked again) because our patchFile function matches one to the other in order to replace the value with the new value.
                await new Promise(resolve => setTimeout(resolve, 500));

                // running CDP again to update our redux store after patching the file.
                await callCdp();

                // and we'll update our tracking of undo/redo, our redux store perhaps, and source files here possibly.
                // or source file edit from our server, store, etc.
            }
        }
        catch(error) {
            console.log('error in runCdp', error);
        }
    };

    const styleParagraphs = liveProps.cssProperties.map((cssProp, idx) => {

        // KG: 2024-03-18_07-44-PM: setting inline styles to not editable for now, until we setup that functionality.
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
                            // ref={valueSpanRef}
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
                            spellCheck='false' /* Disable spellcheck, i.e. no more red squiggles under the values when clicked/edited */
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
