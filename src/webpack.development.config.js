var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname,
  entry: [
    'whatwg-fetch',
    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates

    './main.js'
  ],
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: [
        //   'style-loader',
        //   'css-loader?importLoaders=1',
        //   'postcss-loader',
        // ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader?importLoaders=1',
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        query: {
          name: '[path][name].[ext]?[hash]',
          limit: 10000,
        },
      },
      {
        test: /\.(woff2?)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'url-loader?mime-type=application/font-woff',
        query: {
          name: '[path][name].[ext]?[hash]',
        },
      },
      {
        test: /\.(eot|ttf|svg|wav|mp3)(\?v=[0-9].[0-9].[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: '[path][name].[ext]?[hash]',
        },
      },
    ],
  },
  // postcss: function () {
  //   return [require('autoprefixer'), require('precss')];
  // },
  devtool: 'source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates

    new ExtractTextPlugin("styles.css"),
  ],
};
