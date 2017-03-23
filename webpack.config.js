const env = process.env.NODE_ENV || 'development';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let entry = [
  'whatwg-fetch',
  './src/main.js',
];

let plugins = [
  new ExtractTextPlugin('styles.css'),
];

if (env === 'development') {
  entry = [
    ...entry,

    'react-hot-loader/patch',
    // activate HMR for React

    'webpack-dev-server/client?http://localhost:8080',
    // bundle the client for webpack-dev-server
    // and connect to the provided endpoint

    'webpack/hot/only-dev-server',
    // bundle the client for hot reloading
    // only- means to only hot reload for successful updates
  ];

  plugins = [
    ...plugins,

    new webpack.HotModuleReplacementPlugin(),
    // enable HMR globally

    new webpack.NamedModulesPlugin(),
    // prints more readable module names in the browser console on HMR updates
  ];
}

module.exports = {
  context: __dirname,
  entry,
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
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
  devtool: 'source-map',
  plugins,
};
