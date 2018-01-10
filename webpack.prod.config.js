const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
        test: /\.js$/,
        exclude: path.resolve(__dirname, 'src'),
        loader: 'source-map-loader',
        enforce: 'pre',
      },
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: {
          configFile: 'tslint.json',
          emitErrors: true
        }
      },
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
    }]),
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      uglifyOptions: {
        ecma: 6
      }
    })
  ]
};