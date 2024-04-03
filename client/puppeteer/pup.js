import puppeteer from 'puppeteer'
import { writeFileSync, mkdir } from 'node:fs';

// we import this so that we can call it from here, passing the client and styleSheets variables to it when we do.
import { pupProcess } from './pupProcess.js';

// declaring client and styleSheets here (outside of pup) so we can have access to them in 'callPupProcess' function further down.
let client;
const styleSheets = {};

// this is the equivalent of the calling startRemoteChrome in prior, pre-puppeteer versions of our code.
// this entire file gets called in the server, and the function below is called immediately
// as we have set it up to be an IIFE (Immediately Invoked Function Expression).

(async () => {
  // pup.js
// console.log('pup.js', process);

const browserPort = process.env.BROWSER_PORT;

// const targetDir = arg1 || 'build'
console.log('pup.js: browserPort:', browserPort);


  const cssxeUrl = `http://localhost:${browserPort}/`;

  const pupArgs = [
    // uncomment this to turn on 'app' mode, i.e. no visible address bar and dev tools opens in a separate window.
    // probably do this for prod.
    // `--app=${cssxeUrl}`,
    // this is what so far allows us to pass data from inside of the iframe to the parent window, cssxe.
    '--disable-web-security',
    '--window-position=2000,200' // for dev mode for keith's environemnt. makes the browser open on my second screen, that way vs code isnt navigated away from
  ]

  // puppeteer: library for controlling Chrome/Chromium over a network protocol.
  const browser = await puppeteer.launch({
    // open browser window
    headless: false,
    // don't set a default viewport size. without this, i get a funky view where cssxe and the target site only take up a third of the browser window.
    defaultViewport: null,
    // open devtools. good for cssxe development mode. prob should be false for prod.
    devtools: true,
    // array of command-line args we define above to pass to Chrome
    args: pupArgs
  });

  // grab a reference to the single page that Puppeteer just opened up
  // the 'pages' method returns an array of all the pages that Puppeteer knows about, and we only want the one that it just created
  // so we use array destructuring to pull out the first (and only) element of that array, and assign it to our variable 'page'
  // now we can interact with the page, e.g. navigate to a URL, fill out a form, click a button, take a screenshot, etc.
  let [page] = await browser.pages();

  // if pupArgs doesn't include --app, we need to navigate the Page to the cssxeUrl
  if (!pupArgs[0].includes('--app')) {
    console.log('pupArgs does not include --app');
    await page.goto(cssxeUrl);
  }

  // setting client as the main connection to the Page,
  // through which we can send commands to it and receive events from it.
  // 'createCDPSession' is a method on the 'Page' object that Puppeteer provides.
  // it creates a new 'CDPSession', which is a connection to the DevTools Protocol for a specific target (in this case, the page).
  // this gives us access to a variety of APIs from the browser,
  // which we can use to interact with the page in various ways.
  client = await page.createCDPSession();

  // an array of CDP domains that we will enable
  // DOM: to interact with the structure of the DOM.
  // CSS: to query and manipulate CSS styles.
  // Network: to inspect network activity and manage network conditions.
  // Page: to control page navigation, lifecycle, and size.
  const domains = [ 'DOM', 'CSS', 'Network', 'Page', 'Overlay' ];

  // 'enable' is a prerequisite step before we can use the methods provided by each of the CDP domains.
  // enabling a domain starts the flow of events and allows command execution within that domain.
  // as Rob discovered, we also need to pass a callback to enable it, otherwise it won't do anything.
  // so we pass an empty function to it.
  await Promise.all(domains.map(async (domain) => {
    await client.send(`${domain}.enable`, () => { })
  }))

  // styleSheetAdded is a CDP event that is fired whenever a new stylesheet is added to the stylesheet cache.
  client.on('CSS.styleSheetAdded', async (param) => {
    // console.log('styleSheetAdded');
    const id = param.header.styleSheetId;

    // passing these values now, so we have them in the store. none of them have yet been or are being used as of 2024-04-02.
    styleSheets[id] = {
      frameId: param.header.frameId,
      // the url from importing fonts and the like, ala 'https://fonts.googleapis.com/...'
      sourceURL: param.header?.sourceURL,
      // the id of the styleSheet
      styleSheetId: param.header.styleSheetId,
      // the ownerNode of the styleSheet. I assume the same as the parent node?
      ownerNode: param.header?.ownerNode,
      // seems like its always 0? at least with webpack.
      startLine: param.header.startLine,
      // seems like its always 0? at least with webpack.
      startColumn: param.header.startColumn,
      // not sure the meaning of the below three yet. they differ for each stylesheet that has a sourcemap.
      length: param.header.length,
      endLine: param.header.endLine,
      endColumn: param.header.endColumn,

    }
    // if the sourceMapURL is present, add those paths to the styleSheets object.
    // this gets us the paths to the regular styles source files, i.e. .css, .scss.
    if (param.header.sourceMapURL) {
      // console.log('styleSheetAdded: sourceMapURL TRUE');
      // console.log('styleSheetParamHeader:', new Date().toISOString(), param.header);

      // the sourceMapURL comes in as a base64 string, so we need to decode it
      const sourceMapData = Buffer.from(param.header.sourceMapURL.split(',')[1], 'base64').toString('utf-8');
      // parse the JSON
      const decodedMap = JSON.parse(sourceMapData);

      // console.log('decodedMap', decodedMap);
      // write the decodedMap to a file
      writeFileSync('./data/output/decodedMap.json', JSON.stringify(decodedMap, null, 2));
      const sources = decodedMap.sources;
      const absolutePaths = []
      const relativePaths = [];
      // loop through the sources
      sources.forEach(source => {
        // we see this for s/css files when using webpack. it's the path relative to the project root
        if (source.includes('://')) {
          // splitting the source string on the '://', getting the second part, which is the relative path
          relativePaths.push(source.split('://')[1]);
        }
        // otherwise, it's an absolute path. havent seen these recently but i did at some point in development.
        else {
          absolutePaths.push(source);
        }
      })

      // add the various source paths of the id to its object in the styleSheets object.
      Object.assign(styleSheets[id], { sources, absolutePaths, relativePaths });
    }
    // console.log('pup:styleSheets', styleSheets);
  });
})();


const callPupProcess = async (...args) => await pupProcess(client, styleSheets, ...args);

// callPupProcess is called when the the /cdp endpoint is hit.
// // -> /cdp is hit by iFrameComp when a click event occurs inside of the iFrame.
export { callPupProcess };





// rob's initial puppeteer code, which shows how to get the styles for a specific node.
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
