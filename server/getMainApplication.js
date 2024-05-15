import path from 'path';
import express from 'express';
import mime from 'mime';
export const router = express.Router();

//Using with Low level Compiler to create File System in Memory
import {createFsFromVolume, Volume} from 'memfs';
const fs = createFsFromVolume(new Volume());

//Import the Compiled Webpack code from CreateWebpackApp file
import { compiler } from './createWebpackApp.js';

//Set the Output system to the MemFS Filesystem to read from memory
compiler.outputFileSystem = fs;

// This actually runs the compiler and bundler to get the html, bundle.js, and map files to memory
compiler.watch({},(err, status)=>{
  if(err){
    console.log(err)
  }
  // console.log("Line 18 Watch=====>",status);
})


//Handle the route
router.use((req, res, next)=>{
 //Get the file Path from Request
  const filePath = path.join(compiler.outputPath, req.path);
 
  const mimeType = mime.getType(filePath) || 'application/octet-stream';
//If the file path is empty this is the first request, send the index.html file
  if(req.url === '/'){
 
  const file = fs.readFileSync(path.join(filePath,'index.html'))
  
  const fileBuffer = Buffer.from(file).toString();
  res.send(fileBuffer)

  }else{
  //Handle other files and set the mime type **Files like PNG and images won't work without the mime package
  const file = fs.readFileSync(path.join(filePath))

  res.setHeader('Content-Type', mimeType);
  res.send(file);
  }
 
});