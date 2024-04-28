const path = require('path');
/** We can set this to a Environment Variable to get the main applicaiton dynamically **/
const MAIN_APPLICATION_LOCATION = '../../shopster/shopster/'; 

/***  This is EXTREMELY IMPORTANT for loading the same version of Webpack that is in the Main Application *****/
const webpack = require(path.resolve(__dirname,MAIN_APPLICATION_LOCATION,'node_modules','webpack'));

const webpackConfig = path.join(__dirname, MAIN_APPLICATION_LOCATION + 'webpack.config.js');

const configType = webpackConfig.default || webpackConfig;



// Setting Webpack for development mode and setting the context

const webPackConfigRender = require(configType);
let configModule;
if( typeof webPackConfigRender === 'function'){
   configModule = webPackConfigRender("",{mode:'development'})
}else{
    configModule = webPackConfigRender;
    configModule.mode = 'development';
}
// 


configModule.context = path.resolve(__dirname, MAIN_APPLICATION_LOCATION);
configModule.output.path = path.resolve(__dirname,'build');

const compiler = webpack(configModule);


module.exports = {
    compiler,
    // devServerOptions
}






// const devServerOptions = { ...webpackConfig.devServer,port:8888};