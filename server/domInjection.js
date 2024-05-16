import pkg from 'webpack';
const { sources } = pkg;
import {injectCode} from './domInjectionCode.js';
export default class DomManipulationPlugin {

    apply(compiler) {
      compiler.hooks.compilation.tap('DomManipulationPlugin', (compilation)=>{

        compilation.hooks.afterProcessAssets.tap(
        'DomManipulationPlugin',
           (assets)=>{

        // Iterate over the assets to find JavaScript files
        for (const assetName of Object.keys(assets)) {
          // console.log("Asset Name===>", assetName)
          if (assetName.endsWith('.js')) {
            // Get the original content
           
            const originalContent = assets[assetName].source();
            const addList = `\n${injectCode}\n injectCode();\n;`
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