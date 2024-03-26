import puppeteer from 'puppeteer'
import { writeFileSync, mkdir } from 'node:fs';

import { pupProcess } from './pupProcess.js';

let client;
const styleSheets = {};

const pup = async (browserPort) => {

  const targetUrl = `http://localhost:${browserPort}/`;

  const pupArgs = [
    // `--app=${targetUrl}`,
    '--disable-web-security',
  ]

  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    devtools: true,
    args: pupArgs
  });

  let [page] = await browser.pages();

  // console.log('browser args', pupArgs);
  if (pupArgs[0].includes('--app')) {
    console.log('pupArgs includes --app');
  }
  else {
    console.log('pupArgs does not include --app');
    await page.goto(targetUrl);
  }

  client = await page.createCDPSession();

  // 'enable' on a domain sets up the necessary listeners and state on the browser side to interact with that domain.
  // this is a prerequisite step before we can use the methods provided by each of the domains.
  // enabling a domain starts the flow of events and allows command execution within that domain.

  // DOM: to interact with the structure of the DOM.
  // CSS: to query and manipulate CSS styles.
  // Network: to inspect network activity and manage network conditions.
  // Page: to control page navigation, lifecycle, and size.


  await Promise.all([
    client.send('DOM.enable', () => { }),
    client.send('CSS.enable', () => { }),
    client.send('Network.enable', () => { }),
    client.send('Page.enable', () => { }),
    client.send('Overlay.enable', () => { })
  ]);

  client.on('CSS.styleSheetAdded', async (param) => {
    // console.log('styleSheetAdded');
    if (param.header.sourceMapURL) {
      // console.log('styleSheetAdded with sourceMapURL');
      const id = param.header.styleSheetId;

      const sourceMapData = Buffer.from(param.header.sourceMapURL.split(',')[1], 'base64').toString('utf-8');
      const decodedMap = JSON.parse(sourceMapData);
      // console.log('\n\n\n');
      // console.log('decodedMap', decodedMap);
      writeFileSync('./data/output/decodedMap.json', JSON.stringify(decodedMap, null, 2));
      const sources = decodedMap.sources;
      const absolutePaths = []
      const relativePaths = [];
      sources.forEach(source => {
        // splitting the source string on the '://'
        // pushing the second part, the path, into the paths array
        if (source.includes('://')) {
          relativePaths.push(source.split('://')[1]);
        }
        else {
          absolutePaths.push(source);
        }
      })

      styleSheets[id] = {
        sources,
        absolutePaths,
        relativePaths
      }
      // console.log('\n\n');
      // console.log('pup:styleSheets', styleSheets);
      // console.log('\n\n');
    }
    else {
      // console.log('styleSheetAdded: no sourceMapURL');
      // console.log('styleSheetParamHeader:', param.header);
    }
  });
};


const callPupProcess = async (...args) => await pupProcess(client, styleSheets, ...args);

export { pup, callPupProcess };

// const doc = await session.send('DOM.getDocument');

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
