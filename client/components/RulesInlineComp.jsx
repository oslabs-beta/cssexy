import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import { openSourceFile } from '../features/openSourceFile.js';

const RulesInlineComp = () => {
    // contains all of the inline styles (styles specified directly on a component)
    const inlineRules = useSelector(state => state.rules.inlineRules);

    // contains all of the regular styles (styles specified in .css files)
    // const styleSheets = useSelector(state => state.rules.styleSheets);

    const { path: targetSourceInlinePath, name: targetSourceInlineName, line: targetSourceInlineLineNumber} = useSelector(state => state.target.targetSourceInline);

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
         {targetSourceInlinePath ? <h5 style={{color: 'white'}}><a href="#" onClick={() => openSourceFile(targetSourceInlinePath, targetSourceInlineLineNumber)}>{targetSourceInlineName}: {targetSourceInlineLineNumber}</a></h5>: null}
            {inlineElements.length ? inlineElements : <br/>}
        </div>
    );
};

export default RulesInlineComp;
