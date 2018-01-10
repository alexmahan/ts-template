const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const extractMain = new ExtractTextPlugin('./css/main.css');

module.exports = {
  entry: ['./src/css/main.scss', './src/js/index.ts'],
  devtool: 'source-map',
  devServer: {
    contentBase: './static'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: extractMain.extract(['css-loader', 'sass-loader'])
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
      from: './static',
      to: './'
    }])
  ]
};