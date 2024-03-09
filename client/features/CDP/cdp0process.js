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
import cdpStyles from './cdp2styles.js';

/**
 * cdpProcess
 * @param {string} attrs - The aatributes received from the iframe
 * @param {string} proxy - The proxy to connect to for the Chrome DevTools Protocol
 *
 */

const cdpProcess = async (data) => {
    const nodeName = data?.nodeName;
    const nodeType = data?.nodeType;
    const textContent = data?.textContent;
    const innerHTML = data?.innerHTML;
    const id = data?.id;
    const className = data?.className;
    const attributes = data?.attributes;
    const proxy = 8000;

    console.log('cdpProcess: nodeName:', nodeName);
    console.log('cdpProcess: nodeType:', nodeType);
    console.log('cdpProcess: textContent:', textContent);
    console.log('cdpProcess: innerHTML:', innerHTML);
    console.log('cdpProcess: id:', id);
    console.log('cdpProcess: className:', className);
    console.log('cdpProcess: attributes:', attributes);

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
      // this creates a 'client' object that serves as our interface to send commands
      // and listen to events in Chrome via the Chrome DevTools Protocol (CDP).
      cdpClient = await CDP();
      console.log('Connected to Chrome DevTools Protocol');

      // extracting the 'domains' from the CDP client.
      const {DOM, CSS, Network, Page} = await cdpEnable(cdpClient, proxy);
      // retrieve styles for the target selector
      // this is the core functionality of cssxe that retrieves styles from a website
      console.log(`Styles for ${selector} retrieved`);
      await cdpStyles(DOM, CSS, selector);
      return 'success';


  } catch (err) {
      console.error('Error connecting to Chrome', err);
  } finally {
      if (cdpClient) { // always close the connection
          await cdpClient.close();
          console.log('CDP client closed');
      }
  }
}

// cdpProcess('#loadingText', '8000');
// cdpProcess('.topAlbumsDisplay', '8000');
// cdpProcess('.sidebar', '8888');
// cdpProcess('.app-container');

export default cdpProcess;
