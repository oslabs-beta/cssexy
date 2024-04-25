//Added only because of Issue with Stylex Webpack Plugin Issues could update this to automatically search for packages
import StylexPlugin from '@stylexjs/webpack-plugin';
/****************************************************** */
import express from 'express';
export const router = express.Router();
import path from 'node:path'
import middleware from 'webpack-dev-middleware'


/** Import Comiler  from CreateWebpackApp */
import {compiler, options} from './createWebpackApp.js'

/**** Run Webpack-dev-Middleware */
router.use(middleware(compiler, options));


router.get('*', (req, res, next) => {
 
  let fileName;
  let parsedUrl = req._parsedUrl.path;
  if(req._parsedUrl.path === '/'){
    fileName =  'index.html'; // Adjust if your output file is named differently
  }else{
    parsedUrl = parsedUrl.split('?')[0];
    fileName = parsedUrl.replace('/app', '');
  }
  const fullPath = path.join(compiler.outputPath, fileName);
  compiler.outputFileSystem.readFile(fullPath, (err, result) => {
    if (err) {
      return next(err); // Pass to error handler or 404
    }
    const contentType = determineContentType(fullPath);
    res.set('Content-Type', contentType);
    res.send(result);
    res.end();
  });
});

/*     Used for Setting Type of file being returned */
function determineContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html': return 'text/html';
    case '.js': return 'application/javascript';
    case '.css': return 'text/css';
    case '.png': return 'image/png';
    case '.jpg': case '.jpeg': return 'image/jpeg';
    case '.gif': return 'image/gif';
    default: return 'application/octet-stream'; // Default or binary files
  }
}




/*********************  Trial Code Saving incase *************/

//Serves any file that is not index.html and found in the outputFileSystem
// router.use('/*', (req, res, next) => {
// const parsedUrl = req._parsedUrl.path.split('?')[0];

//   console.log("Path =====> in router", parsedUrl)
//   // let filename =   parsedUrl === '/' ? path.join(compiler.outputPath, 'index.html') : path.join(compiler.outputPath, parsedUrl);
//   console.log("Parsed URL",req._parsedUrl)
//   const fileName = parsedUrl.replace('/app', '');
//   const fullPath = path.join(compiler.outputPath, fileName);
//   compiler.outputFileSystem.readFile(fullPath, (err, result) => {
//     if (err) {
//       console.error('Failed to read the file:', err);
//       return next(err);
//     }
//     const contentType = determineContentType(fullPath);
//     res.set('Content-Type', contentType);
//     res.send(result);
//     res.end();
//   });
// });
// router.use(history({
//   index: '/app/',
// }));


// router.get('/', (req, res, next) => {
//   console.log(path.basename(req.path))
//   let filename =path.join(compiler.outputPath, 'index.html')
//   // if(!path.basename(req.path)){
//   // filename =  path.join(compiler.outputPath, 'index.html')
//   // }else{
//   //   filename = path.join(compiler.outputPath, path.basename(req.path))
//   // }
//   console.log("Load hit")

//   // Use the file system provided by the compiler (memory-fs used by webpack-dev-middleware)
//   compiler.outputFileSystem.readFile(filename, (err, result) => {
//     if (err) {
//       return next(err);
//     }
//     // res.set('content-type', 'text/html');
//     // res.send(result);
//     // res.end();

//     let html = result.toString();
//     html = html.replace('<head>', '<head><base href="/app/">'); // Inject base tag dynamically
//     res.set('content-type', 'text/html');
//     res.send(html);
//     res.end();
//   });
// });


// webpackConfig.mode = 'development';
// configModule.entry = path.resolve(webpackConfig.context, webpackConfig.entry);
// configModule.output.path = path.resolve(import.meta.dirname,'./build')
// configModule.output.publicPath = 'app';
// webpackConfig.plugins.push(new HtmlWebpackPlugin())




// console.log("Config========>", webpackConfig);


// const configFile = fs.readFileSync(path.resolve(import.meta.dirname,'../../shopster/shopster/webpack.config.js'))
// console.log(Buffer.from(configFile).toString())
// fs.writeFileSync(path.resolve(import.meta.dirname,'./testFileConfig.js', configFile))



// webpackConfig.entry = path.join(import.meta.dirname,'../../shopster/shopster/client/index.js');
// webpackConfig.output.path = path.resolve('./build');

// import webpackConfig from '../webpack.config.js';



// webpackConfig.entry = path.resolve(import.meta.dirname,'../../shopster/shopster/client/index.js');





// webpackConfig.output.publicPath = path.resolve('/build/');
// console.log(webpackConfig)

// // webpackConfig.mode = 'development';
// for(const ob of webpackConfig.plugins){
//   if(ob.userOptions?.template){
// // ob.userOptions.template = path.join(import.meta.dirname,'../../shopster/shopster/client/index.html');
// // ob.options.template = path.join(import.meta.dirname,'../../shopster/shopster/client/index.html')
//   }
//   console.log(ob)
// }



// router.get('*',(req, res, next)=>{
//   const filename = path.basename(req.path);
  
//   // console.log(compiler);
//   console.log(filename)
//   compiler.outputFileSystem.readFile(filename, (err, result) => {
//     if (err) {
//       return next(err);
//     }
  
//     res.send(result);
//     res.end();
//   });

// })
// console.log(compiler)

// for(let ob in compiler.outputFileSystem){
// console.log('Compiler======>', ob)
// }
// router.use(
//   webpackDevMiddleware(compiler, {
//     // webpack-dev-middleware options
//      outputFileSystem:  {output:path.resolve(import.meta.dirname)}
//   }),
// );
// compiler.run((err, stats) => {
//   if (err) {
//     console.error('Error:', err);
//   } else if (stats.hasErrors()) {
   
//     console.error('Stats Error:', stats.toJson().errors);
//   } else {
//     console.log('Success:', stats.toString({
//       colors: true // Add more options as needed
//     }));
//   }
// });

// compiler.watch({
//   // WatchOptions
//   aggregateTimeout: 300,  // Delay the rebuilt after the first change (in ms)
//   poll: undefined,  // Check for changes every few milliseconds (or set as undefined)
//   ignored: /node_modules/,  // Ignore changes in the specified directories
// }, (err, stats) => {  // Callback function
//   if (err) {
//     console.error('Error:', err);
//   } else if (stats.hasErrors()) {
//     console.error('Compilation errors:', stats.toJson().errors);
//   } else {
//     console.log('Compilation succeeded:', stats.toString({
//       colors: true // Add more options as needed
//     }));
//   }
// });

// router.use('/', async (req, res, next)=>{
//    console.log("Line 32 Route hit")
//     const fs = compiler.outputFileSystem;
//   //  console.log("FS====>", compiler.outputFileSystem)
   
//     const filePath = path.resolve(compiler.outputPath, 'index.html');
    
//     console.log("Compiler OutputFilesystem =====>",filePath)
//     // console.log("Compiler =====>",compiler)
    
//    const fi = fs.readFileSync(filePath);
   
//     const fig = Buffer.from(fi).toString();
//     console.log("FIg=============>",fig)
//     res.locals.fig = fig;
//   return next()

// })



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