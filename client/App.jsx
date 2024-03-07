import React from 'react';

import Sidebar from './components/SidebarComp';

const App = () => {
  addEventListener('click', function(e){
    console.log(e);
  })
  return (
    <div className="app-container">
      <Sidebar />
      <iframe
        id="site-frame"
        src="/api/site"
        width="100%"
        height="100%"
        title="User Site"
        className="site-frame"
      ></iframe>
    </div>
  )
};

export default App;
