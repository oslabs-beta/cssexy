import express from 'express';
import webpack from 'webpack';
import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
export const router = express.Router()


// import webpackConfig from '../../shopster/shopster/webpack.config.js';
import webpackConfig from '../webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';

// webpackConfig.output.path = path.resolve(import.meta.dirname, 'build');
// webpackConfig.entry = path.join(import.meta.dirname,'../../shopster/shopster/client/index.js');

// webpackConfig.output.publicPath = path.resolve('/build/');
// console.log(webpackConfig)

// webpackConfig.mode = 'development';
for(const ob of webpackConfig.plugins){
  if(ob.userOptions?.template){
ob.userOptions.template = path.join(import.meta.dirname,'../../shopster/shopster/client/index.html');
ob.options.template = path.join(import.meta.dirname,'../../shopster/shopster/client/index.html')
  }
  console.log(ob)
}

// console.log(webpackConfig)
const compiler = webpack(webpackConfig);
// console.log(compiler)

// for(let ob in compiler.outputFileSystem){
// console.log('Compiler======>', ob)
// }






router.use('/', async (req, res, next)=>{
   console.log("Line 32 Route hit")
    const fs = compiler.outputFileSystem;
  //  console.log("FS====>", compiler.outputFileSystem)
   
    const filePath = path.join(compiler.outputPath, 'index.html');
    
    console.log("Compiler OutputFilesystem =====>",filePath)
    // console.log("Compiler =====>",compiler)
    
   const fi = fs.readFileSync(filePath);
   console.log(fi)
    const fig = Buffer.from(fi).toString();
    console.log(fig)
    res.locals.fig = fig;
  return next()

})



// router.use('/', async (req, res, next)=>{
//   console.log("Line 32 Route hit")
//    const fs = compiler.outputFileSystem;
  
//    const filePath = path.join(compiler.outputPath, req.path);

//    console.log("Compiler OutputFilesystem =====>",filePath)
//    console.log("Compiler =====>",compiler)
//    const fi = fs.readFileSync(path.join(filePath,'index.html'))
//    const fig = Buffer.from(fi).toString();
   
//    res.locals.fig = fig;
//  return next()

// })

// router.get('*', (req, res) => {
//   const fs = compiler.outputFileSystem;
//   const filePath = path.join(compiler.outputPath, 'index.html'); // Ensure 'index.html' is at this path

//   try {
//     const fileContents = fs.readFileSync(filePath, 'utf-8');
//     res.send(fileContents);
//   } catch (error) {
//     console.log(error)
//     res.status(404).send('Page not found');
//   }
// });