import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import { openSourceFile } from '../features/openSourceFile.js';

function RulesRegularComp() {
  // const dispatch = useDispatch();
  // contains all of the regular styles (styles specified in .css files)
  const regularRules = useSelector(state => state.rules.regularRules);
  // contains information about all of the .  css files that are currently loaded
  // const styleSheets = useSelector(state => state.rules.styleSheets);

  const { targetSourceRegular, targetSourceRegularName  } = useSelector(state => state.target);

  // tracks the name of the currently selected .s/css file
  // const [sourceName, setSourceName] = useState(null);

  // useEffect(() => {
  //   if (regularRules.length > 0) {
  //       const splitPaths = targetSourceRegular.split('/');
  //       // sourceNameString is a variable that we use to keep track of the name of the currently selected .css file
  //       const sourceNameString = `/${splitPaths[splitPaths.length - 1]}`;
  //       // we update the sourceName variable to reflect the new selection
  //       setSourceName(sourceNameString);
  //   }
  //   else {
  //     setSourceName(null);
  //   }
  // }, [targetSourceRegular]);

  // map() to create an array of SidebarStyling components
  const regularElements = regularRules.map((each, idx) => {
    return (
      <SidebarStyling
        key={`regular-style-${idx}`}
        selector={each.rule.selectorList?.selectors[0].text}
        cssProperties={each.rule.style.cssProperties}
        origin={each.rule.origin}
        sourcePath={targetSourceRegular}
      />
    )
  });

  return (
    <div>
       <h4>regular</h4>
       {/* not working to make it white */}
       {targetSourceRegular ? <h5 style={{color: 'white'}}><a href="#" onClick={() => openSourceFile(targetSourceRegular)}>{targetSourceRegularName}</a></h5>: null}
      <>{regularElements.length ? regularElements : <br />}</>
    </div>
  )
};

export default RulesRegularComp;
