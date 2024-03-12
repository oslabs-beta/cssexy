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


  // getFlattenedDocument: returns a flattened array of the DOM tree at the specified depth
  // if no depth is specified, the entire DOM tree is returned
  // depth: of the dom tree that we want
  // -> -1 means we want to get the entire DOM tree.
  // -> >= 0 would correspond to a specific depth of the DOM tree.
  // pierce: true means we want to pierce through any shadow roots.
  // -> Shadow roots are used to create encapsulated DOM trees within a document
  // -> that are not visible to regular DOM queries.
  // By piercing through a shadow root, we can access nodes within that shadow
  // root that would be inaccessible without piercing.
  // Get the flattened DOM tree at the max depth
console.log('getting nodes');
const { nodes } = await DOM.getFlattenedDocument({ depth: -1, pierce: true});

fs.writeFileSync('./data/output/nodes.json', JSON.stringify(nodes, null, 2));

// Find nodes where the nodeName property is 'IFRAME'
const iframeNodeId = await nodes.filter(node => node.nodeName === 'IFRAME')[0].nodeId;

console.log('iframeNodeId', iframeNodeId);

const { node: iframeNode } = await DOM.describeNode({ nodeId: iframeNodeId, depth: -1, pierce: true });

const iframeDoc = iframeNode.contentDocument;
// console.log('Node inside iframe', iframeNode.contentDocument);

fs.writeFileSync('./data/output/iframeNode.json', JSON.stringify(iframeDoc, null, 2));

  // Return the enabled domains and the nodeId of the iframe root node to the process
  return { DOM, CSS, Network, Page, iframeDoc };
}

export default cdpEnable;
