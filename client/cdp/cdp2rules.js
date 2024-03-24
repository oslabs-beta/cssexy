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
  try {

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

  } catch (error) {
    console.log('cdpInlineRules: error:', error);
  }
}

const cdpRules = async (cdpClient, DOM, CSS, Network, Page, Overlay, iframeNode, selector, styleSheets) => {



  const iframeNodeId = iframeNode.nodeId;
  // console.log('cdpRules: root frame node id:', iframeNodeId);

  // Get the nodeId of the node based on its CSS selector
  const { nodeId } = await DOM.querySelector({
    nodeId: iframeNodeId,
    selector: selector
  });


  // highlights the node. doesn’t work every time.
  // await DOM.highlightNode({
  //   nodeId,
  //   highlightConfig: {
  //     borderColor: { r: 255, g: 0, b: 0 },
  //     contentColor: { r: 255, g: 255, b: 255 }
  //   }
  // });

  // highlights a specific area on the page
  // await DOM.highlightRect({
  //   nodeId,
  //   x: 0,
  //   y: 0,
  //   width: 100,
  //   height: 100,
  //   color: { r: 255, g: 0, b: 0 },
  // });

  // console.log('cdpRules: nodeId for selector', selector, 'is:', nodeId);

  // console.log('cdpRules: Getting inline styles for element:', selector);
  // Get the inline styles
  const inlineRules = await cdpInlineRules(CSS, nodeId, selector);


  // console.log('cdpRules: Getting matched styles for element:', selector);

  // get all CSS rules that are applied to the node
  // => matchedCSSRules contains CSS rules that are directly applied to the node
  // => inherited contains the CSS rules that are passed down from the node's ancestors
  // => cssKeyframesRules includes all the @keyframes rules applied to the node

  const { matchedCSSRules, inherited: inheritedRules, cssKeyframesRules: keyframeRules } = await CSS.getMatchedStylesForNode({ nodeId });
  const regularRules = [];
  const userAgentRules = [];

  // console.log('cdpRules: matchedCSSRules:', matchedCSSRules);

  // this separates the matchedCSSRules into regularRules and userAgentRules
  // ahead of them being returned to iframeComp, where they then update the store
  // via dispatches.
  const parseMatchedCSSRules = async (matchedCSSRules) => {
    await matchedCSSRules.forEach((rule) => {
      if (rule.rule.origin === 'regular') {
        regularRules.push(rule);
      }
      else if (rule.rule.origin === 'user-agent') {
        userAgentRules.push(rule);
      }
    })
  }
  parseMatchedCSSRules(matchedCSSRules);

  const result = {
    inlineRules,
    regularRules,
    userAgentRules,
    styleSheets,
    // inheritedRules,
    // keyframeRules
  }

  fs.writeFileSync('./data/output/allRules.json', JSON.stringify(result, null, 2));
  fs.writeFileSync('./data/output/inlineRules.json', JSON.stringify(inlineRules, null, 2));
  fs.writeFileSync('./data/output/regularRules.json', JSON.stringify(regularRules, null, 2));
  fs.writeFileSync('./data/output/userAgentRules.json', JSON.stringify(userAgentRules, null, 2));
  fs.writeFileSync('./data/output/inheritedRules.json', JSON.stringify(inheritedRules, null, 2));
  fs.writeFileSync('./data/output/keyframeRules.json', JSON.stringify(keyframeRules, null, 2));

  console.log('cdpRules: returning result {inlineRules, regularRules, userAgentRules}');
  return result;
}

export default cdpRules
