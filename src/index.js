// TEMPORARY
import Translations from '../locales/en.json';
import Manifest from '../manifest.json';
// TEMPORARY

import App from './app';
Hull.init(hullConfig);

var appInit = function(hull, me, platform, org){
  var ds = platform.deployments[0].deploy_options
  platform.deployments[0].settings = {}
  platform.deployments[0].settings.$selector = ds.el
  platform.deployments[0].settings.$multi = true
  platform.deployments[0].settings.$placement = ds.placement
  platform.deployments[0].settings.$sandbox = true
  platform.deployments[0].settings.$width = '100%'
  platform.deployments[0].settings.$height = '400'

  // TEMPORARY
  platform.deployments[0].ship.translations.en = Translations;

  // Fake the Homepage URL, and the manifest for the embedded ship
  platform.deployments[0].ship.index = 'http://localhost:8081/ship.html';

  // When embedded by Hull. this is how the app will be booted:
  hull.embed(platform.deployments);

  // For full apps, skip the embed process, boot directly
  // App.start(document.getElementById('ship'),platform.deployments[0]);
}

Hull.ready(appInit)

