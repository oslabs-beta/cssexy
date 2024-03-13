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
const cdpInlineRules = async (CSS, nodeId, selector) => {
  // retrieve the inline styles for the node with the provided nodeId
  const { inlineStyle } = await CSS.getInlineStylesForNode({ nodeId });
  const inlineRule = [];

  // console.log('cdpInlineRules: inlineRule:', inlineRule);

  // check if there are any inline styles for this node
  if (inlineStyle) {

    console.log(`Found: inline styles for selector '${selector}' with nodeId ${nodeId}.`);
    // push the inline styles to the inlineRule array
    inlineRule.push({
      "rule": {
        "origin": "inline",
        "style":  inlineStyle,
        }
    })

  } else {
    // if no inline styles are present
    console.log(`Not Found: inline styles for selector '${selector}' with nodeId ${nodeId}.`);
  }
  return inlineRule;
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

  const iframeNodeId = iframeNode.nodeId;
  // console.log('cdpRules: root frame node id:', iframeNodeId);

  // Get the nodeId of the node based on its CSS selector
  const { nodeId } = await DOM.querySelector({
    nodeId: iframeNodeId,
    selector: selector
  });

  // console.log('cdpRules: nodeId for selector', selector, 'is:', nodeId);

  // console.log('cdpRules: Getting inline styles for element:', selector);
  // Get the inline styles
  const inlineRules = await cdpInlineRules(CSS, nodeId, selector);

  // fs.writeFileSync('./data/output/inlineRules.json', JSON.stringify(inlineRules, null, 2));

  // console.log('cdpRules: Getting matched styles for element:', selector);

  // get all CSS rules that are applied to the node
  // => matchedCSSRules contains CSS rules that are directly applied to the node
  // => inherited contains the CSS rules that are passed down from the node's ancestors
  // => cssKeyframesRules includes all the @keyframes rules applied to the node
  const { matchedCSSRules, inherited, cssKeyframesRules } = await CSS.getMatchedStylesForNode({ nodeId });
  const regularRules = [];
  const userAgentRules = [];

  // console.log('cdpRules: matchedCSSRules:', matchedCSSRules);
  // recursiveConsoleLog(CSS);

  // this separates the matchedCSSRules into regularRules and userAgentRules
  // ahead of them being returned to iframeComp, where they then update the store
  // via dispatches.
  const parseMatchedCSSRules = async (matchedCSSRules) => {
    await matchedCSSRules.forEach((rule) => {
      if (rule.rule.origin === 'regular') {
        console.log('regular rule');
        regularRules.push(rule);
      }
      else if (rule.rule.origin === 'user-agent') {
        console.log('user-agent rule');
        userAgentRules.push(rule);
      }
    })
  }
  parseMatchedCSSRules(matchedCSSRules);

  const result = {
    inlineRules,
    regularRules,
    userAgentRules
  }

  fs.writeFileSync('./data/output/rules.json', JSON.stringify(result, null, 2));

  console.log('cdpRules: returning result {inlineRules, regularRules, userAgentRules}');
  return result;
}

export default cdpRules
