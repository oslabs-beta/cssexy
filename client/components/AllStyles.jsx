import React from 'react';
import { useSelector } from 'react-redux';
import Style from './Style';

/* All styles include:
1) styles defined in .css files called 'regular' styles
2) default browser styles called 'user-agent' styles
3) inline styles defined directly on components*/

function AllStyles(){
    const allRules = useSelector(state => state.styles.allRules);
    console.log('allRules', allRules);

    const inlineRules = [];
    const regularRules = [];
    const userAgentRules = [];
    let userAgentSelector;

    allRules.forEach((style, idx) => {
        if (style.rule.origin === 'inline' || style.rule.origin === 'regular') {
            const styleComp = (
                <Style
                    key={`style-${idx}`}
                    selector={style.rule.selectorList?.selectors[0].text}
                    cssProperties={style.rule.style.cssProperties}
                    origin={style.rule.origin}
                />
            );

            if (style.rule.origin === 'regular') regularRules.push(styleComp);
            // else if (style.rule.origin === 'user-agent') userAgentRules.push(styleComp);
            else if (style.rule.origin === 'inline') inlineRules.push(styleComp);
        }
        else if (style.rule.origin === 'user-agent') {
            // grab only first selector (assuming this is the main selector we want to show)
            if (!userAgentSelector) userAgentSelector = style.rule.selectorList.selectors[0].text;


        }
    });

    return (
        <div>
            <h3>Inline styles</h3>
            {inlineRules}
            <h3>Rules from .css</h3>
            {regularRules}
            <h3>Browser default styles</h3>
            {userAgentRules}
        </div>
    )
};

export default AllStyles;
