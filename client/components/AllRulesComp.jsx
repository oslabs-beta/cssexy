import React from 'react';
import { useSelector } from 'react-redux';
import Style from './Style.jsx';
import UserAgentRulesComp from "./UserAgentRulesComp.jsx";


/* Styles included:
1) styles defined in .css files called 'regular' styles
2) inline styles defined directly on components*/

function AllRulesComp(){
    const inlineRules = useSelector(state => state.rules.inlineRules);
    const regularRules = useSelector(state => state.rules.regularRules);

    const inlineRuleComp = inlineRules.map((style, idx) => {
        return (
            <Style
                key={`inline-style-${idx}`}
                selector={style.rule.selectorList?.selectors[0].text}
                cssProperties={style.rule.style.cssProperties}
                origin={style.rule.origin}
            />
        )
    });

    const regularRuleComp = regularRules.map((style, idx) => {
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
            <h3>inline</h3>
            {inlineRuleComp}
            <h3>.css</h3>
            {regularRuleComp}
            <h3>user agent</h3>
            <UserAgentRulesComp />
        </div>
    )
};

export default AllRulesComp;
