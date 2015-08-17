var _           = require('underscore');
var path        = require('path');
var webpack     = require('webpack');
var StatsPlugin = require('stats-webpack-plugin');
var assign      = require('object-assign')
var config      = require('./config')

var devOutput = _.extend({},config.webpack.output,{publicPath: config.previewUrl+config.assetsFolder+'/'});

if(config.webpack.hot){
  var devEntry = _.reduce(config.webpack.entry,function(entries,v,k){
    entries[k] = ['webpack-dev-server/client?'+config.previewUrl, 'webpack/hot/dev-server', v];
    return entries;
  },{});
  var devPlugins = [new webpack.HotModuleReplacementPlugin(), new webpack.NoErrorsPlugin()]
} else {
  var devEntry = config.webpack.entry
  var devPlugins = [new webpack.NoErrorsPlugin()]
}

var development = assign({}, config.webpack, {
  devtool  : '#inline-source-map',
  devServer: true,
  entry: devEntry,
  output: devOutput,
  plugins:  config.webpack.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('development') },
      '__DEV__': true
    })
  ]).concat(devPlugins)
});

var prod = assign({}, config.webpack, {
  plugins:  config.webpack.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {'NODE_ENV': JSON.stringify('production') },
      '__DEV__': false
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments  : false,
      minimize  : true,
      ascii_only: true,
      quote_keys: true,
      sourceMap : false,
      beautify  : false,
      compress  : { drop_console: true }
    }),
    new webpack.optimize.DedupePlugin(),
    new StatsPlugin(path.join(__dirname, config.outputFolder, 'stats.json'), { chunkModules: true, profile: true })
  ])
});

module.exports = { development: development, production:  prod }
