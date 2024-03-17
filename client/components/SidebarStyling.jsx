import React, { useState, useEffect, useRef } from 'react';

function SidebarStyling(props) {const [values, setValues] = useState({});

useEffect(() => {
    setValues(
        props.cssProperties.reduce((acc, cssProp) => {
            acc[cssProp.name] = cssProp.value;
            return acc;
        }, {})
    );
}, [props.cssProperties]);
    const handleSubmit = (cssProp, event) => {
        event.preventDefault();
        cssProp.value = values[cssProp.name];
        // and we'll update our tracking of undo/redo, our redux store perhaps, and source files here possibly.
        // or source file edit from our server, store, etc.
    };


    // React.useEffect(() => {
    //     if (valueSpanRef.current) {
    //         // console.log('\n\n\n');
    //         const valueSpanWidth = valueSpanRef.current.value.length * 8;
    //         console.log('valueSpanWidth', valueSpanRef.current.value, valueSpanWidth);
    //         console.log('valueSpanRef.current', valueSpanRef.current);
    //         valueSpanRef.current.style.setProperty('--style-value-span-width', `${valueSpanWidth}px`);
    //         console.log('\n\n\n');
    //     }
    //     else {
    //         console.log('valueSpanRef.current is null', valueSpanRef)
    //     }
    // });

    const styleParagraphs = props.cssProperties.map((cssProp, idx) => {

        // const valueSpanRef = React.useRef();



        if ((props.origin === 'regular' && cssProp.text) ||
            props.origin === 'user-agent' ||
            (props.origin === 'inline' && cssProp.text)) {
            // cssProperties arr includes both user defined 'shorthand' styles and css 'longhand' styles. We want to render only user defined styles => style is user defined if it has .text property
            // shorthand example: 'border-bottom: 3px solid blueviolet'
            // longhand example: border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: blueviolet
            return (
                <p key={`styleParagraphs-${idx}`} className='style-paragraph'>
                    <span className='style-property-span'>{cssProp.name}</span>:
                        {/* <span className='style-value-span'>{cssProp.value}</span> */}
                    <form className='style-value-form' onSubmit={(e) => handleSubmit(cssProp, e)}>
                        <input
                            // ref={valueSpanRef}
                            className='style-value-span'
                            value={values[cssProp.name]}
                            onChange={(e) => setValues({...values, [cssProp.name]: e.target.value})}
                        />
                    </form>
                </p>
            )
        }
    })

    return (
        <div className='style-container'>
            <div className='selector-div'>
                {props.selector && <p>{props.selector} </p>}
            {/* {props?.source?.paths[0] && <p>{props?.source?.paths[0]} </p>} */}
            </div>
            {styleParagraphs}
            <br />
        </div>
    )
};

export default SidebarStyling;
