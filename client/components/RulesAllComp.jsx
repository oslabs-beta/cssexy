import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import RulesUserAgentComp from "./RulesUserAgentComp.jsx";

function RulesAllComp() {
    const inlineRules = useSelector(state => state.rules.inlineRules);
    const regularRules = useSelector(state => state.rules.regularRules);
    const styleSheets = useSelector(state => state.rules.styleSheets);

    const [sourcePath, setSourcePath] = useState(null);
    const [sourceName, setSourceName] = useState(null);
    const [firstSourcePath, setFirstSourcePath] = useState(null);

    useEffect(() => {
        if (regularRules.length > 0) {
          const styleSheetId = regularRules[0]?.rule.style.styleSheetId;
          setFirstSourcePath(styleSheets[styleSheetId]?.absolutePaths[0] ? styleSheets[styleSheetId].absolutePaths[0] : styleSheets[styleSheetId]?.relativePaths[0]);
          if (styleSheets[styleSheetId] && sourcePath !== firstSourcePath) {
            setSourcePath(firstSourcePath);
            const splitPaths = firstSourcePath.split('/');
            const sourceNameString = `/${splitPaths[splitPaths.length - 1]}`;
            setSourceName(sourceNameString);
          }
        }
      }, [styleSheets, regularRules]);

    const RulesInlineComp = inlineRules.map((each, idx) => {
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
        return (
            <SidebarStyling
                key={`regular-style-${idx}`}
                selector={each.rule.selectorList?.selectors[0].text}
                cssProperties={each.rule.style.cssProperties}
                origin={each.rule.origin}
                sourcePath={firstSourcePath}
            />
        )
    });

    return (
        <div>
            <h4>inline</h4>
            {/* ternary to render a line break if there are no rules. Improves readability imo */}
            <>{RulesInlineComp.length ? RulesInlineComp : <br/>}</>
            {/* <h3>.css</h3> */}
            <h4>{sourceName ? sourceName : 'css file'}</h4>
            {/* same ternary, same reason */}
            <>{RulesRegularComp.length ? RulesRegularComp : <br/>}</>
            <RulesUserAgentComp />
        </div>
    )
};

export default RulesAllComp;
