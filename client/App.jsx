import React from 'react';

import Sidebar from './components/Sidebar';

const App = () => {

  return (
    <div className="app-container">
      <Sidebar />
      <iframe
        id="site-frame"
        src="http://localhost:8000"
        width="100%"
        height="100%"
        title="User Site"
        className="site-frame"
      ></iframe>
    </div>
  )
};

export default App;
