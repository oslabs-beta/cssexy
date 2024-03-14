/**
 * cdp1Enable.js
 * Enables the necessary CDP listeners and state on the browser side to interact with the specified domain.
 *
 * @param {object} client - The client object for interacting with the browser.
 * @param {string} port - The URL of the page to navigate to.
 * @return {object} An object containing the enabled DOM, CSS, Network, and Page domains.
 */

const cdpEnable = async (client, host) => {
  // extract the different 'domains' from the client.
  const { DOM, CSS, Network, Page } = client;

  // 'enable' on a domain sets up the necessary listeners and state on the browser side to interact with that domain.
  // this is a prerequisite step before we can use the methods provided by each of the domains.
  // enabling a domain starts the flow of events and allows command execution within that domain.

  // to interact with the structure of the DOM.
  await DOM.enable();
  // to query and manipulate CSS styles.
  await CSS.enable();
  // to inspect network activity and manage network conditions.
  await Network.enable();
  // to control page navigation, lifecycle, and size.
  await Page.enable();

  CSS.styleSheetAdded(function (param) { console.log('StyleSheet Data: something', param.header) });

  console.log('CSS, DOM, Network, and Page domains are enabled');

  // navigating to the desired page, i.e. the port the user's site is served to.
  await Page.navigate({ url: `http://localhost:${host}` });

  // wait for the 'loadEventFired' event which signals that the page has finished loading
  // now that the page has loaded, we can start listening for events
  // and be assured that calls to the enabled domains will work and return data
  await new Promise(resolve => Page.loadEventFired(resolve));
  console.log('Page loaded');

  // Return the enabled domains to the process
  return { DOM, CSS, Network, Page };
}

export default cdpEnable;
