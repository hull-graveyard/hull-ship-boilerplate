import App from './app';
Hull.init(hullConfig);

var appInit = function(hull, me, platform, org){

  // // When embedded by Hull. this is how the app will be booted:
  // hull.embed(platform.deployments);

  // For full apps, skip the embed process, boot directly
  App.start(document.getElementById('ship'),platform.deployments[0]);
}

Hull.ready(appInit)

