import React from 'react';
import { useSelector } from 'react-redux';
import Style from './Style';

/* Styles included:
1) styles defined in .css files called 'regular' styles
2) inline styles defined directly on components*/

function InlineAndRegularStyles(){
    const inlineStyles = useSelector(state => state.styles.inlineStyles);
    const regularStyles = useSelector(state => state.styles.regularStyles);

    const inlineStyleComps = inlineStyles.map((style, idx) => {
        return (
            <Style 
                key={`inline-style-${idx}`}
                selector={style.rule.selectorList?.selectors[0].text}
                cssProperties={style.rule.style.cssProperties}
                origin={style.rule.origin}
            />
        )        
    });

    const regularStyleComps = regularStyles.map((style, idx) => {
        return (
            <Style 
                key={`regular-style-${idx}`}
                selector={style.rule.selectorList?.selectors[0].text}
                cssProperties={style.rule.style.cssProperties}
                origin={style.rule.origin}
            />
        )        
    });

    return (
        <div>
            <h3>Inline styles</h3>
            {inlineStyleComps}            
            <h3>Styles from .css</h3>
            {regularStyleComps}
        </div>
    )
};

export default InlineAndRegularStyles;