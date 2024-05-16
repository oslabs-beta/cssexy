import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import { openSourceFile } from '../features/openSourceFile.js';

const RulesInlineComp = () => {
    // contains all of the inline styles (styles specified directly on a component)
    const inlineRules = useSelector(state => state.rules.inlineRules);

    // contains all of the regular styles (styles specified in .css files)
    // const styleSheets = useSelector(state => state.rules.styleSheets);

    const targetInline = useSelector(state => state.target.targetInline);

    const { path, pathRelative, pathFileName, line, type, typeValue } = targetInline;

    path.length ? console.warn('RulesInlineComp: targetInline', targetInline) : console.log('RulesInlineComp: targetInline is empty.');

    const inlineElements = inlineRules.map((each, idx) => {
        return (
            <SidebarStyling
                key={`inline-style-${idx}`}
                selector={each.rule.selectorList?.selectors[0].text}
                cssProperties={each.rule.style.cssProperties}
                origin={each.rule.origin}
                path={path}
                pathRelative={pathRelative}
                line={line}
                type={type}
                typeValue={typeValue}
                target={targetInline}
            />
        )
    });

    return (
        <div>
            {/* <h4>{inlineSource ? inlineSource : 'inline'}</h4> */}
            <h4>inline</h4>
            {/* <a> 'a' for anchor. used as a hyperlink tag */}
            {/* href stands for 'hypertext reference' */}
            {/* if sourcePath is not null, open the source file */}
            {/* otherwise do nothing */}
            {/* added e and preventDefault in order to name the href and prevent clicking then navigating the site to that endpoint, which would reload the page. */}
            {/* even preventing default while maintaining the href would allow us to prevent the page from navigating to /#, which, while it doesn’t reload the page, simply isnt as clean of a user experience. */}
            {path ?
                <h5 ><a href="targetSourcePath" className="target-source-path" onClick={(e) => {e.preventDefault(); openSourceFile(path, line)}}>{pathFileName}: {line}</a></h5>
                :
                null
            }
            {/* if there are inline styles, display them, otherwise display blank line */}
            {inlineElements.length ?
                inlineElements
                :
                <br />
            }
        </div>
    );
};

export default RulesInlineComp;
