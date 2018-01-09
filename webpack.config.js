const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractMain = new ExtractTextPlugin('./dist/css/main.css');

module.exports = {
  entry: './src/js/index.ts',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      { // sass / scss loader for webpack. For main.scss
        test: /\.scss$/,
        loader: extractMain.extract(['css-loader', 'postcss-loader', 'sass-loader'])
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'js/main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    extractMain,
    new CopyWebpackPlugin([{
      from: './src/*.html',
      to: './dist/*.html'
    }])
  ]
};