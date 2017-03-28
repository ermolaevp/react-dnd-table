const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function commonConfig() {
  return {
    context: __dirname,
    entry: [
      'whatwg-fetch',
      './src/main.js',
    ],
    output: {
      path: `${__dirname}/../dist/assets`,
      publicPath: '/',
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
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
          use: 'file-loader',
        },
        {
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 100000,
            },
          },
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('styles.css'),
      new HtmlWebpackPlugin({
        template: 'src/public/index.tpl.html',
        chunksSortMode: 'dependency',
      }),
    ],
  };
};
