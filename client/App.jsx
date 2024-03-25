import React from 'react';

import SidebarComp from './components/SidebarComp';
import IframeComp from './components/iFrameComp';

const App = () => {

  // const proxy = 8000;
  // to access .env files on the client when using ES6 modules + Vite, we need to use 'import.meta.env'.
  // Vite gives us the import.meta.env object. It's not available in standalone node.js files, which Vite doesn’t touch.
  // we also need to prefix each variable with 'VITE_' that we want Vite to treat as an environment variable, ala 'REACT_APP_' for create-react-app builds.

  const proxy = import.meta.env.VITE_PROXY;
  console.log('\n\n\n');
  console.log('App: proxy:', proxy);
  console.log('\n\n');
  const targetUrl = `http://localhost:${proxy}`
  return (
    <div className="app-container">
      <SidebarComp />
      <IframeComp
        src={targetUrl}
        proxy={proxy}
        className="site-frame"
      />
    </div>
  )
};

export default App;
