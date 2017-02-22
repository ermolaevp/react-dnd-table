'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');
var constants = require('./constants.js');

module.exports = {
  context: __dirname,
  entry: [
    './main.js'
  ],
  target: 'web',
  output: {
    path: __dirname + '/../dist/public',
    filename: '[name]-[hash].min.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
        // loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          babelrc: false,
          presets: ["react", "es2015", "stage-0"],
          // plugins: ["transform-runtime"]
        }
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff2?)$/,
        loader: 'url-loader',
        query: {
          name: '[path][name].[ext]',
          limit: 10000,
        },
      },
      {
        test: /\.(eot|ttf|wav|mp3)$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]',
        },
      },
    ]
  },
  postcss: function () {
    return [require('autoprefixer'), require('precss')];
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.ProvidePlugin({
      _: "underscore",
      moment: "moment",
      tiasUtils: __dirname + "/lib/utils",
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      },
      dateTimeFormat: JSON.stringify(constants.dateTimeFormat),
      InitalConstants: JSON.stringify(constants.InitalConstants),
      ItemTypes: JSON.stringify(constants.ItemTypes),
      InitalAttributes: JSON.stringify(constants.InitalAttributes),
    })
  ],
  devtool: '#source-map',
};
