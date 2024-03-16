import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import RulesUserAgentComp from "./RulesUserAgentComp.jsx";

function RulesAllComp() {
    const inlineRules = useSelector(state => state.rules.inlineRules);
    const regularRules = useSelector(state => state.rules.regularRules);
    const styleSheets = useSelector(state => state.rules.styleSheets);

    const [sourcePath, setSourcePath] = useState(null);
    const [sourceName, setSourceName] = useState(null);

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
        // console.log('styleSheets', styleSheets);
        // console.log('styleSheetId', each.rule.style.styleSheetId);
        // console.log('styleSheets[each.rule.style.styleSheetId]?', styleSheets[each.rule.style.styleSheetId]);

        const styleSheetId = each.rule.style.styleSheetId;
        const firstSourcePath = styleSheets[styleSheetId].paths[0];

        if (styleSheets[styleSheetId] && sourcePath != firstSourcePath)  {
            setSourcePath(firstSourcePath);
            const splitPaths = firstSourcePath.split('/')
            const sourceNameString = `/${splitPaths[splitPaths.length - 1]}`
            setSourceName(sourceNameString);
        }

        return (
            <SidebarStyling
                key={`regular-style-${idx}`}
                selector={each.rule.selectorList?.selectors[0].text}
                cssProperties={each.rule.style.cssProperties}
                origin={each.rule.origin}
            />
        )
    });

    return (
        <div>
            <h3>inline</h3>
            <>{RulesInlineComp.length ? RulesInlineComp : <br/>}</>
            {/* <h3>.css</h3> */}
            <h3>{sourceName ? sourceName : 'css file'}</h3>
            <>{RulesRegularComp.length ? RulesRegularComp : <br/>}</>
            <RulesUserAgentComp />
        </div>
    )
};

export default RulesAllComp;
