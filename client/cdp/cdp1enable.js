/**
 * cdp1Enable.js
 * Enables the necessary CDP listeners and state on the browser side to interact with the specified domain.
 *
 * @param {object} client - The client object for interacting with the browser.
 * @param {string} port - The URL of the page to navigate to.
 * @return {object} An object containing the enabled DOM, CSS, Network, and Page domains.
 */

import { writeFileSync, mkdir } from 'node:fs';

const cdpEnable = async (cdpClient) => {
  // extract the different 'domains' from the client.
  const { DOM, CSS, Network, Page, Overlay } = cdpClient;

  // getting the target URL from the environment variables
  const targetUrl = `http://localhost:${process.env.VITE_PROXY}/`;
  console.log('cdpEnable: targetUrl:', targetUrl);

  // 'enable' on a domain sets up the necessary listeners and state on the browser side to interact with that domain.
  // this is a prerequisite step before we can use the methods provided by each of the domains.
  // enabling a domain starts the flow of events and allows command execution within that domain.

  // DOM: to interact with the structure of the DOM.
  // CSS: to query and manipulate CSS styles.
  // Network: to inspect network activity and manage network conditions.
  // Page: to control page navigation, lifecycle, and size.
  await Promise.all([DOM.enable(() => { }), CSS.enable(() => { }), Network.enable(() => { }), Page.enable(() => { }), Overlay.enable(() => { })]);

  const styleSheets = {}

  // console.log('cdpEnable: DOM, CSS, Network, and Page domains are enabled');
  CSS.styleSheetAdded((param) => {
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
    }
    else {
      // console.log('styleSheetAdded: no sourceMapURL');
      // console.log('styleSheetParamHeader:', param.header);
    }
  });

  // console.log('getting nodes');
  // getFlattenedDocument: returns a flattened array of the DOM tree at the specified depth
  // if no depth is specified, the entire DOM tree is returned.
  // depth: depth of the dom tree that we want
  // -> -1 means we want to get the entire DOM tree.
  // -> >= 0 would correspond to a specific depth of the DOM tree.
  // however, it is deprecated.
  // const { nodes } = await DOM.getFlattenedDocument({ depth: -1 });
  // if using getFlattenedDocument, filter like so.
  // const iframeNodeId = await nodes.filter(node => node.nodeName === 'IFRAME')[0].nodeId;
  // console.log('\n\n');

  // getDocument: returns the root DOM node of the document.
  // 'nested destructuring' to get the nodeId.
  const { root: { nodeId } } = await cdpClient.send('DOM.getDocument');

  // returning all of the nodeIds of the document, passing in the nodeId of the root node.
  const { nodeIds } = await cdpClient.send('DOM.querySelectorAll', {
    nodeId,
    selector: '*'
  });

  // returning the full description of each node, i.e. the properties of each node.
  // there are many so we use a Promise.all to wait for all of them to be returned.
  const nodes = await Promise.all(nodeIds.map(id => cdpClient.send('DOM.describeNode', { nodeId: id })));

  // console.log('nodes', nodes);
  // In looking through the nodes, I saw only one node with IFRAME as the nodeName. It corresponded to the root node of the iframe.
  // Find nodes where the nodeName is 'IFRAME' and the contentDocument.baseURL is the targetUrl.
  // we expect only one, so we set the index to 0.
  // it's an object, with everything inside of the key 'node', so we access the 'node' key.
  // then we nested destructure again to get the contentDocument,
  // which is the html document rendered inside the iframe, i.e. the user's html code.
  // then setting the variable 'iframeNode' to the contentDocument.
  const { node: { contentDocument: iframeNode } } = nodes.filter(each => each.node.nodeName === 'IFRAME' && each.node.contentDocument.baseURL === targetUrl)[0];
  // console.log('Node inside iframe', iframeNode);

  // Create the directory before trying to add files.
  await mkdir((new URL('../../data/output/', import.meta.url)), { recursive: true }, (err) => {
    if (err) throw err;
  });

  // this saves the nodes
  writeFileSync('./data/output/nodes.json', JSON.stringify(nodes, null, 2));

  // this saves the contentDocument node of the iframe
  writeFileSync('./data/output/iframeNode.json', JSON.stringify(iframeNode, null, 2));

  // Return the enabled domains and the nodeId of the iframe root node to the process
  return { DOM, CSS, Network, Page, Overlay, iframeNode, styleSheets };
}

export default cdpEnable;
