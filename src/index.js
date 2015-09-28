// The engine contains all the logic and state for the app
// This file starts the ship "Manually"
// In production, it will be served from ship.js and auto-started

import Ship from './components/ship';

Hull.ready(function(hull, me, platform) {
  Ship.start(document.getElementById('ship'), platform.deployments[0], hull);
});
