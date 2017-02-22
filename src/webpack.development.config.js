var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: [
    // Add the client which connects to our middleware
    // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    // useful if you run your app from another point like django
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
    // And then the actual application
    './main.js'
  ],
  output: {
    path: __dirname + '/public',
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: "style-loader!css-loader!postcss-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          "presets": ["react", "es2015", "stage-0", "react-hmre"]
        }
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif)$/,
      //   loader: 'url-loader',
      //   query: {
      //     name: '[path][name].[ext]?[hash]',
      //     limit: 10000,
      //   },
      // },
      // {
      //   test: /\.(woff2?)(\?v=[0-9].[0-9].[0-9])?$/,
      //   loader: 'url-loader?mime-type=application/font-woff',
      //   query: {
      //     name: '[path][name].[ext]?[hash]',
      //   },
      // },
      // {
      //   test: /\.(eot|ttf|svg|wav|mp3)(\?v=[0-9].[0-9].[0-9])?$/,
      //   loader: 'file-loader',
      //   query: {
      //     name: '[path][name].[ext]?[hash]',
      //   },
      // },
    ]
  },
  // postcss: function () {
  //   return [require('autoprefixer'), require('precss')];
  // },
  // devtool: 'source-map',
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.NoErrorsPlugin(),
  // ],
};
