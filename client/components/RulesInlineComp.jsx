import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import { openSourceFile } from '../features/openSourceFile.js';

const RulesInlineComp = () => {
    // tracks the path of the currently selected .s/css file
    const [sourcePath, setSourcePath] = useState(null);
    // tracks the name of the currently selected .s/css file
    const [sourceName, setSourceName] = useState(null);
    // tracks the path of the first .s/css file in the array of .css files
    const [firstSourcePath, setFirstSourcePath] = useState(null);

    // const { targetSelector, targetSourceInline, targetDir } = useSelector(state => state.target);
    // const targetDir = useSelector(state => state.target.targetDir);

    // contains all of the inline styles (styles specified directly on a component)
    const inlineRules = useSelector(state => state.rules.inlineRules);
    // contains all of the regular styles (styles specified in .css files)
    const styleSheets = useSelector(state => state.rules.styleSheets);

    const { targetSourceInline, targetSourceInlineLineNumber } = useSelector(state => state.target);



    useEffect(() => {
        if (targetSourceInline?.length > 0) {
    //         // styleSheetId is a variable that we use to keep track of which .css file we want to look at
    //         const styleSheetId = regularRules[0]?.rule.style.styleSheetId;
    //         // we set the firstSourcePath variable to the absolute path (if it exists) or the relative path of the first .css file returned by the styleSheets object for the clicked element.
    //         setFirstSourcePath(styleSheets[styleSheetId]?.absolutePaths[0] ? styleSheets[styleSheetId].absolutePaths[0] : styleSheets[styleSheetId]?.relativePaths[0]);
    //         // if the first .css file is different from the currently selected .css file, we update the sourcePath variable to reflect the new selection
    //         if (styleSheets[styleSheetId] && sourcePath !== firstSourcePath) {
    //             setSourcePath(firstSourcePath);
                const splitPaths = targetSourceInline.split('/');
    //             // sourceNameString is a variable that we use to keep track of the name of the currently selected .css file
                const sourceNameString = `/${splitPaths[splitPaths.length - 1]}`;
    //             // we update the sourceName variable to reflect the new selection
                setSourceName(sourceNameString);
    //         }
        }
    //     // useEffect is a hook provided by React. It lets us run code when specific pieces of data change. In this case, if the regularRules or styleSheets data changes, we want to run the code inside the useEffect block
    }, [targetSourceInline, targetSourceInlineLineNumber]);

    const inlineElements = inlineRules.map((each, idx) => {
        return (
            <SidebarStyling
                key={`inline-style-${idx}`}
                selector={each.rule.selectorList?.selectors[0].text}
                cssProperties={each.rule.style.cssProperties}
                origin={each.rule.origin}
                // sourcePath={firstSourcePath}
            />
        )
    });

    return (
        <div>
         {/* <h4>{inlineSource ? inlineSource : 'inline'}</h4> */}
         <h4>inline</h4>
         {targetSourceInline ? <h5 style={{color: 'white'}}><a href="#" onClick={() => openSourceFile(targetSourceInline, targetSourceInlineLineNumber)}>{sourceName}: {targetSourceInlineLineNumber}</a></h5>: null}
            {inlineElements.length ? inlineElements : <br/>}
        </div>
    );
};

export default RulesInlineComp;
