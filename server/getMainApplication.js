// import express from 'express';
const path = require('path')
const express = require('express');
const router = express.Router();
//Using with Low level Compiler to create File System in Memory
const {createFsFromVolume, Volume} = require('memfs');
const fs = createFsFromVolume(new Volume());


// const WebpackDevServer = require('webpack-dev-server');
// import middleware from 'webpack-dev-middleware'
const middleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const { compiler } = require('./createWebpackApp.js');

compiler.outputFileSystem = fs;

compiler.watch({},(err, status)=>{
  // console.log(status);
})




router.use((req, res, next)=>{

  const filePath = path.join(compiler.outputPath, req.path);
  

  res.send("Hello World")
})






// const server = new WebpackDevServer(devServerOptions, compiler);



/**** Run Webpack-dev-Middleware */
// router.use(middleware(compiler));
// router.use(webpackHotMiddleware(compiler));

// const runServer = async () => {
//   console.log('Starting server...');
//   await server.start();
// };

// runServer();


module.exports = router;