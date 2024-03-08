import React from 'react';

import SidebarComp from './components/SidebarComp';
import IframeComp from './components/iFrameComp';
import cdpProcess from './features/CDP/cdp0process';


const App = () => {
  const targetPort = 8000;
  const targetUrl = `http://localhost:${targetPort}`

  window.addEventListener('message', function(event) {
    let selector = '';
    if (event.data.id){
      console.log('element id:', event.data.id);
      selector = `#${event.data.id}`;
    }
    if (event.data.selector){
      console.log('element selector:', event.data.selector);
      selector = event.data.selector;
    }
    if (event.data.class){
      console.log('element class:', event.data.class);
      selector = `.${event.data.class}`;
    }

    console.log('event data:', event.data);
    console.log('selector:', selector);

    // cdpProcess(selector, `${targetPort}`);
  }, false);
  return (
    <div className="app-container">
      <SidebarComp />
      {/* <IframeComp src="/api/site" className="site-frame" /> */}
      <IframeComp src={targetUrl} className="site-frame" />
    </div>
  )
};

export default App;

/*

*/
