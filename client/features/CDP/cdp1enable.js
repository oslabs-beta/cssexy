/**
 * cdp1Enable.js
 * Enables the necessary CDP listeners and state on the browser side to interact with the specified domain.
 *
 * @param {object} client - The client object for interacting with the browser.
 * @param {string} port - The URL of the page to navigate to.
 * @return {object} An object containing the enabled DOM, CSS, Network, and Page domains.
 */

import fs from 'fs';


const cdpEnable= async (client, proxy, selector) => {
  // extract the different 'domains' from the client.
  const { DOM, CSS, Network, Page } = client;

  // 'enable' on a domain sets up the necessary listeners and state on the browser side to interact with that domain.
  // this is a prerequisite step before we can use the methods provided by each of the domains.
  // enabling a domain starts the flow of events and allows command execution within that domain.

  // DOM: to interact with the structure of the DOM.
  // CSS: to query and manipulate CSS styles.
  // Network: to inspect network activity and manage network conditions.
  // Page: to control page navigation, lifecycle, and size.
  await Promise.all([DOM.enable(), CSS.enable(), Network.enable(), Page.enable()]);
  console.log('CSS, DOM, Network, and Page domains are enabled');

  // const { frameTree } = await Page.getFrameTree();
  // const iframeFrame = frameTree.childFrames.find((frame) => frame.frame.url.includes(`http://localhost:${proxy}/`));

  // const iframeId = iframeFrame.frame.id;

  // if (!iframeFrame) {
  //   throw new Error(`No iframe found with url including localhost:${host}`);
  // }
  // else {
  //   console.log('cdp1enable:iframeFrame', iframeFrame);
  // }

  // Get the root node of the iframe
  // get the Document node of the iframe, which is the top level node in the
  // DOM tree, with a depth of 0 meaning we don't want to go deeper into the
  // tree (we want the root node, not its children), and pierce: true means
  // we want to pierce through any shadow roots.
  // Shadow roots are used to create encapsulated DOM trees within a document
  // that are not visible to regular DOM queries.
  // By piercing through a shadow root, we can access nodes within that shadow
  // root that would be inaccessible without piercing.
console.log('getting nodes');
// Get the flattened DOM tree at the max depth
const { nodes } = await DOM.getFlattenedDocument({ depth: -1, pierce: true});

// console.log('nodes gotten');

// fs.writeFileSync('./data/styles/nodes.json', JSON.stringify(nodes, null, 2));


// Find nodes where the nodeName property is 'IFRAME'
const iframeNodeId = await nodes.filter(node => node.nodeName === 'IFRAME')[0].nodeId;

console.log('iframeNodeId', iframeNodeId);

const { node: iframeNode } = await DOM.describeNode({ nodeId: iframeNodeId, depth: -1, pierce: true });


const iframeDoc = iframeNode.contentDocument;
// console.log('Node inside iframe', iframeNode.contentDocument);

// fs.writeFileSync('./client/features/CDP/iframeNode.json', JSON.stringify(iframeDoc, null, 2));

// Get the DOM tree of the iframe


// Log all nodes
// console.log('All nodes', nodes);

// const { nodeId } = await DOM.querySelector({
//   nodeId: iframeRootNodeId,
//   selector: selector
// });







  // navigating to the desired page, i.e. the port the user's site is served to.
  // await Page.navigate({url: `http://localhost:${proxy}`});

  // wait for the 'loadEventFired' event which signals that the page has finished loading
  // now that the page has loaded, we can start listening for events
  // and be assured that calls to the enabled domains will work and return data
  // await new Promise(resolve => Page.loadEventFired(resolve));
  // console.log('Page loaded');



  // Return the enabled domains and the nodeId of the iframe root node to the process
  return { DOM, CSS, Network, Page, iframeDoc };
}

export default cdpEnable;
