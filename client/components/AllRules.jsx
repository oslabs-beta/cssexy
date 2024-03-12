import React from 'react';
import { useSelector } from 'react-redux';
import Style from './Style';

/* All rules include:
1) rules defined in .css files called 'regular' rules
2) default browser rules called 'user-agent' rules
3) inline rules defined directly on components*/

function AllRules(){
    const allRules = useSelector(state => state.rules.allRules);
    // console.log('allRules', allRules);

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
            {inlineRules[0]?.props.cssProperties.length > 0 && <h3>inline:</h3>}
            {/* <h3>inline:</h3> */}
            {inlineRules}

            {regularRules[0]?.props.cssProperties.length > 0 && <h3>.css:</h3>}
            {/* <h3>.css:</h3> */}
            {regularRules}

            {userAgentRules[0]?.props.cssProperties.length > 0 && <h3>userAgent:</h3>}
            {/* <h3>userAgent:</h3> */}
            {userAgentRules}

        </div>
    )
};

export default AllRules;
