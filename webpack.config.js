import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StylexPlugin from '@stylexjs/webpack-plugin';
import ReactRouterBasePathPlugin from './server/basePath.js';
import ListFilesPlugin from './server/listFiles.js';
export default  {
  context:path.join(import.meta.dirname,'../shopster/shopster'),
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(import.meta.dirname,'./build'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/app',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react', { targets: 'defaults' }]
            ]
          }
        },
        //Adding in Loader to check for React Router and Add basepath
        {
          loader: path.resolve(import.meta.dirname,'./server/base-path.js'),
        
        }
      ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ]
  },

  // devServer: {
  //   compress: true,
  //   historyApiFallback: {
  //     index: '/app/'
  //   },
  //   publicPath: '/app/',
  //   hot: true,
  //   static: path.join(import.meta.dirname, 'public'),

  // },
  plugins: [new HtmlWebpackPlugin({
    title: 'Shopster - Scratch Project - Red Lipped Batfish',
    filename: 'index.html',
    template: './client/index.html',
    inject: 'body',
    // base: '/app/'
  }),
  new StylexPlugin({
    filename: 'styles.[contenthash].css',
    // get webpack mode and set value for dev
    dev: process.NODE_ENV,
    // Use statically generated CSS files and not runtime injected CSS.
    // Even in development.
    runtimeInjection: false,
    // optional. default: 'x'
    classNamePrefix: 'x',
    // Required for CSS variable support
    unstable_moduleResolution: {
      type: 'haste',
      // default: 'commonJS'
      // type: 'commonJS',
      // The absolute path to the root directory of your project
      rootDir: import.meta.dirname,
    },
  }),
  // new ReactRouterBasePathPlugin({
  //   basePath: '/app' // Set this to the desired base path
  // }),
  // new ListFilesPlugin()
 
  ]};

  /*
import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default  {
  mode: 'development',
  entry: '../vite-react-test/src/main.jsx',
  output: {
    path: path.resolve('./build'),
    filename: 'bundle.js',
    clean: true,
    publicPath: '/build',
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
    compress: true,
    historyApiFallback: true,
    hot: true
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'Shopster - Scratch Project - Red Lipped Batfish',
    filename: 'index.html',
    template: './indexWeb.html',
    inject: 'body'
  }),
  ]};
  */