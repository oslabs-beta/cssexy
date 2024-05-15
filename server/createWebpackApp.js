import path from 'path';
import DomManipulationPlugin from './domInjection.js';
import { customLoader } from './customLoader.js';
/** We can set this to a Environment Variable to get the main applicaiton dynamically **/
const MAIN_APPLICATION_LOCATION = '../../shopster/shopster/'; 


/***  This is EXTREMELY IMPORTANT for loading the same version of Webpack that is in the Main Application *****/
const webpack = await import(path.resolve(import.meta.dirname, MAIN_APPLICATION_LOCATION,'node_modules','webpack/lib/index.js'));


const webpackConfig =  await import(path.join(import.meta.dirname, MAIN_APPLICATION_LOCATION + 'webpack.config.js'));

const configType = webpackConfig.default || webpackConfig;


// Setting Webpack for development mode and setting the context


let configModule;
if( typeof configType === 'function'){
   configModule = configType("",{mode:'development'})
}else{
    configModule = configType;
    configModule.mode = 'development';
}


configModule.context = path.resolve(import.meta.dirname, MAIN_APPLICATION_LOCATION);
configModule.output.path = path.resolve(import.meta.dirname,'build');

//Add any custom plugins here
// import MyEsbuildPlugin from './Nodes.js';

// configModule.plugins.unshift(new MyEsbuildPlugin())


configModule.plugins.push(new DomManipulationPlugin())
// if(!Array.isArray(configModule.module.rules[0].use)){
//     const currentLoader = configModule.module.rules[0].use;
//     configModule.module.rules[0].use = [];
//     configModule.module.rules[0].use.push(currentLoader)
// }

// configModule.module.rules[0].use.push(customLoader)
// console.log(configModule.module.rules[0].use)
//Export Compiler to be compiled
export const compiler = webpack.default(configModule);









