/**
 * pupRules.js
 * Retrieves the CSS rules for a specified DOM node, returns the applied rules
 *
 * @param {object} client - The Puppeteer CDP client
 * @param {object} elementNodeId - The node ID of the clicked element
 * @return {object} The applied CSS rules
 */

import fs from 'fs';

const pupRules = async (client, elementNodeId) => {
  // get all CSS rules that are applied to the node, save for inline.
  // => matchedCSSRules contains CSS rules that are directly applied to the node
  // => inherited contains the CSS rules that are passed down from the node's ancestors
  // => cssKeyframesRules includes all the @keyframes rules applied to the node
  // console.log('pupRules: Getting matched styles for elementNodeId:', elementNodeId);
  const { matchedCSSRules, inherited: inheritedRules, cssKeyframesRules: keyframeRules } = await client.send('CSS.getMatchedStylesForNode', { nodeId: elementNodeId });
  const regularRules = [];
  const userAgentRules = [];

  // const allRules = await client.send('CSS.getMatchedStylesForNode', { elem });

  // console.log('pupRules: matchedCSSRules:', matchedCSSRules);

  // filter out cssProperties that have less than 3 properties,
  // e.g. {name: 'text-align', value: 'center'}

  // const filterCssProps = (cssProps) => cssProps.filter(({ length }) => length > 2).reduce((obj, cssProp) => ({ ...obj, [cssProp.name]: cssProp.value }), {});


  // this separates the matchedCSSRules into regularRules and userAgentRules
  // ahead of them being returned to iframeComp, where they then update the store
  // via dispatches.
  const parseMatchedRules = async (matchedCSSRules) => {
    await matchedCSSRules.forEach((each) => {
      if (each.rule.origin === 'regular') {
        // console.log('pupRules: each regularRule:', each);
        const cssPropsNoTwoProp = each.rule.style.cssProperties.filter(eachCssProp => Object.keys(eachCssProp).length > 2);
        console.log('pupRules: regularRules.style.cssProperties has more than 2 values:', cssPropsNoTwoProp);

        regularRules.push({
          ...each,
          rule: {
            ...each.rule,
            style: {
              ...each.rule.style,
              cssProperties: cssPropsNoTwoProp
            }
          }
        });
        console.log('\n\n');
        // if (each.rule.style.cssProperties.length) {
        //   console.log('pupRules: regularRules.style.cssProperties:', each.rule.style.cssProperties);
        // }
        // else {
        //   console.log('pupRules: regularRules: NO cssProperties:', each.rule.style);
        // }
      }
      else if (each.rule.origin === 'user-agent') {
        userAgentRules.push(each);
      }
    })
  }
  parseMatchedRules(matchedCSSRules);

//   for (let each of regularRules) {
//     if (!each.rule.style.cssProperties.length) {
// console.log('no cssProperties in rule:', each);
//       continue
//     }
//     const { cssProperties } = each.rule.style;
//     if (cssProperties.length) {
//       console.log('pupRules: regularRules: cssProperties:', cssProperties);
//       for (let prop of cssProperties) {
//         // console.log('pupRules: regularRules: cssProperties: prop:', prop);

//       }
//     }

//   }


  const getInlineRules = async () => {
    // retrieve the inline styles for the node with the provided elementNodeId
    try {

      const { inlineStyle } = await client.send('CSS.getInlineStylesForNode', { nodeId: elementNodeId });

      // console.log('pupInlineRules: inlineStyle:', inlineStyle);

      const inlineRule = [];

      // check if there are any inline styles for this node
      if (inlineStyle) {

        console.warn(`Found: inline styles for elementNodeId ${elementNodeId}.
        \n
        ${inlineStyle}`);
        console.log('pupInlineRules: inlineStyle:', inlineStyle);
        // push the inline styles to the inlineRule array

        inlineStyle.cssProperties = inlineStyle.cssProperties.filter(eachCssProp => Object.keys(eachCssProp).length > 2);

        // .forEach((prop) => {
        //   if (prop.length <= 2) {
        //     console.log('pupRules: inlineStyle.cssProperties line 105:', prop);
        //     inlineStyle.cssProperties.splice(inlineStyle.cssProperties.indexOf(prop), 1);
        //   }

        // })

        console.log('pupInlineRules: inlineStyle.cssProperties line 110:', inlineStyle.cssProperties);
        inlineRule.push({
          "rule": {
            "origin": "inline",
            "style": inlineStyle,
          }
        })

      } else {
        // if no inline styles are present
        console.log(`No inline styles for elementNodeId ${elementNodeId}.`);
      }
      return inlineRule;

    } catch (error) {
      console.log('pupInlineRules: error:', error);
    }
  }


  // Get the inline styles for the element node
  // console.log('pupRules: Getting inline styles for elementNodeId:', elementNodeId);
  const inlineRules = await getInlineRules();


  const result = {
    inlineRules,
    regularRules,
    userAgentRules,
    inheritedRules,
    keyframeRules
  }

  // fs.writeFileSync('./data/output/allRules.json', JSON.stringify(allRules, null, 2));
  // fs.writeFileSync('./data/output/inlineRules.json', JSON.stringify(inlineRules, null, 2));
  // fs.writeFileSync('./data/output/regularRules.json', JSON.stringify(regularRules, null, 2));
  // fs.writeFileSync('./data/output/userAgentRules.json', JSON.stringify(userAgentRules, null, 2));
  // fs.writeFileSync('./data/output/inheritedRules.json', JSON.stringify(inheritedRules, null, 2));
  // fs.writeFileSync('./data/output/keyframeRules.json', JSON.stringify(keyframeRules, null, 2));

  // console.log('pupRules: returning result {inlineRules, regularRules, userAgentRules}');
  return result;
}


export { pupRules }
