import React from 'react';

import SidebarComp from './components/SidebarComp';
import IframeComp from './components/iFrameComp';

const App = () => {


  return (
    <div className="app-container">
      <SidebarComp />
      <IframeComp src="/api/site" className="site-frame" />
    </div>
  )
};


export default App;

/*

*/
