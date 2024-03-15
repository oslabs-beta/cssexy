import React from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import RulesUserAgentComp from "./RulesUserAgentComp.jsx";

function RulesAllComp(){
    const inlineRules = useSelector(state => state.rules.inlineRules);
    const regularRules = useSelector(state => state.rules.regularRules);
    const styleSheets = useSelector(state => state.rules.styleSheets);

    const RulesInlineComp = inlineRules.map((style, idx) => {
        // console.log('inlineRules', inlineRules);
        console.log('styleSheets', styleSheets);
        console.log(styleSheets[style.rule.styleSheetId]);
        console.log('styleSheets', styleSheets);
        return (
            <SidebarStyling
            key={`inline-style-${idx}`}
            selector={style.rule.selectorList?.selectors[0].text}
            cssProperties={style.rule.style.cssProperties}
            origin={style.rule.origin}
            source={styleSheets[style.rule.styleSheetId]}
            />
            )
        });

    const RulesRegularComp = regularRules.map((style, idx) => {
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
            {RulesInlineComp}
            <h3>.css</h3>
            {RulesRegularComp}
            <RulesUserAgentComp />
        </div>
    )
};

export default RulesAllComp;
