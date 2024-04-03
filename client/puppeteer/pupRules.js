/**
 * pup2rules.js
 * Retrieves the CSS rules for a specified DOM node, returns the applied rules
 *
 * @param {object} client - The Puppeteer CDP client
 * @param {object} iframeNode - The iframe node object
 * @param {string} selector - The CSS selector for the node
 * @return {object} The applied CSS rules
 */

import fs from 'fs';

const pupRules = async (client, iframeNode, selector) => {

  const iframeNodeId = iframeNode.nodeId;
  // console.log('pupRules: root frame node id:', iframeNodeId);

  // Get the nodeId of the node based on its CSS selector
  const { nodeId } = await client.send('DOM.querySelector', {
    nodeId: iframeNodeId,
    selector: selector
  });

  // console.log('pupRules: Getting inline styles for element:', selector, ', nodeId:', nodeId);

  // Get the inline styles
  // the function is below, a
  const inlineRules = await getInlineRules(client, nodeId, selector);

  // get all CSS rules that are applied to the node
  // => matchedCSSRules contains CSS rules that are directly applied to the node
  // => inherited contains the CSS rules that are passed down from the node's ancestors
  // => cssKeyframesRules includes all the @keyframes rules applied to the node
  // console.log('pupRules: Getting matched styles for element:', selector, ', nodeId:', nodeId);
  const { matchedCSSRules, inherited: inheritedRules, cssKeyframesRules: keyframeRules } = await client.send('CSS.getMatchedStylesForNode', { nodeId });
  const regularRules = [];
  const userAgentRules = [];

  // console.log('pupRules: matchedCSSRules:', matchedCSSRules);

  // this separates the matchedCSSRules into regularRules and userAgentRules
  // ahead of them being returned to iframeComp, where they then update the store
  // via dispatches.
  const parseMatchedRules = async (matchedCSSRules) => {
    await matchedCSSRules.forEach((each) => {
      if (each.rule.origin === 'regular') {
        regularRules.push(each);
      }
      else if (each.rule.origin === 'user-agent') {
        userAgentRules.push(each);
      }
    })
  }
  parseMatchedRules(matchedCSSRules);

  const result = {
    inlineRules,
    regularRules,
    userAgentRules,
    inheritedRules,
    keyframeRules
  }

  // fs.writeFileSync('./data/output/allRules.json', JSON.stringify(result, null, 2));
  // fs.writeFileSync('./data/output/inlineRules.json', JSON.stringify(inlineRules, null, 2));
  // fs.writeFileSync('./data/output/regularRules.json', JSON.stringify(regularRules, null, 2));
  // fs.writeFileSync('./data/output/userAgentRules.json', JSON.stringify(userAgentRules, null, 2));
  // fs.writeFileSync('./data/output/inheritedRules.json', JSON.stringify(inheritedRules, null, 2));
  // fs.writeFileSync('./data/output/keyframeRules.json', JSON.stringify(keyframeRules, null, 2));

  // console.log('pupRules: returning result {inlineRules, regularRules, userAgentRules}');
  return result;
}

const getInlineRules = async (client, nodeId, selector) => {
  // retrieve the inline styles for the node with the provided nodeId
  try {

    const { inlineStyle } = await client.send('CSS.getInlineStylesForNode', { nodeId });

    // console.log('pupInlineRules: inlineStyle:', inlineStyle);

    const inlineRule = [];

    // check if there are any inline styles for this node
    if (inlineStyle) {
      // console.log(`Found: inline styles for selector '${selector}' with nodeId ${nodeId}.`);
      // push the inline styles to the inlineRule array
      inlineRule.push({
        "rule": {
          "origin": "inline",
          "style": inlineStyle,
        }
      })

    } else {
      // if no inline styles are present
      console.log(`Not Found: inline styles for selector '${selector}' with nodeId ${nodeId}.`);
    }
    return inlineRule;

  } catch (error) {
    console.log('pupInlineRules: error:', error);
  }
}
export { pupRules }
