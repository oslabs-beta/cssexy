import React from 'react';
import { useSelector } from 'react-redux';

function StylesSection() {
    const inlineStyles = useSelector(state => state.styles.inlineStyles);
    
    const inlineStyleParagraphs = inlineStyles.cssText.split('; ').map(style => {
        const property = style.split(': ');
        return (
            <p className='style-paragraph'>
                <span className='style-property-span'>{property[0]}</span>:
                <span className='style-value-span'>{property[1]}</span>
            </p>
        )
    });

    return (
        <div className='style-container'>
            <div className='selector-div'>
                <p>element.style {'{'}</p>
            </div>
            {inlineStyleParagraphs}
            <p>{'}'}</p>
        </div>
    )
};

export default StylesSection;