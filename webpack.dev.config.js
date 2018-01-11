const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const extractMain = new ExtractTextPlugin('./css/main.css');
const extractHTML = new ExtractTextPlugin('./index.html');

module.exports = {
  context: __dirname + '/src/',
  entry: ['./index.html', './js/index.ts', './css/main.scss'],
  devtool: 'source-map',
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
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      },
      {
        test: /\.html$/,
        loader: extractHTML.extract(
          [
            'html-loader',
            {
              loader: 'posthtml-loader',
              options: {
                ident: 'posthtml',
                plugins: [
                  /* PostHTML Plugins */
                  require('posthtml-include')({
                    root: './src/'
                  })
                ]
              }
            }
          ]
        )
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
    extractHTML,
    new StyleLintPlugin({
      syntax: 'scss'
    }),
    new CopyWebpackPlugin([{
      from: './static',
      to: './static'
    }]),
  ]
};