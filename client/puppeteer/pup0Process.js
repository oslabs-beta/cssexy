
import fs from 'fs';
import { writeFileSync, mkdir } from 'node:fs';

import { pupEnable } from './pup1Enable.js';
import { pupRules } from './pup2Rules.js';

const pupProcess = async (client, styleSheets, data) => {
  const id = data?.id;
  const innerHTML = data?.innerHTML;
  const nodeName = data?.nodeName;
  const className = data?.className;
  // const proxy = data?.proxy;
  const nodeType = data?.nodeType;
  const textContent = data?.textContent;
  // const attributes = data?.attributes;

  console.log('pupProcess');
console.log('pupProcess: data', data);
  try {
      // setting our selector based on the attributes we received from the iframe.
      // starting with the most specific selector and working our way down.
      let selector = '';
      if (id) {
          console.log('element id:', id);
          selector = `#${id}`;
      }
      else if (className && !className.includes(' ')) {
          console.log('element class:', className);
          selector = `.${className}`;
      }
      else if (nodeName) {
          console.log('element nodeName:', nodeName);
          console.log('element className:', className);
          selector = `${nodeName}`;
      }
      else if (innerHTML) {
          console.log('element innerHTML:', innerHTML);
          selector = `${innerHTML}`;
      }
      else if (textContent) {
          console.log('element textContent:', textContent);
          selector = `${textContent}`;
      }

      console.log('pupProcess: selector:', selector);




      const { root: { nodeId } } = await client.send('DOM.getDocument');

      console.log('pupProcess: root nodeId:', nodeId);


      // await Promise.all([DOM.enable(() => { }), CSS.enable(() => { }), Network.enable(() => { }), Page.enable(() => { }), Overlay.enable(() => { })]);


      // console.log('pupProcess: trying to connect to Puppeteer');

      // pupClient is a newly created object that serves as our interface to send commands
      // and listen to events in Chrome via the Chrome DevTools Protocol (Puppeteer) by way of
      // chrome-remote-interface, a library that allows for easy access to the Chrome DevTools Protocol.

      // a version where we specify the tab we want to connect to, though I didn’t notice any difference or benefit in trying it.
      // pupClient = await Puppeteer({tab: 'http://localhost:5555'});

      // console.log('Connected to Chrome DevTools Protocol via chrome-remote-interface');

      // extracting the 'domains' from the Puppeteer client.
      const { iframeNode } = await pupEnable(client);

      // this is the core functionality of cssxe that retrieves styles from a website
      console.log('pupProcess: calling pupRules');

      // right now, result is an object that has both the matched and inline styles for the element clicked.
      const result = await pupRules(client, iframeNode, selector, styleSheets);
      //   console.log(`Rules for ${selector} retrieved`, result);
      return result;


  } catch (err) {
      console.error('Error connecting to Chrome', err);
  }
  finally {
      // It is considered a best practice to close resources such as connections in a finally block.
      // This ensures they are properly cleaned up, even in the event of an error.
      // Leaving connections open can lead to resource leaks and potential issues with system performance.
      // if (pupClient) {
      //     await pupClient.close();
      //     console.log('Puppeteer client closed');
      // }
  }
}



export { pupProcess };





// //Query the nodes on the page by selector type use * to get all nodes on the page
// const nodes = await session.send('DOM.querySelectorAll', {
//     nodeId: doc.root.nodeId,
//     selector: 'loadingText'
// });

// const stylesForNodes = []

// for (const id of nodes.nodeIds) {
//   stylesForNodes.push(await session.send('CSS.getMatchedRulesForNode', {nodeId: id}));
// }
// //See all the Nodes Requested
// console.log("Rules for Nodes Array ===>", stylesForNodes)

// //Get Rules for single Node Id
// const styleForSingleNode = await session.send('CSS.getMatchedRulesForNode', {nodeId: 4});
// console.log("Single Node Id: 4 ===>", styleForSingleNode)


//Get Specificity
// console.log("Specificity of specific Node ===> ", stylesForNodes[0].matchedCSSRules[0].rule.selectorList.selectors[0].specificity)

// leave the browser open so we can inspect it
