import { useEffect, useRef } from "react";

function Sidebar() {

useEffect(()=>{
  addEventListener('message', async function(event) {
    const { serializedNode } = event.data;
  const parser = new DOMParser();
  const domNode = parser.parseFromString(serializedNode, 'text/xml').documentElement;
  
  console.log('Received message:', domNode);
  console.log(domNode.classList)
  const sidebar = document.getElementById('sidebarList');
  const options = {
    method:"POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({selector:`.${domNode.classList[0]}`})
  }
  const process = await fetch('/cdp', options);
  const processJSON = await process.json();
  if(processJSON.result.length > 0){
    console.log(processJSON)
  const matched = processJSON.result[0].matchedCSSRules[1];
  
  
  
  const name = matched.rule.style.cssProperties;
  sidebar.innerHTML = '';
  
    for(const item of name){
     
      const li = document.createElement('li');
      
      li.innerHTML = `${item.name}:${item.value}`;
      li.style.textDecoration = 'none';
      sidebar.appendChild(li);
    }
   }
  
  
  })

  

},[])
 

   
  return (
    <div className="sidebar"
    style={{width: '350px', borderRight: '5px solid purple', padding: '10px'}}>
      {/* placeholder for our sidebar */}
      <p>Styles Editor</p>
      <ul id="sidebarList">
    

      </ul>
    </div>
  );
}

export default Sidebar;
