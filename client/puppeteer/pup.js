import puppeteer from 'puppeteer'

const pupArgs =[
    '--app=http://localhost:8888', // Replace with your desired URL
    '--disable-web-security',
]

const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: null,
  devtools: true,
  args: pupArgs
});

let [page] = await browser.pages();

console.log('browser args',pupArgs);
if (pupArgs[0].includes('--app')) {
  console.log('pupArgs includes --app');
}
else {
  console.log('pupArgs does not include --app');

  const page = await browser.newPage();
  await page.goto('http://localhost:8888');
}

const session = await page.createCDPSession()
const sessionId = session.id();

await session.send('DOM.enable')
await session.send('CSS.enable')

const doc = await session.send('DOM.getDocument');

//Query the nodes on the page by selector type use * to get all nodes on the page
const nodes = await session.send('DOM.querySelectorAll', {
    nodeId: doc.root.nodeId,
    selector: 'loadingText'
});

const stylesForNodes = []

for (const id of nodes.nodeIds) {
  stylesForNodes.push(await session.send('CSS.getMatchedRulesForNode', {nodeId: id}));
}
//See all the Nodes Requested
console.log("Rules for Nodes Array ===>", stylesForNodes)

//Get Rules for single Node Id
const styleForSingleNode = await session.send('CSS.getMatchedRulesForNode', {nodeId: 4});
console.log("Single Node Id: 4 ===>", styleForSingleNode)


//Get Specificity
// console.log("Specificity of specific Node ===> ", stylesForNodes[0].matchedCSSRules[0].rule.selectorList.selectors[0].specificity)

// leave the browser open so we can inspect it
