import React from 'react';

import SidebarComp from './components/SidebarComp';
import IframeComp from './components/iFrameComp';

const App = () => {
  const proxy = 8000;
  const targetUrl = `http://localhost:${proxy}`
  return (
    <div className="app-container">
      <SidebarComp />
      <IframeComp
        src={targetUrl}
        className="site-frame"
        proxy={proxy}
      />
    </div>
  )
};

export default App;
