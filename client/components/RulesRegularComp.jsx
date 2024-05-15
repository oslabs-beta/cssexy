import React from 'react';
import { useSelector } from 'react-redux';
import SidebarStyling from './SidebarStyling.jsx';
import { openSourceFile } from '../features/openSourceFile.js';

function RulesRegularComp() {
  // contains all of the regular styles (styles specified in .css files)
  const regularRules = useSelector(state => state.rules.regularRules);

  // contains information about all of the .  css files that are currently loaded
  // const styleSheets = useSelector(state => state.rules.styleSheets);

  const targetRegular = useSelector(state => state.target.targetRegular);

  // console.warn('RulesRegularComp: targetRegular', targetRegular);

  const { path, pathFileName } = targetRegular;

  const line = 1;

  // const compareSpecificityDescending = (obj1, obj2) => {
  //   if (obj1.calculatedSpecificity.a !== obj2.calculatedSpecificity.a) {
  //     return obj1.calculatedSpecificity.a < obj2.calculatedSpecificity.a ? 1 : -1;
  //   }
  //   // If 'a' values are equal, compare the 'b' values
  //   else if (obj1.calculatedSpecificity.b !== obj2.calculatedSpecificity.b) {
  //     return obj1.calculatedSpecificity.b < obj2.calculatedSpecificity.b ? 1 : -1;
  //   }
  //   // If 'b' values are equal, compare the 'c' values
  //   else if (obj1.calculatedSpecificity.c !== obj2.calculatedSpecificity.c) {
  //     return obj1.calculatedSpecificity.c < obj2.calculatedSpecificity.c ? 1 : -1;
  //   }
  //   else return 0;
  // };


  // const regularRulesSorted = regularRules.toSorted(compareSpecificityDescending);
  // map() to create an array of SidebarStyling components
  // const regularRulesElements = regularRulesSorted.map((each, idx) => {
  // const regularRulesElements = regularRules.map((each, idx) => {
    const regularRulesElements = [...regularRules].reverse().map((each, idx) => {
      console.log('RulesRegularComp: each', each);

      // let regularSelector = '';
      // if (each.matchingSelectors.length === 1) {
      //   console.log('\n\n');
      //   console.log('each.matchingSelectors', each);
      //   console.log('\n\n');
      //   regularSelector = each.rule.selectorList.selectors[each.matchingSelectors[0]].text;

      // }
      // // combine selectors where there're multiple selectors in matchingSelectors array, e.g. '.btn, #active'
      // else if (each.matchingSelectors.length > 1) {
      //     for (let i = 0; i < each.matchingSelectors.length; i++) {
      //         const idx = each.matchingSelectors[i];
      //         regularSelector += each.rule.selectorList.selectors[idx].text;
      //         if (i !== each.matchingSelectors.length - 1) regularSelector += ', ';
      //     }
      // };

    return (
      <SidebarStyling
        key={`regular-style-${idx}`}
        selector={each.rule.selectorList?.selectors[0].text}
        cssProperties={each.rule.style.cssProperties}
        origin={each.rule.origin}
        path={path}
        target={targetRegular}
      />
    )
  });

  return (
    <div>
      <h4>regular</h4>
      {/* <a> 'a' for anchor. used as a hyperlink tag */}
      {/* href stands for 'hypertext reference' */}
      {/* if targetRegularPath is not null, open the source file */}
      {/* otherwise do nothing */}
      {/* added e and preventDefault in order to name the href and prevent clicking then navigating the site to that endpoint, which would reload the page. */}
      {/* even preventing default while maintaining the href would allow us to prevent the page from navigating to /#, which, while it doesn’t reload the page, simply isnt as clean of a user experience. */}
      {
        path ?
          <h5 ><a href="targetSourcePath" className="target-source-path" onClick={(e) => { e.preventDefault(); openSourceFile(path, line) }}>{pathFileName}</a></h5>
          :
          null
      }
      {/* if there are styles, display them, otherwise display blank line */}
      <>{
        regularRulesElements.length ?
          regularRulesElements
          :
          <br />}</>
    </div>
  )
};

export default RulesRegularComp;
