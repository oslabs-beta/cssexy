import React from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import UserAgentRulesComp from "./UserAgentRulesComp.jsx";

function AllRulesComp(){
    const inlineRules = useSelector(state => state.rules.inlineRules);
    const regularRules = useSelector(state => state.rules.regularRules);

    const inlineRuleComp = inlineRules.map((style, idx) => {
        // console.log('inlineRules', inlineRules);
        return (
            <SidebarStyling
            key={`inline-style-${idx}`}
            selector={style.rule.selectorList?.selectors[0].text}
            cssProperties={style.rule.style.cssProperties}
            origin={style.rule.origin}
            />
            )
        });

    const regularRuleComp = regularRules.map((style, idx) => {
        // console.log('regularRules', regularRules);
        return (
            <SidebarStyling
                key={`regular-style-${idx}`}
                selector={style.rule.selectorList?.selectors[0].text}
                cssProperties={style.rule.style.cssProperties}
                origin={style.rule.origin}
            />
        )
    });

    return (
        <div>
            {/* the below is iff we only want to display a given header when there are styles  of that type for the element */}
            {/* {inlineRules[0]?.rule?.style.cssProperties.length > 0 && <h3>inline:</h3>} */}
            <h3>inline</h3>
            {inlineRuleComp}
            <h3>.css</h3>
            {regularRuleComp}
            <UserAgentRulesComp />
        </div>
    )
};

export default AllRulesComp;
