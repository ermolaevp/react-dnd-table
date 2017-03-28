function buildConfig(env) {
  const ENV = typeof env === 'undefined' ? 'dev' : env;
  return require('./webpack.' + ENV + '.js')(ENV);
}

module.exports = buildConfig;
