import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateInlineRules, updateRegularRules, updateUserAgentRules, updateInheritedRules, updateKeyframeRules, updateStyleSheets, updateNodeData } from '../slices/rulesSlice.js';

import { RunCdpComp } from "./RunCdpComp.jsx";

function SidebarStyling(props) {

    const dispatch = useDispatch();

    const { data } = useSelector(state => state.nodeData);
    const liveProps = JSON.parse(JSON.stringify(props));

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

    const runCdp = async () => {
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
            }
          };


    const handleSubmit = async (cssProp, event) => {
        const updatedCssProp = {...cssProp, value: values[cssProp.name]};
        event.preventDefault();
        updatedCssProp.valuePrev = cssProp.value;
        updatedCssProp.textPrev = updatedCssProp.text;
        updatedCssProp.text = `${cssProp.name}: ${values[updatedCssProp.name]};`;
        console.log('\n');
        console.log(cssProp.name);
        console.log(cssProp.value);
        console.log('->');
        console.log(updatedCssProp.value);
        console.log('\n');

        updatedCssProp.selector = liveProps.selector;
        updatedCssProp.sourcePath = liveProps.sourcePath;

        // console.log('data', data);
        console.log('TRY: /write');
        console.log('\n\n\n');
        try {
            const response = await fetch('/write', {
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

                // wait for 1 second
                await new Promise(resolve => setTimeout(resolve, 500));
                runCdp();
            }
            else {
                console.log('result was not true');
            }
        }
        catch(error) {
            console.log('error in runCdp', error);
        }
        //   const result = await response.json();
        //   console.log('sideBarStyling: result:', result);



        // and we'll update our tracking of undo/redo, our redux store perhaps, and source files here possibly.
        // or source file edit from our server, store, etc.
        };

    const styleParagraphs = liveProps.cssProperties.map((cssProp, idx) => {
        if ((liveProps.origin === 'regular' && cssProp.text)) {
            // cssProperties arr includes both user defined 'shorthand' styles and css 'longhand' styles. We want to render only user defined styles => style is user defined if it has .text property
            // shorthand example: 'border-bottom: 3px solid blueviolet'
            // longhand example: border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: blueviolet
            return (
                <p key={`styleParagraphs-${idx}`} className='style-paragraph'>
                    <span className='style-property-span'>{cssProp.name}:</span>
                        {/* <span className='style-value-span'>{cssProp.value}</span> */}
                        <input
                            // ref={valueSpanRef}
                            className='style-value-input-span'
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
        // KG: 2024-03-18_07-44-PM: setting inline styles to not editable for now, until we setup that functionality.
        else if ((liveProps.origin === 'user-agent') ||
        (liveProps.origin === 'inline' && cssProp.text)) {
             return (
                <p key={`styleParagraphs-${idx}`} className='style-paragraph'>
                    <span className='style-property-span'>{cssProp.name}:</span>
                    {/* <span className='style-value-span'>{cssProp.value}</span> */}
                    <span className='style-value-span'>{cssProp.value}</span>
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
