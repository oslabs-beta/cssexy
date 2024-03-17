import React, { useState } from 'react';
import RulesAllComp from "./RulesAllComp.jsx";


function SidebarComp() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (


    <div className="sidebar-container">
      <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
        <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: 0 }}>Styles</h2>
        <RulesAllComp />
      </div>
      <button className="collapse-button" onClick={() => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? '>' : '<'}
      </button>
    </div>




    // <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
    //   <h2 style={{ textAlign: 'center', marginTop: 0, marginBottom: 0 }}>Styles</h2>
    //   <button onClick={() => setIsCollapsed(!isCollapsed)}>
    //     Toggle sidebar
    //   </button>
    //   <RulesAllComp />
    // </div>

  );
}

export default SidebarComp;
