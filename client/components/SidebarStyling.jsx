import React from 'react';

function SidebarStyling(props) {
    const styleParagraphs = props.cssProperties.map((cssProp, idx) => {
        if ((props.origin === 'regular' && cssProp.text) ||
            props.origin === 'user-agent' ||
            (props.origin === 'inline' && cssProp.text)) {
            // cssProperties arr includes both user defined 'shorthand' styles and css 'longhand' styles. We want to render only user defined styles => style is user defined if it has .text property
            // shorthand example: 'border-bottom: 3px solid blueviolet'
            // longhand example: border-bottom-width: 3px; border-bottom-style: solid; border-bottom-color: blueviolet
            return (
                <p key={`styleParagraphs-${idx}`} className='style-paragraph'>
                    <span className='style-source-span'>{props.source}</span>:
                    <span className='style-property-span'>{cssProp.name}</span>:
                    <span className='style-value-span'>{cssProp.value}</span>
                </p>
            )
        }
    })

    return (
        <div className='style-container'>
            <div className='selector-div'>
                {props.selector && <p>{props.selector} </p>}
            </div>
            {styleParagraphs}
            <br />
        </div>
    )
};

export default SidebarStyling;
