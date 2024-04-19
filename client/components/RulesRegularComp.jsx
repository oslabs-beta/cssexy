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
       {/* not working to make it white */}
       {targetSourceRegularPath ? <h5 style={{color: 'white'}}><a href="#" onClick={() => openSourceFile(targetSourceRegularPath)}>{targetSourceRegularName}</a></h5>: null}
      <>{regularElements.length ? regularElements : <br />}</>
    </div>
  )
};

export default RulesRegularComp;
