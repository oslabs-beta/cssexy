/**
 * cdp2styles.js
 * Finds a specific DOM node by using the provided CSS selector.
 * Gets and logs the inline styles and all CSS rules that are applied to the node.
 *
 * @param {object} DOM - the DOM object
 * @param {object} CSS - the CSS object
 * @param {string} selector - the CSS selector for the specific node
 * @return {Promise} - a Promise that resolves when all styles are logged
 */
import fs from 'fs';
const cdpInlineRules = async(CSS, nodeId) => {
  // retrieve the inline styles for the node with the provided nodeId
  const { inlineStyle } = await CSS.getInlineStylesForNode({ nodeId });


  // check if there are any inline styles for this node
  if (inlineStyle) {
    // log the CSS text representing the inline style and the range within the document where these styles are applied
    console.log('Inline styles:', inlineStyle.cssText);
    console.log('range:', inlineStyle.range);
  } else {
      // if no inline styles are present
      console.log(`No inline styles found for nodeId ${nodeId}.`);
  }
  return inlineStyle;
}

const recursiveConsoleLog = (object, indent = 0) => {
  // indent the output by 'indent' spaces
  const indentation = ' '.repeat(indent);

  // if the object is not null and is an object (i.e. not a primitive)
  if (object !== null && typeof object === 'object') {

    // start a new line with the object's opening curly brace
    console.log(indentation + '{');

    // log each key-value pair as a property of the object
    for (const [key, value] of Object.entries(object)) {

      // output the property name and its value, indented by 'indent + 2' spaces
      process.stdout.write(indentation + `  ${key}: `);
      recursiveConsoleLog(value, indent + 2);
    }

    // end the object with a closing curly brace on a new line
    console.log(indentation + '}');
  } else {
      // if the object is a primitive, log it followed by a comma
      console.log(object + ',');
  }
}
const recursiveFileWrite = (object, indent = 0) => {
  const indentation = ' '.repeat(indent);
  let fileOutput = '';

  if (object !== null && typeof object === 'object') {
    fileOutput += indentation + '{\n';

    for (const [key, value] of Object.entries(object)) {
      fileOutput += indentation + `  ${key}: `;
      fileOutput += recursiveFileWrite(value, indent + 2);
    }

    fileOutput += indentation + '}\n';
  } else {
    fileOutput += object + ',\n';
  }

  return fileOutput;
}


const cdpRules = async (cdpClient, DOM, CSS, Network, Page, iframeDoc, selector) => {

// Get the nodeId of the node based on its CSS selector

const iframeNodeId  = iframeDoc.nodeId;
console.log('root frame node id:', iframeNodeId);

const { nodeId } = await DOM.querySelector({
    nodeId: iframeNodeId,
    selector: selector
  });

  console.log('nodeId for selector', selector, 'is:', nodeId);

  console.log('Getting styles for element:', selector);
  // Get and log the inline styles
  const inlineCSSRules = await cdpInlineRules(CSS, nodeId);

  fs.writeFileSync('./data/output/inlineRules.json', JSON.stringify(inlineCSSRules, null, 2));

  // get all CSS rules that are applied to the node
  // => matchedCSSRules contains CSS rules that are directly applied to the node
  // => inherited contains the CSS rules that are passed down from the node's ancestors
  // => cssKeyframesRules includes all the @keyframes rules applied to the node
  const { matchedCSSRules, inherited, cssKeyframesRules } = await CSS.getMatchedStylesForNode({ nodeId });

  // console.log('matchedCSSRules:', matchedCSSRules);

  // recursiveConsoleLog(CSS);
  // Call the function

// Write the output to a file
fs.writeFileSync('./data/domains/CSS.log', recursiveFileWrite(CSS));
fs.writeFileSync('./data/domains/DOM.log', recursiveFileWrite(DOM));
fs.writeFileSync('./data/domains/Network.log', recursiveFileWrite(Network));
fs.writeFileSync('./data/domains/Page.log', recursiveFileWrite(Page));


  // console.log('collectClassNames:', CSS.collectClassNames({nodeId}));

  // console.log('CS.CSSStyleSheetHeader', CSS.CSSStyleSheetHeader);

// for (const rule of matchedCSSRules) {
//   // console.log('rule:', rule);
//   console.log('rule.rule.styleSheetId:', rule.rule?.styleSheetId);

//   const sheetId = rule.rule?.styleSheetId;

//   if (sheetId) {
//     const sheetText = await CSS.getStyleSheetText({ styleSheetId: sheetId });
//     if (sheetText) {
//       const sheetDetails = Object.keys(sheetText).reduce((obj, prop) => {
//         obj[prop] = true;
//         return obj;
//       }, {});

//       // console.log('sheetDetails:', sheetDetails);
//     }
//   }

// }


  // add inline styles obj to matchedRules array following the same properties format which MatchedRules components and Style components need

  const appliedRules = [...matchedCSSRules];
  appliedRules.push({
    "rule": {
      "origin": "inline",
      "style": inlineCSSRules
    }
  });

  fs.writeFileSync('./data/output/appliedRules.json', JSON.stringify(appliedRules, null, 2));

  console.log('cdpRules: returning appliedRules');
  return appliedRules;
}

export default cdpRules
