/**
 * cdp0Process.js
 * Process the given selector using Chrome DevTools Protocol (CDP).
 *
 * @imports CDP from 'chrome-remote-interface'
 *
 * @modules
 *   cdp1enable.js: Enable the domains
 *   cdp2rules.js: Process the rules/styles for the given selector
 *
 */
import fs from 'fs';
import CDP from 'chrome-remote-interface';

import cdpEnable from './cdp1enable.js';
import cdpRules from './cdp2rules.js';

/**
 * cdpProcess
 * @param {string} attrs - The aatributes received from the iframe
 * @param {string} proxy - The proxy to connect to for the Chrome DevTools Protocol
 *
 */

const cdpProcess = async (data) => {
    const id = data?.id;
    const innerHTML = data?.innerHTML;
    const nodeName = data?.nodeName;
    const className = data?.className;
    // const proxy = data?.proxy;
    const nodeType = data?.nodeType;
    const textContent = data?.textContent;
    // const attributes = data?.attributes;

    // console.log('cdpProcess: proxy:', proxy);
    let cdpClient;
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

        // console.log('cdpProcess: selector:', selector);

        // console.log('cdpProcess: trying to connect to CDP');


        // cdpClient is a newly created object that serves as our interface to send commands
        // and listen to events in Chrome via the Chrome DevTools Protocol (CDP) by way of
        // chrome-remote-interface, a library that allows for easy access to the Chrome DevTools Protocol.
        cdpClient = await CDP();

        // console.log('Connected to Chrome DevTools Protocol via chrome-remote-interface');

        // extracting the 'domains' from the CDP client.
        const { DOM, CSS, Network, Page, iframeNode, styleSheets } = await cdpEnable(cdpClient);

        // these allow us to see / save all of the methods and properties that the CDP client exposes.
        // fs.writeFileSync('./data/domains/DOM.json', JSON.stringify(Object.entries(DOM), null, 2));
        // fs.writeFileSync('./data/domains/Network.json', JSON.stringify(Object.entries(Network), null, 2));
        // fs.writeFileSync('./data/domains/Page.json', JSON.stringify(Object.entries(Page), null, 2));
        // fs.writeFileSync('./data/domains/CSS.json', JSON.stringify(Object.entries(CSS), null, 2));

        // this is the core functionality of cssxe that retrieves styles from a website
        // console.log('cdpProcess: calling cdpRules');

        // right now, result is an object that has both the matched and inline styles for the element clicked.
        const result = await cdpRules(DOM, CSS, Network, Page, iframeNode, selector, styleSheets);
        //   console.log(`Rules for ${selector} retrieved`, result);
        return result;


    } catch (err) {
        console.error('Error connecting to Chrome', err);
    }
    finally {
        // It is considered a best practice to close resources such as connections in a finally block.
        // This ensures they are properly cleaned up, even in the event of an error.
        // Leaving connections open can lead to resource leaks and potential issues with system performance.
        if (cdpClient) {
            await cdpClient.close();
            console.log('CDP client closed');
        }
    }
}



export default cdpProcess;
