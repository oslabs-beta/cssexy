import * as  RawSource  from "webpack-sources";

export default class ListFilesPlugin {
    constructor(options) {
      // Options can be used to configure the plugin if needed
      this.options = options || {};
    }
  
    apply(compiler) {
     
     
      
        compiler.hooks.normalModuleFactory.tap('ListFilesPlugin', ( factory) => {
        //   console.log('Compiling:', module.resource); // This logs the path of each module being compiled

        factory.hooks.beforeResolve.tapAsync('ListFilesPlugin', (data, callback)=>{
            console.log(data)
        })
        //   if(module.resource && module.resource.includes('App.jsx')){
        //     console.log('Compiling:', module.resource);
        //     console.log('_Source ====>',module)
        //     const originalSource = module._source.source();
        //     const modifiedSource = originalSource.replace(/path="\//g, `path="${this.options.basePath}/`);
        //     module._source = new RawSource(modifiedSource);
        //       }else{
        //           console.log("Didn't find it")
        //       }

            
        });
  
  
      // For Webpack 5, you might need to use different hooks such as:
      // compiler.hooks.compilation.tap('ListFilesPlugin', (compilation) => {
      //   NormalModule.getCompilationHooks(compilation).loader.tap('ListFilesPlugin', (loaderContext, module) => {
      //     console.log('Compiling:', module.resource); // This logs the path of each module being compiled
      //   });
      // });
    }
  }
  
