import React from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import RulesUserAgentComp from "./RulesUserAgentComp.jsx";

function RulesAllComp() {
    const inlineRules = useSelector(state => state.rules.inlineRules);
    const regularRules = useSelector(state => state.rules.regularRules);
    const styleSheets = useSelector(state => state.rules.styleSheets);

    const RulesInlineComp = inlineRules.map((each, idx) => {
        // console.log('inlineRules', inlineRules);

        return (
            <SidebarStyling
                key={`inline-style-${idx}`}
                selector={each.rule.selectorList?.selectors[0].text}
                cssProperties={each.rule.style.cssProperties}
                origin={each.rule.origin}
            />
        )
    });

    const RulesRegularComp = regularRules.map((each, idx) => {
        // console.log('regularRules', regularRules);
        console.log('styleSheets', styleSheets);
        console.log('styleSheetId', each.rule.style.styleSheetId);
        console.log('styleRule', each.rule);
        return (
            <SidebarStyling
                key={`regular-style-${idx}`}
                selector={each.rule.selectorList?.selectors[0].text}
                cssProperties={each.rule.style.cssProperties}
                origin={each.rule.origin}
                source={styleSheets[each.rule.style.styleSheetId]}
            />
        )
    });

    return (
        <div>
            {/* the below is iff we only want to display a given header when there are styles  of that type for the element */}
            {/* {inlineRules[0]?.rule?.style.cssProperties.length > 0 && <h3>inline:</h3>} */}
            <h3>inline</h3>
            {RulesInlineComp}
            <h3>.css</h3>
            {RulesRegularComp}
            <RulesUserAgentComp />
        </div>
    )
};

export default RulesAllComp;
