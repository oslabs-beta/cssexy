import { writeFileSync, mkdir } from 'node:fs';

import { pupRules } from './pupRules.js';

const pupProcess = async (client, styleSheets, data) => {
    const proxy = process.env.VITE_PROXY;
    const targetUrl = `http://localhost:${proxy}/`;
    // console.log('pupEnable: proxy:', proxy);


    // const id = data?.id;
    // const innerHTML = data?.innerHTML;
    // const nodeName = data?.nodeName;
    // const className = data?.className;
    // const proxy = data?.proxy;
    // const nodeType = data?.nodeType;
    // const textContent = data?.textContent;
    // const attributes = data?.attributes;
    const selector = data?.selector;

    try {
        // getDocument: returns the root DOM node of the document.
        // 'nested destructuring' to get the nodeId.
        const { root: { nodeId } } = await client.send('DOM.getDocument');
        // console.log('pupProcess: root nodeId:', nodeId);

        // returning all of the nodeIds of the document, passing in the nodeId of the root node.
        const { nodeIds } = await client.send('DOM.querySelectorAll', {
            nodeId,
            selector: '*'
        });
        // console.log('nodeIds', nodeIds);

        // returning the full description of each node, i.e. the properties of each node.
        // there are many so we use a Promise.all to wait for all of them to be returned.
        const nodes = await Promise.all(nodeIds.map(id => client.send('DOM.describeNode', { nodeId: id })));
        // console.log('nodes', nodes);



        // In looking through the nodes, I saw only one node with IFRAME as the nodeName. It corresponded to the root node of the iframe.
        // Find nodes where the nodeName is 'IFRAME' and the contentDocument.baseURL matches the targetUrl.
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
        // console.log('pupProcess: calling writeFileSync');

        // this saves the nodes
        // writeFileSync('./data/output/nodes.json', JSON.stringify(nodes, null, 2));

        // this saves the contentDocument node of the iframe
        // writeFileSync('./data/output/iframeNode.json', JSON.stringify(iframeNode, null, 2));

        // this saves the element
        // writeFileSync('./data/output/element.json', JSON.stringify(element), null, 2);

        // console.log('pupProcess: calling pupRules');

        // right now, result is an object that has the matched and inline styles for the element clicked.
        // this retrieves the styles for the clicked element
        const result = await pupRules(client, iframeNode, selector);
        result.styleSheets = styleSheets;
        //   console.log(`Rules for ${selector} retrieved`, result);
        return result;

    } catch (err) {
        console.error('Error connecting to Chrome', err);
    }
}

export { pupProcess }