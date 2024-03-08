import { useEffect, useRef } from 'react'; 

import Sidebar from './components/Sidebar';



const App = () => {
  const iframe = useRef(null);

 useEffect(()=> {
  if(iframe){
    iframe.current.addEventListener('load',(e)=>{
      console.log(e)
    })

  iframe.current.addEventListener('click',(e)=>{
    console.log("Clicked")
    // const serializedNode = new XMLSerializer().serializeToString(e.target);
    
    // window.parent.postMessage({serializedNode}, '*');
  });
  iframe.current.addEventListener('mouseover', function(e){
    e.target.style.cursor = 'pointer';
    e.target.style.border = '2px dashed yellow';
  
  });
  
  iframe.current.addEventListener('mouseout', function(e){
    e.target.style.border = '0px';
  
  });



  }
 },[])
  return (
    <div className="app-container">
      <Sidebar />
      
      <iframe
      sandbox='allow-scripts allow-same-origin'
      ref={iframe}
        id="site-frame"
        src="http://localhost:8080"
        width="100%"
        height="100%"
        title="User Site"
        className="site-frame"
        onClick={() => {
          window.parent.postMessage('message', '*');
          console.log("clicked")
      }}
      ></iframe>
      </div>
   
  )
};

export default App;
