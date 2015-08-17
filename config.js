"use strict";

/*global module, require, process, __dirname */
var webpack = require("webpack");
var path = require("path");
var pkg = require("./package.json");
var manifest = require("./manifest.json");
var moment = require("moment");
var autoprefixer = require('autoprefixer-core');
var easings = require('postcss-easings');
var csswring = require('csswring');


// DO NOT CHANGE FOLDERS
// WIHTOUT UPDATING PACKAGE.JSON TOO.
var sourceFolder       = "src";
var outputFolder       = "dist";
var assetsFolder       = "";
var serverPort         = process.env.PORT||8081;
var previewUrl         = "http://localhost:"+serverPort;
var displayName        = manifest.name||pkg.name;
var extensions         = ["", ".js", ".jsx", ".css", ".scss"];
var modulesDirectories = ["node_modules", "bower_components", "src/vendor"];
var hotReload          = true;

// Helper to copy additionnal folders from one place to another.
function gulpDest(out){
  return path.join(outputFolder,assetsFolder,out);
}

var output = {
  path: path.join(__dirname, outputFolder,assetsFolder,"/"),
  pathinfo: true,
  filename: "[name].js",
  chunkFileName: "[name].chunk.js",
  libraryTarget: "umd",
  library: displayName,
  publicPath: assetsFolder+"/"
};

var cssIncludes   = modulesDirectories.map(function(include){
  return ("includePaths[]="+path.resolve(__dirname, include));
}).join("&");

// Webpack Loaders stack
var loaders = [
  {test: /\.json$/,                loaders: ["json-loader"] },
  {test: /\.js$/,                  loaders: ["babel-loader"], exclude: /node_modules|bower_components/},
  {test: /\.jsx$/,                 loaders: ["react-hot", "babel-loader"], exclude: /node_modules|bower_components/},
  {test: /\.(css|scss)$/,          loaders: ["style/useable", "css-loader", "autoprefixer-loader?browsers=last 2 version", "sass-loader?outputStyle=expanded&"+cssIncludes]},
  {test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file" },
];

var plugins = [
  new webpack.DefinePlugin({
    "BUILD_DATE" : JSON.stringify(moment().format("MMMM, DD, YYYY, HH:mm:ss")),
    "PUBLIC_PATH": JSON.stringify(output.publicPath),
    'GIT_COMMIT' : JSON.stringify(process.env.CIRCLE_SHA1 || "")
  }),
  new webpack.ResolverPlugin(
    new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
  ),
  new webpack.optimize.OccurenceOrderPlugin()
];

var postCss = function(){
  return [ autoprefixer({browsers:["last 2 version"]}), easings.easings, csswring() ];
}

var webpackConfig = {
  name: 'browser',
  hotReload: hotReload,

  // Key : What gets built as an output,
  // Value : from Where.
  entry: { ship:  "./"+sourceFolder+"/ship.js" },
  output: output,

  plugins: plugins,

  module: {
    loaders: loaders
  },

  resolve  : {
    root: [path.join(__dirname, "bower_components"), path.join(__dirname, "node_modules")],
    extensions: extensions
  },
  // Postcss config used in postcss-loader.
  // Autopefixer, 
  // Easing equations,
  // CSSWring Minifier
  postCss: postCss
}

var gulpConfig = {
  // Additional files to copy as part of the build process
  files              : {
    "src/styles/*.css"  : gulpDest("styles/"),
    "src/vendors/**/*"  : gulpDest("vendors/"),
    "src/images/**/*"   : gulpDest("images/"),
    "manifest.json"     : outputFolder,
    "src/*.png"         : outputFolder,
    "src/*.html"        : outputFolder,
    "CNAME"             : outputFolder,
  },
  jsFiles            : [ "src/**/*.js", "src/**/*.jsx" ]
}

module.exports = {
  libName            : pkg.name,
  displayName        : displayName,
  outputFolder       : outputFolder,
  assetsFolder       : assetsFolder,
  serverPort         : serverPort,
  previewUrl         : previewUrl,

  gulp               : gulpConfig,
  webpack            : webpackConfig,

  pkg                : pkg,
  manifest           : manifest  
};
