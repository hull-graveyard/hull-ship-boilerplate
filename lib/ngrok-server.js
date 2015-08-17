var ngrok            = require("ngrok");
var gulpLoadPlugins  = require("gulp-load-plugins");
var $                = gulpLoadPlugins();

module.exports = function(port, subdomain, callback){
  var options = { port: port };
  var env = process.env;
  if (env.NGROK_AUTHTOKEN) {
    options.authtoken = env.NGROK_AUTHTOKEN;
    if(env.NGROK_SUBDOMAIN || subdomain){
      options.subdomain = (env.NGROK_SUBDOMAIN || subdomain).replace(/-/g,'');
    }
  }
  ngrok.connect(options, callback);
}
