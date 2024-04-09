import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SidebarComp from './components/SidebarComp.jsx';
import IframeComp from './components/iframeComp.jsx';

import { updateTarget} from './slices/targetSlice.js';
import { fetchTargetData } from './slices/targetSlice.js';

/**
 * The main App component.
 *
 * @returns {JSX.Element} The rendered App component.
 */

const App = () => {
  const dispatch = useDispatch();

  // to access .env files on the client when using ES6 modules + Vite, we need to use 'import.meta.env'.
  // Vite gives us the import.meta.env object. It's not available in standalone node.js files, which Vite doesn’t touch.
  // we also need to prefix each variable with 'VITE_' that we want Vite to treat as an environment variable, ala 'REACT_APP_' for create-react-app builds.
  const targetPort = import.meta.env.VITE_TARGET_PORT;
  const targetDir = import.meta.env.VITE_TARGET_DIR;

  dispatch(updateTarget({targetPort}));
  dispatch(updateTarget({targetDir}));

  // const updateStore = async () => {
  //   const response = await fetch('/target', {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   });
  //   console.log('App: fetch: response', response);
  //   // const result = await response.json();
  //   // console.log('App: fetch: result', result);

  // // await dispatch(fetchTargetData());
  // // console.log('App: useEffect: dispatch(fetchTargetData)');
  // // console.log('App: targetPort', targetPort);
  // // console.log('App: targetDir', targetDir);
  // }

  // updateStore();

  // useEffect(() => {
  //   dispatch(fetchTargetData());
  //   console.log('App: useEffect: dispatch(fetchTargetData)');
  //   console.log('App: targetPort', targetPort);
  //   console.log('App: targetDir', targetDir);
  // }, [dispatch]);

  return (
    <div className="app-container">
      <SidebarComp />
      <IframeComp
        targetPort={targetPort}
      />
    </div>
  )
};

export default App;
