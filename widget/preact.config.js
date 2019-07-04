export default (config, env, helpers) => {
  delete config.entry.polyfills;
  config.output.filename = "[name].js"
  config.output.publicPath = "/widget/"
  config.node.process = true
  config.node.Buffer = true
  config.devServer.clientLogLevel='info'
  config.devServer.publicPath = '/widget/'

  let { plugin } = helpers.getPluginsByName(config, "ExtractTextPlugin")[0];
  plugin.options.disable = true;

  if (env.production) {
    config.output.libraryTarget = "umd";
  }
};
