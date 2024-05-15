// import esbuild from 'esbuild';
// import pkg from 'webpack';
// const {Compilation}  = pkg;
import { transform } from "@babel/core";
import * as babelTypes from '@babel/types'

export default class MyEsbuildPlugin {

  apply(compiler) {
    // Tap into the normalModuleFactory hook
    compiler.hooks.normalModuleFactory.tap('MyEsbuildPlugin', (normalModuleFactory) => {
      normalModuleFactory.hooks.parser.for('javascript/auto').tap(' MyEsbuildPlugin', (parser) => {
        // Tap into the program to get the initial AST
        parser.hooks.program.tap('MyEsbuildPlugin', (ast) => {

          const moduleResource = parser.state.module.resource;
          const moduleSourceCode = parser.state.source
          
          if (moduleResource) {
            // Log the resource path of the module being parsed
            // console.log('Parsing module:', moduleResource);
            // console.log('Source Code :=======>', moduleSourceCode)
          }

      })
    })
  })
  }
}