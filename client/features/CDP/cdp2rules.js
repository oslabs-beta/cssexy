/**
 * cdp2styles.js
 * Retrieves the CSS rules for a specified DOM node, returns the applied rules
 *
 * @param {object} cdpClient - The Chrome DevTools Protocol client
 * @param {object} DOM - The DOM domain object
 * @param {object} CSS - The CSS domain object
 * @param {object} Network - The Network domain object
 * @param {object} Page - The Page domain object
 * @param {object} iframeNode - The iframe node object
 * @param {string} selector - The CSS selector for the node
 * @return {array} The applied CSS rules
 */

import fs from 'fs';
const cdpInlineRules = async (CSS, nodeId) => {
  // retrieve the inline styles for the node with the provided nodeId
  const { inlineRule } = await CSS.getInlineStylesForNode({ nodeId });

  // check if there are any inline styles for this node
  if (inlineRule) {
    // log the CSS text representing the inline style and the range within the document where these styles are applied
    console.log('Inline styles:', inlineRule.cssText);
    console.log('range:', inlineRule.range);
  } else {
    // if no inline styles are present
    console.log(`No inline styles found for nodeId ${nodeId}.`);
  }
  const updatedInlineRule = [
    {
      "rule": {
        "origin": "inline",
        "style":  inlineRule,
        }
    }
  ]

  return updatedInlineRule;
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

const cdpRules = async (cdpClient, DOM, CSS, Network, Page, iframeNode, selector) => {

  // Get the nodeId of the node based on its CSS selector
  const iframeNodeId = iframeNode.nodeId;
  console.log('root frame node id:', iframeNodeId);

  const { nodeId } = await DOM.querySelector({
    nodeId: iframeNodeId,
    selector: selector
  });

  console.log('nodeId for selector', selector, 'is:', nodeId);

  console.log('Getting styles for element:', selector);
  // Get and log the inline styles
  const inlineRules = await cdpInlineRules(CSS, nodeId);
  const regularRules = {};
  const userAgentRules = {};

  fs.writeFileSync('./data/output/inlineRules.json', JSON.stringify(inlineRules, null, 2));

  // get all CSS rules that are applied to the node
  // => matchedCSSRules contains CSS rules that are directly applied to the node
  // => inherited contains the CSS rules that are passed down from the node's ancestors
  // => cssKeyframesRules includes all the @keyframes rules applied to the node
  const { matchedCSSRules, inherited, cssKeyframesRules } = await CSS.getMatchedStylesForNode({ nodeId });

  // console.log('matchedCSSRules:', matchedCSSRules);

  // recursiveConsoleLog(CSS);

  // add inline styles obj to matchedRules array following the same properties format which MatchedRules components and Style components need
  const appliedRules = [...matchedCSSRules];

  const parseMatchedCSSRules = async (matchedCSSRules) => {
    await matchedCSSRules.forEach((rule) => {
      if (rule.rule.origin === 'regular') {
        console.log('regular rule');
        regularRules.push(rule);
      }
    })
  }

parseMatchedCSSRules(matchedCSSRules);

  const result = {
    "regularRules": regularRules,
    "inlineRules": inlineRules,
  }

  fs.writeFileSync('./data/output/appliedRules.json', JSON.stringify(appliedRules, null, 2));

  console.log('cdpRules: returning appliedRules');
  return appliedRules;
}

export default cdpRules
