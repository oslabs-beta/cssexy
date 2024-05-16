import puppeteer from 'puppeteer'
import { writeFileSync, mkdir } from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';

// we import this so that we can call it from here, passing the client and styleSheets variables to it when we do.
import { pupProcess } from './pupProcess.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __envPath = path.resolve(__dirname, '../../.env')

config({ path: __envPath });
// console.log('filename:', __filename);
// console.log('dirname:', __dirname);
// console.log('path:', __envPath);

const coder = process.env.CODER;

// declaring client and styleSheets here (outside of the unnamed function) so we can have access to them in the 'callPupProcess' function further down.
let client;
const styleSheets = {};
const pathsDx = {};
const mapsDx = {};

// this entire file gets called in the server, and the function below is called immediately
// as we have set it up to be an IIFE (Immediately Invoked Function Expression).
(async () => {

  // console.log('pup.js', process);
  const browserPort = process.env.BROWSER_PORT;
  const targetDir = process.env.TARGET_DIR;
  const cssexyUrl = `http://localhost:${browserPort}/`;

  const pupArgs = [
    // uncomment this to turn on 'app' mode, i.e. no visible address bar and dev tools opens in a separate window.
    // probably do this for prod.
    // `--app=${cssexyUrl}`,
    // this is what so far allows us to pass data from inside of the iframe to the parent window, cssexy.
    '--disable-web-security',
    // makes the empty browser window dark mode. no more white killing my eyes during development. turn this off in prod mode.
    '--enable-features=WebContentsForceDark'
  ]

  // for keith's environemnt. opens the browser on second screen
  coder == 'KEITH' ? pupArgs.push('--window-position=2000,200') : null;

  const coderProfile = !coder ? path.resolve(__dirname, `../../data/Chrome/Profiles/${coder}/`) : null

  const pupOptions = {
    // open browser window
    headless: false,
    // don't set a default viewport size. without this, i get a funky view where cssexy and the target site only take up a third of the browser window.
    defaultViewport: null,
    // open devtools. good for cssexy development mode. prob should be false for prod.
    devtools: true,
    // array of command-line args we define above to pass to Chrome
    args: pupArgs,
    // for us to specify a chrome profile, which allows us to maintain history between puppeteer sessions.
    // could be something we want to offer as a feature for users too. NOTE 2024-04-20_12-59-AM.
    userDataDir: coderProfile
  }

  // puppeteer: library for controlling Chrome/Chromium over a network protocol.
  const browser = await puppeteer.launch(pupOptions);

  // grab a reference to the single page that Puppeteer just opened up
  // the 'pages' method returns an array of all the pages that Puppeteer knows about, and we only want the one that it just created
  // so we use array destructuring to pull out the first (and only) element of that array, and assign it to our variable 'page'
  // now we can interact with the page, e.g. navigate to a URL, fill out a form, click a button, take a screenshot, etc.
  let [page] = await browser.pages();

  // if pupArgs doesn't include --app, we need to navigate the Page to the cssexyUrl
  if (!pupArgs[0].includes('--app')) {
    // console.log('pupArgs does not include --app');
    await page.goto(cssexyUrl);
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
  // Overlay: to control the browser overlay, such as the inspector.
  const domains = ['DOM', 'CSS', 'Network', 'Page', 'Overlay'];

  // 'enable' is a prerequisite step before we can use the methods provided by each of the CDP domains.
  // enabling a domain starts the flow of events and allows command execution within that domain.
  // as Rob discovered, we also need to pass a callback to enable it, otherwise it won't do anything.
  // so we pass an empty function to it.
  await Promise.all(domains.map(async (domain) => {
    await client.send(`${domain}.enable`, () => { })
  }))
  console.log('pup: domains enabled');
  // recursive = true: if the folder already exists, it doesn't throw an error
  // mkdir((new URL('../../data/output/page', import.meta.url)), { recursive: true }, (err) => {
  //   if (err) throw err;
  // });

  // page.on('response', async () => {
  //   const content = await page.content();
  //   // writeFileSync(`./data/output/page/content`, JSON.stringify(content, null, 2));
  //   writeFileSync(`./data/output/page/content`, content);

  //   console.log('pup: page: content retrieved');
  //   // console.warn('pup: load: content', content);
  // })
  // styleSheetAdded is a CDP event that is fired whenever a new stylesheet is added to the stylesheet cache.
  client.on('CSS.styleSheetAdded', async (param) => {
    // console.log('styleSheetAdded');
    const id = param.header.styleSheetId;

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
    if (!param.header.sourceMapURL) {
      return;
    }
    // console.log('styleSheetAdded: sourceMapURL', param.header.sourceMapURL);
    // console.log('styleSheetAdded: sourceMapURL TRUE');
    // console.log('styleSheetParamHeader:', new Date().toISOString(), param.header);

    // the sourceMapURL comes in as a base64 string, so we need to decode it
    const sourceMapData = Buffer.from(param.header.sourceMapURL.split(',')[1], 'base64').toString('utf-8');
    // parse the JSON
    const decodedMap = JSON.parse(sourceMapData);


    const sources = decodedMap.sources;
    const pathsAbsolute = []
    const pathsRelative = [];
    const pathsAll = [];
    // loop through the sources
    sources.forEach(source => {
      // we see this for s/css files when using webpack. it's the path relative to the project root
      if (source.includes('://')) {
        // splitting the source string on the '://', getting the second part, which is the relative path
        const pathRelative = source.split('://.')[1];
        pathsRelative.push(pathRelative);


      }
      // otherwise, it's an absolute path. havent seen these recently but i did at some point in development.
      else {
        pathsAbsolute.push(source);

      }
    })

    for (let i = Math.max(pathsAbsolute.length - 1, pathsRelative.length - 1); i >= 0; i--) {
      if (!pathsAbsolute[i] && !pathsRelative[i]) {
        break;
      }
      pathsAll.push(pathsAbsolute[i] ? pathsAll[i] : `${targetDir}${pathsRelative[i]}`);
    }

    // add the various source paths of the id to its object in the styleSheets object.

    Object.assign(styleSheets[id], { sources, pathsAbsolute, pathsRelative, pathsAll });
    const styleSheetId = styleSheets[id].styleSheetId;
    console.log('pup:styleSheet', styleSheetId);
    pathsDx.styleSheetId = { sources, pathsAbsolute, pathsRelative, pathsAll };
    mapsDx.styleSheetId = decodedMap;

    mkdir((new URL('../../data/output/decodedSourceMaps', import.meta.url)), { recursive: true }, (err) => {
      if (err) throw err;
    });
    // // console.log('pupProcess: calling writeFileSync');
    writeFileSync(`./data/output/decodedSourceMaps/${styleSheetId}.json`, JSON.stringify(decodedMap, null, 2));

    // console.log('\n\n');
    // console.warn('styleSheetAdded: pathsDx', pathsDx);
    // console.log('\n\n');
  }
    // console.log('\n\n');
    // console.log('pup:styleSheets', styleSheets);
    // console.log('END OF STYLESHEETS');
    // console.log('\n\n');

  );

})(pupProcess);
// data passed from server = ...args
const callPupProcess = async (...args) => await pupProcess(client, styleSheets, ...args);

// callPupProcess is called when the the /cdp endpoint is hit.
// // -> /cdp is hit by iframeComp when a click event occurs inside of the iframe.
export { callPupProcess };
