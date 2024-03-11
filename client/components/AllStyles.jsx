import React from 'react';
import { useSelector } from 'react-redux';
import Style from './Style';

/* All styles include:
1) styles defined in .css files called 'regular' styles
2) default browser styles called 'user-agent' styles
3) inline styles defined directly on components*/

function AllStyles(){
    const allStyles = useSelector(state => state.styles.allStyles);

    const inlineStyles = [];
    const regularStyles = [];
    const userAgentStyles = [];
    let userAgentSelector;

    allStyles.forEach((style, idx) => {
        if (style.rule.origin === 'inline' || style.rule.origin === 'regular') {
            const styleComp = (
                <Style 
                    key={`style-${idx}`}
                    selector={style.rule.selectorList?.selectors[0].text}
                    cssProperties={style.rule.style.cssProperties}
                    origin={style.rule.origin}
                />            
            );

            if (style.rule.origin === 'regular') regularStyles.push(styleComp);
            // else if (style.rule.origin === 'user-agent') userAgentStyles.push(styleComp);
            else if (style.rule.origin === 'inline') inlineStyles.push(styleComp);
        }
        else if (style.rule.origin === 'user-agent') {
            // grab only first selector (assuming this is the main selector we want to show)
            if (!userAgentSelector) userAgentSelector = style.rule.selectorList.selectors[0].text;

            
        }
    });

    return (
        <div>
            <h3>Inline styles</h3>
            {inlineStyles}            
            <h3>Styles from .css</h3>
            {regularStyles}
            <h3>Browser default styles</h3>
            {userAgentStyles}
        </div>
    )
};

export default AllStyles;