export default class ReactRouterBasePathPlugin {
    constructor(options) {
      this.options = options;
    }
  
    apply(compiler) {
      compiler.hooks.emit.tapAsync('ReactRouterBasePathPlugin', (compilation, callback) => {
        // Get the asset containing the router setup
        const assetName = '/Users/robertsand/Development/Codesmith/mids/shopster/shopster/client/App.jsx'; // You might need to adjust this based on your output file name
        const asset = compilation.assets[assetName];
        console.log("Line 11 Base Path Plugin",compilation)
        if (asset) {
          const source = asset.source();
          // This regex should match how routes are defined in your React app
          const modifiedSource = source.replace(/path="\//g, `path="${this.options.basePath}/`);
  
          // Update the webpack asset with the new source
          compilation.assets[assetName] = {
            source: () => modifiedSource,
            size: () => modifiedSource.length
          };
        }
        callback();
      });
    }
  }
  
    