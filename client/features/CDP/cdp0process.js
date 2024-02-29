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

// the url that we want to query with CDP. in this case, its set to query cssxe itself.
const userUrl = 'http://localhost:8888';


const cdpProcess = async (selector) => {
  let cdpClient;
  try {
      // this creates a 'client' object that serves as our interface to send commands
      // and listen to events in Chrome via the Chrome DevTools Protocol (CDP).
      cdpClient = await CDP();
      console.log('Connected to Chrome DevTools Protocol');

      // extracting the 'domains' from the CDP client.
      const {DOM, CSS, Network, Page} = await cdpEnable(cdpClient, userUrl);
      // retrieve styles for the target selector
      // this is the core functionality of cssxe that retrieves styles from a website
      await cdpStyles(DOM, CSS, selector);

      console.log(`Styles for ${selector} retrieved`);

  } catch (err) {
      console.error('Error connecting to Chrome', err);
  } finally {
      if (cdpClient) { // always close the connection
          await cdpClient.close();
          console.log('CDP client closed');
      }
  }
}

// processCDP('#loadingText');
// processCDP('.topAlbumsDisplay');
cdpProcess('.sidebar');
// processCDP('.app-container');
