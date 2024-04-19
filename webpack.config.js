import path from 'node:path'
import HtmlWebpackPlugin from 'html-webpack-plugin';


export default  {
  mode: 'development',
  entry: '../shopster/shopster/client/index.js',
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