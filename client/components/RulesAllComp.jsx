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

    console.log('inlineRules', inlineRules);
    console.log('\n\n');

    useEffect(() => {
        console.log('RulesAllComp: line 19');
        if (regularRules.length > 0) {
            console.log('RulesAllComp: line 21');
          const styleSheetId = regularRules[0]?.rule.style.styleSheetId;
          console.log('RulesAllComp: line 23');
          setFirstSourcePath(styleSheets[styleSheetId]?.absolutePaths[0] ? styleSheets[styleSheetId]?.absolutePaths[0] : styleSheets[styleSheetId]?.relativePaths[0]);
          console.log('RulesAllComp: line 25');
          if (styleSheets[styleSheetId] && sourcePath !== firstSourcePath) {
            console.log('RulesAllComp: line 27');
            setSourcePath(firstSourcePath);
            const splitPaths = firstSourcePath.split('/');
            const sourceNameString = `/${splitPaths[splitPaths.length - 1]}`;
            setSourceName(sourceNameString);
            console.log('RulesAllComp: line 32');
          }
        }
      }, [styleSheets, regularRules]);

      console.log('RulesAllComp: line 37');

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
