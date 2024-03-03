import React from 'react';
import { useSelector } from 'react-redux';

function StylesSection() {
    const inlineStyles = useSelector(state => state.styles.inlineStyles);
    
    const inlineStyleBlocks = inlineStyles.cssText.split('; ').map(style => {
        const property = style.split(': ');
        return (
            <div>
                <div>
                    <p>element.style {'{'}</p>
                    <p>FileName: LineNumber</p>
                </div>
                <p>{property[0]}: <span>{property[1]}</span></p>
            </div>
        )
    });

    return (
        <div>
            <h4>Styles Section</h4>
            {inlineStyleBlocks}
        </div>
    )
};

export default StylesSection;