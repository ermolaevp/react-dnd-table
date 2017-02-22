var http = require('http');
var express = require('express');
var env  = process.env.NODE_ENV || 'development';
var port = process.env.PORT || 9000;

var app = express();

var webpackConfig = require(process.env.WEBPACK_CONFIG
  ? process.env.WEBPACK_CONFIG
  : './webpack.' + env + '.config')

// Http logger
app.use(require('morgan')('short'));

if (env === 'development') {

  // Step 1: Create & configure a webpack compiler
  var webpack = require('webpack');
  var compiler = webpack(webpackConfig);

  // Step 2: Attach the dev middleware to the compiler & the server
  app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
  }));
}

// Serve static files
app.use(express.static(webpackConfig.output.path));

// Register API middleware
// app.use('/api/endpoints', require('./api/endpoints'));
// app.use('/api/counters', require('./api/counters'));
// app.use('/api/organizations', require('./api/organizations'));
// app.use('/api/histogram', require('./api/histogram'));
// app.use('/api/rules', require('./api/rules'));

// Root route
app.get("/", function(req, res) {
  res.sendFile(webpackConfig.output.path + '/index.html');
});

function startServer() {
  var server = http.createServer(app);
  server.listen(port, function() {
    console.log("Listening on %j", server.address());
  });
}

if (require.main === module) {
  startServer();
} else {
  module.exports = startServer;
}
