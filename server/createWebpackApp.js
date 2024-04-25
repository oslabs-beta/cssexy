//Added only because of Issue with Stylex Webpack Plugin Issues could update this to automatically search for packages
import StylexPlugin from '@stylexjs/webpack-plugin';
/****************************************************** */


import express from 'express';
import webpack from 'webpack';
import path from 'node:path'
import middleware from 'webpack-dev-middleware'


export const router = express.Router();
const MAIN_APPLICATION_LOCATION = '../../shopster/shopster/';
const webpackConfig = path.resolve(import.meta.dirname, MAIN_APPLICATION_LOCATION + 'webpack.config.js');
const webpackFolder = path.resolve(import.meta.dirname, MAIN_APPLICATION_LOCATION);
const config = await import(webpackConfig);

// import webpackConfig from  '../../shopster/shopster/webpack.config.js';
const configModule = config.default || config;

/******* Set Webpack Config Keys */
//Set Context
configModule.context = webpackFolder;
//Set Entry File
configModule.entry = path.resolve(configModule.context, configModule.entry);

configModule.output.publicPath = '/';
configModule.output.path = path.resolve(import.meta.dirname, 'build');
configModule.plugins.push(new StylexPlugin());


/** Create Comiler and Compile Webpack wth Config */
export const compiler = webpack(configModule);
export const options ={ publicPath: configModule.output.publicPath}