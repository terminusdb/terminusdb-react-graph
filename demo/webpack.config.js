const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: '#inline-source-map',
  entry: [
    './index.js',
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new Dotenv()
  ],
  resolve: {
    alias: {
      "@terminusdb/terminus-react-graph": path.join(__dirname, '..', 'src/index.js'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
     rules : [{
            // Transform our own .css files with PostCSS and CSS-modules
           test: /\.css$/i,
           use: ['style-loader', 'css-loader'],
          },
        {
         test: /\.js$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
         include: [__dirname, path.join(__dirname, '..', 'src')],
      }]
  }
};
