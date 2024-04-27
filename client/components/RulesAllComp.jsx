import React, { useState, useMemo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import RulesUserAgentComp from "./RulesUserAgentComp.jsx";

function RulesAllComp() {
    // contains all of the inline styles (styles specified directly on a component)
    const inlineRules = useSelector(state => state.rules.inlineRules);
    // contains all of the regular styles (styles specified in .css files)
    const regularRules = useSelector(state => state.rules.regularRules);
    // contains information about all of the .css files that are currently loaded
    const styleSheets = useSelector(state => state.rules.styleSheets);

    // tracks the path of the currently selected .s/css file
    const [sourcePath, setSourcePath] = useState(null);
    // tracks the name of the currently selected .s/css file
    const [sourceName, setSourceName] = useState(null);
    // tracks the path of the first .s/css file in the array of .css files
    const [firstSourcePath, setFirstSourcePath] = useState(null);

    useEffect(() => {
        if (regularRules.length > 0) {
            // styleSheetId is a variable that we use to keep track of which .css file we want to look at
            const styleSheetId = regularRules[0]?.rule.style.styleSheetId;
            // we set the firstSourcePath variable to the absolute path (if it exists) or the relative path of the first .css file returned by the styleSheets object for the clicked element.
            setFirstSourcePath(styleSheets[styleSheetId]?.absolutePaths[0] ? styleSheets[styleSheetId].absolutePaths[0] : styleSheets[styleSheetId]?.relativePaths[0]);
            // if the first .css file is different from the currently selected .css file, we update the sourcePath variable to reflect the new selection
            if (styleSheets[styleSheetId] && sourcePath !== firstSourcePath) {
                setSourcePath(firstSourcePath);
                const splitPaths = firstSourcePath.split('/');
                // sourceNameString is a variable that we use to keep track of the name of the currently selected .css file
                const sourceNameString = `/${splitPaths[splitPaths.length - 1]}`;
                // we update the sourceName variable to reflect the new selection
                setSourceName(sourceNameString);
            }
        }
        // useEffect is a hook provided by React. It lets us run code when specific pieces of data change. In this case, if the regularRules or styleSheets data changes, we want to run the code inside the useEffect block
    }, [styleSheets, regularRules]);

    // map() to create an array of SidebarStyling components
    // from the inlineRules data and another from the regularRules data.
    const RulesInlineComp = inlineRules.map((each, idx) => {
        return (
            <SidebarStyling
                key={`inline-style-${idx}`}
                selector={each.rule.selectorList?.text}
                cssProperties={each.rule.style.cssProperties}
                origin={each.rule.origin}
            />
        )
    });

    const RulesRegularComp = regularRules.map((each, idx) => {
        return (
            <SidebarStyling
                key={`regular-style-${idx}`}
                selector={each.rule.selectorList?.text}
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
            <h4>{sourceName ? sourceName : 'css'}</h4>
            {/* same ternary, same reason */}
            <>{RulesRegularComp.length ? RulesRegularComp : <br/>}</>
            <RulesUserAgentComp />
        </div>
    )
};

export default RulesAllComp;
