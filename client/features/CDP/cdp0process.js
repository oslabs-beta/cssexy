/**
 * cdp0Process.js
 * Process the given selector using Chrome DevTools Protocol (CDP).
 *
 * @imports CDP from 'chrome-remote-interface'
 *
 * @modules
 *   cdp1enable.js: Enable the domains
 *   cdp2styles.js: Process the styles
 *
 * @param {string} selector - The CSS selector to be processed
 * @return {Promise<void>} A promise that resolves when the processing is complete
 */

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
    const nodeName = data?.nodeName;
    const className = data?.className;
    const proxy = 8000;
    // const nodeType = data?.nodeType;
    // const textContent = data?.textContent;
    // const innerHTML = data?.innerHTML;
    // const attributes = data?.attributes;

    console.log('cdpProcess: proxy:', proxy);
    let cdpClient;
    try {
        let selector = '';
        if (id){
            console.log('element id:', id);
            selector = `#${id}`;
        }
        else if (className){
            console.log('element class:', className);
            selector = `.${className}`;
        }
        else if (nodeName){
            console.log('element nodeName:', nodeName);
            selector = `${nodeName}`;
        }
        console.log('cdpProcess: selector:', selector);

        console.log('cdpProcess: trying to connect to CDP');
        // CDP is a built-in Node.js module for interacting with Chrome DevTools Protocol
        // await is used to wait for the promise to be resolved before continuing
        // cdpClient is a newly created object that serves as our interface to send commands
        // and listen to events in Chrome via the Chrome DevTools Protocol (CDP)

        // this creates a 'client' object that serves as our interface to send commands
        // and listen to events in Chrome via the Chrome DevTools Protocol (CDP).
        cdpClient = await CDP();

        console.log('Connected to Chrome DevTools Protocol');

        // extracting the 'domains' from the CDP client.
        const {DOM, CSS, Network, Page, iframeDoc} = await cdpEnable(cdpClient, proxy);

        // retrieve styles for the target selector
        // this is the core functionality of cssxe that retrieves styles from a website
        console.log('cdpProcess: calling cdpRules');

        const result = await cdpRules(DOM, CSS, Network, Page, iframeDoc, selector);
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
