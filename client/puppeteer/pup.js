import puppeteer from 'puppeteer'
const browser = await puppeteer.launch({headless:true, devtools:true});

const page = await browser.newPage();


const session = await page.createCDPSession()
await page.goto('https://pptr.dev');
const sessionId = session.id();

await session.send('DOM.enable')
await session.send('CSS.enable')

const doc = await session.send('DOM.getDocument');

//Query the nodes on the page by selector type use * to get all nodes on the page
const nodes = await session.send('DOM.querySelectorAll', {
    nodeId: doc.root.nodeId,
    selector: 'h1'
});

const stylesForNodes = []

for (const id of nodes.nodeIds) {
  stylesForNodes.push(await session.send('CSS.getMatchedStylesForNode', {nodeId: id}));
}
//See all the Nodes Requested
console.log("Styles for Nodes Array ===>", stylesForNodes)

//Get Styles for single Node Id
const styleForSingleNode = await session.send('CSS.getMatchedStylesForNode', {nodeId: 4});
console.log("Single Node Id: 4 ===>", styleForSingleNode)


//Get Specificity
console.log("Specificity of specific Node ===> ", stylesForNodes[0].matchedCSSRules[0].rule.selectorList.selectors[0].specificity)

browser.close()