import React from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import { openSourceFile } from '../features/openSourceFile.js';

function RulesRegularComp() {
  // contains all of the regular styles (styles specified in .css files)
  const regularRules = useSelector(state => state.rules.regularRules);

  // contains information about all of the .  css files that are currently loaded
  // const styleSheets = useSelector(state => state.rules.styleSheets);

  const { path: targetSourceRegularPath, name: targetSourceRegularName } = useSelector(state => state.target.targetSourceRegular);


  // map() to create an array of SidebarStyling components
  const regularElements = regularRules.map((each, idx) => {
    return (
      <SidebarStyling
        key={`regular-style-${idx}`}
        selector={each.rule.selectorList?.selectors[0].text}
        cssProperties={each.rule.style.cssProperties}
        origin={each.rule.origin}
        sourcePath={targetSourceRegularPath}
      />
    )
  });

  return (
    <div>
      <h4>regular</h4>
      {/* <a> 'a' for anchor. used as a hyperlink tag */}
      {/* href stands for 'hypertext reference' */}
      {/* if targetSourceInlinePath is not null, open the source file */}
      {/* otherwise do nothing */}
      {/* added e and preventDefault in order to name the href and prevent clicking then navigating the site to that endpoint, which would reload the page. */}
      {/* even preventing default while maintaining the href would allow us to prevent the page from navigating to /#, which, while it doesn’t reload the page, simply isnt as clean of a user experience. */}
      {
        targetSourceRegularPath ?
          <h5 ><a href="targetSourcePath" className="target-source-path" onClick={(e) => { e.preventDefault(); (targetSourceRegularPath) }}>{targetSourceRegularName}</a></h5>
          :
          null
      }
      {/* if there are inline styles, display them, otherwise display blank line */}
      <>{
        regularElements.length ?
          regularElements
          :
          <br />}</>
    </div>
  )
};

export default RulesRegularComp;
