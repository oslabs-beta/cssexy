import pkg from 'webpack';
const { sources } = pkg;
import { addListner } from './testin.js';

export default class DomManipulationPlugin {
    apply(compiler) {
      compiler.hooks.compilation.tap('DomManipulationPlugin', (compilation)=>{

        compilation.hooks.afterProcessAssets.tap(
        'DomManipulationPlugin',
           (assets)=>{
      
          const additionalCode = '\nconsole.log("This code was added by AddJavaScriptPlugin");\n';

        // Iterate over the assets to find JavaScript files
        for (const assetName of Object.keys(assets)) {
          console.log("Asset Name===>", assetName)
          if (assetName.endsWith('.js')) {
            // Get the original content
           
            const originalContent = assets[assetName].source();
            const addList = `\naddEventListener("DOMContentLoaded", (event) => {
              
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
            addUniqueNodeIds(document.documentElement);
            
            function observeAndAddNodeIds() {
              let nodeIdCounter = document.querySelectorAll('[data-nodeId]').length; // Continue counter from existing node IDs
          
              // Create a MutationObserver to monitor the DOM for new elements
              const observer = new MutationObserver(mutations => {
                  mutations.forEach(mutation => {
                      mutation.addedNodes.forEach(node => {
                          if (node.nodeType === 1 && !node.hasAttribute('data-nodeId')) {
                              // Assign a unique nodeId to the newly added node
                              node.setAttribute('data-nodeId', nodeIdCounter++);
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
              
            });
           
          });\n`
            // Add the additional code to the original content
            const updatedContent = originalContent + addList;

            // Update the asset with the new content
            compilation.updateAsset(
              assetName,
              new sources.RawSource(updatedContent)
            );
            
          }
        }
    
      });
      })
    }
    
}