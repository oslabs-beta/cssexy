import { writeFileSync, mkdir } from 'node:fs';

import { pupRules } from './pupRules.js';

const pupProcess = async (client, styleSheets, data) => {
    const id = data?.id;
    const innerHTML = data?.innerHTML;
    const nodeName = data?.nodeName;
    const className = data?.className;
    // const proxy = data?.proxy;
    const nodeType = data?.nodeType;
    const textContent = data?.textContent;
    // const attributes = data?.attributes;

    console.log('pupProcess');
    // console.log('pupProcess: data', data);
    try {
        // setting our selector based on the attributes we received from the iframe.
        // starting with the most specific selector and working our way down.
        let selector = '';
        if (id) {
            console.log('element id:', id);
            selector = `#${id}`;
        }
        else if (className && !className.includes(' ')) {
            console.log('element class:', className);
            selector = `.${className}`;
        }
        else if (nodeName) {
            console.log('element nodeName:', nodeName);
            console.log('element className:', className);
            selector = `${nodeName}`;
        }
        else if (innerHTML) {
            console.log('element innerHTML:', innerHTML);
            selector = `${innerHTML}`;
        }
        else if (textContent) {
            console.log('element textContent:', textContent);
            selector = `${textContent}`;
        }
        console.log('pupProcess: selector:', selector);

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

        const targetUrl = `http://localhost:${process.env.VITE_PROXY}/`;
        // console.log('pupEnable: targetUrl:', targetUrl);

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

        // this is the core functionality of cssxe that retrieves styles from a website
        console.log('pupProcess: calling pupRules');

        // right now, result is an object that has both the matched and inline styles for the element clicked.
        const result = await pupRules(client, iframeNode, selector, styleSheets);
        //   console.log(`Rules for ${selector} retrieved`, result);
        return result;


    } catch (err) {
        console.error('Error connecting to Chrome', err);
    }
    finally {
        // It is considered a best practice to close resources such as connections in a finally block.
        // This ensures they are properly cleaned up, even in the event of an error.
        // Leaving connections open can lead to resource leaks and potential issues with system performance.
        // if (pupClient) {
        //     await pupClient.close();
        //     console.log('Puppeteer client closed');
        // }
    }
}

export { pupProcess };
