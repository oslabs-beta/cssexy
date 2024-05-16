

//Code to be injected into the DOM on Load 
export function injectCode(){
    addEventListener("DOMContentLoaded", (event) => {
    
        function addUniqueNodeIds(node) {
          let nodeIdCounter = 0; // Counter to generate unique node IDs
      
          // Helper function to recursively traverse the DOM
          function traverse(currentNode) {
              // Add a unique meta-tag nodeId attribute to the current node
              currentNode.setAttribute('data-nodeId', nodeIdCounter++);
      
              // Recursively traverse all child nodes
              currentNode.childNodes.forEach(child => {
                  // Only add meta-tag to element nodes (nodeType === 1)
                  if (child.nodeType === 1) {
                      traverse(child);
                  }
              });
          }
      
          // Start traversal from the provided node (usually document.documentElement)
          traverse(node);
      }
      
      // Initial run to add node IDs to all existing nodes
      addUniqueNodeIds(document.body);
      
      function observeAndAddNodeIds() {
        let nodeIdCounter = document.querySelectorAll('[data-nodeId]').length; // Continue counter from existing node IDs
    
        // Create a MutationObserver to monitor the DOM for new elements
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && !node.hasAttribute('data-nodeId')) {
                        // Assign a unique nodeId to the newly added node
                        node.setAttribute('data-nodeId', nodeIdCounter++);
                        console.log("node added")
                        // Assign nodeIds to all its child nodes
                        addUniqueNodeIds(node);
                    }
                });
            });
        });
    
        // Start observing the document for child node additions
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    // Call the function to start observing the DOM
    observeAndAddNodeIds();
    
      
        function addEventListenerToAllNodes(eventType, callback) {
          // Helper function to recursively traverse the DOM
          function traverse(node) {
              // Add event listener to the current node
              // if(node.getAttributeNode){
              // console.log(node.getAttributeNode("data-nodeid"))
              // }
              node.addEventListener(eventType, callback);
              
              // Recursively traverse all child nodes
              node.childNodes.forEach(child => traverse(child));
          }
      
          // Start traversal from the document's root element
          traverse(document.documentElement);
      }
      
      // Usage example:
      // This will add a 'click' event listener to every node in the DOM
      addEventListenerToAllNodes("dblclick", (e) => {
        console.log("Double Clicked");
      });

      function domToJson(node) {
        let obj = {
            nodeName: node.nodeName,
            nodeType: node.nodeType,
            childNodes: []
        };
        console.log(node)
        if (node.nodeType === Node.TEXT_NODE) {
            obj.nodeValue = node.nodeValue;
        } else {
            obj.attributes = {};
            for (let attr of node.attributes || []) {
                obj.attributes[attr.name] = attr.value;
            }

            for (let child of node.childNodes) {
                obj.childNodes.push(domToJson(child));
            }
        }

        return obj;
    }
    const domJSON = domToJson(document);
      
      
      fetch('/dom', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(domJSON)
      })
     console.log("Stylesheets=======>",document.styleSheets)
    });
  
}

   
export const code = JSON.stringify(injectCode)