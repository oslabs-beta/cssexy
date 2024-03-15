/**
 * cdp1Enable.js
 * Enables the necessary CDP listeners and state on the browser side to interact with the specified domain.
 *
 * @param {object} client - The client object for interacting with the browser.
 * @param {string} port - The URL of the page to navigate to.
 * @return {object} An object containing the enabled DOM, CSS, Network, and Page domains.
 */



import { writeFileSync, mkdir } from 'node:fs';
import { decodeBase } from './getSource.js';
const cdpEnable = async (client, proxy, selector) => {
  // extract the different 'domains' from the client.
  const { DOM, CSS, Network, Page } = client;

  // 'enable' on a domain sets up the necessary listeners and state on the browser side to interact with that domain.
  // this is a prerequisite step before we can use the methods provided by each of the domains.
  // enabling a domain starts the flow of events and allows command execution within that domain.

  // DOM: to interact with the structure of the DOM.
  // CSS: to query and manipulate CSS styles.
  // Network: to inspect network activity and manage network conditions.
  // Page: to control page navigation, lifecycle, and size.
  await Promise.all([DOM.enable(() => { }), CSS.enable(() => { }), Network.enable(() => { }), Page.enable(() => { })]);

  // console.log('cdpEnable: DOM, CSS, Network, and Page domains are enabled');
  CSS.styleSheetAdded((param) => {
    if (param.header.sourceMapURL) {
      decodeBase(param.header.sourceMapURL)
    }

  });

  // console.log('getting nodes');
  // getFlattenedDocument: returns a flattened array of the DOM tree at the specified depth
  // if no depth is specified, the entire DOM tree is returned.
  // depth: depth of the dom tree that we want
  // -> -1 means we want to get the entire DOM tree.
  // -> >= 0 would correspond to a specific depth of the DOM tree.
  const { nodes } = await DOM.getFlattenedDocument({ depth: -1 });

  //Create the directory before trying to add the file.
  await mkdir((new URL('../../data/output/', import.meta.url)), { recursive: true }, (err) => {
    if (err) throw err;
  });

  writeFileSync('./data/output/nodes.json', JSON.stringify(nodes, null, 2));

  // Find nodes where the nodeName property is 'IFRAME'.
  // In looking through the nodes, I saw only one IFRAME node, which corresponded to the root node of the iframe.
  // TBD if there would be more than one if the site we are targeting has iframes within it.
  const iframeNodeId = await nodes.filter(node => node.nodeName === 'IFRAME')[0].nodeId;

  // console.log('iframeNodeId', iframeNodeId);

  // describeNode: gets a description of a node with a given DOM nodeId, i.e. the type of node, its name, and its children.
  const { node } = await DOM.describeNode({ nodeId: iframeNodeId });

  // console.log('cdpEnable: node', node);

  // from there we get the contentDocument of the iframeNode,
  // which is the html document of the iframe
  const iframeNode = node.contentDocument;
  // console.log('Node inside iframe', iframeNode);

  // this console logs the contentDocument node of the iframe
  writeFileSync('./data/output/iframeNode.json', JSON.stringify(iframeNode, null, 2));

  // Return the enabled domains and the nodeId of the iframe root node to the process
  return { DOM, CSS, Network, Page, iframeNode };
}

export default cdpEnable;
