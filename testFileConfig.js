const path = require('path');
const StylexPlugin = require('@stylexjs/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: '/client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },

  devServer: {
    port:8000,
    compress: true,
    proxy: {
      '/api/*': 'http://localhost:3000',
      '/auth':'http://localhost:3000'
    },
    historyApiFallback: true,
    hot: true
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Shopster - Scratch Project - Red Lipped Batfish',
    filename: 'index.html',
    template: './client/index.html',
    inject: 'body'
  }),
  
  new StylexPlugin({
    filename: 'styles.[contenthash].css',
    // get webpack mode and set value for dev
    dev: process.env.NODE_ENV === 'development',
    // Use statically generated CSS files and not runtime injected CSS.
    // Even in development.
    runtimeInjection: false,
    // optional. default: 'x'
    classNamePrefix: 'x',
    // Required for CSS variable support
    unstable_moduleResolution: {
      type: 'commonJS' | 'haste',
      // default: 'commonJS'
      // type: 'commonJS',
      // The absolute path to the root directory of your project
      rootDir: __dirname,
    },
  }),
  ]};