import express from 'express';
import webpack from 'webpack';
import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
export const router = express.Router()


import webpackConfig from '../webpack.config.js';
import webpackDevMiddleware from 'webpack-dev-middleware';




const compiler = webpack(webpackConfig);



const watching = compiler.watch(
    {
      // Example
      aggregateTimeout: 300,
      poll: undefined,
    },
    (err, stats) => {
      // Print watch/build result here...
    //   console.log(stats);
    }
  );


router.use('/', async (req, res, next)=>{
   console.log("Line 32 Route hit")
    const fs = compiler.outputFileSystem;
   
    const filePath = path.join(compiler.outputPath, req.path);

    console.log("Compiler OutputFilesystem =====>",filePath)
    // console.log("Compiler =====>",compiler)
    const fi = fs.readFileSync(path.join(filePath,'index.html'))
    const fig = Buffer.from(fi).toString();
    
    res.locals.fig = fig;
  return next()

})

