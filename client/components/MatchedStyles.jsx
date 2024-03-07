import React from 'react';
import { useSelector } from 'react-redux';
import Style from './Style';

/* Matched styles include:
1) styles defined in .css files called 'regular' styles
2) default browser styles called 'user-agent' styles*/

function MatchedStyles(){
    const inlineStyles = useSelector(state => state.styles.inlineStyles);
    const matchedStyles = useSelector(state => state.styles.matchedStyles);

    const regularStyles = [];
    const userAgentStyles = [];

    matchedStyles.forEach((style, idx) => {
        const styleComp = (
            <Style 
                key={`style-${idx}`}
                selector={style.rule.selectorList.selectors[0].text}
                cssProperties={style.rule.style.cssProperties}
                origin={style.rule.origin}
            />            
        );

        if (style.rule.origin === 'regular') regularStyles.push(styleComp);
        else if (style.rule.origin === 'user-agent') userAgentStyles.push(styleComp);
    });

    return (
        <div>
            <h3>Styles from .css</h3>
            {regularStyles}
            <h3>Browser default styles</h3>
            {userAgentStyles}
        </div>
    )
};

export default MatchedStyles;