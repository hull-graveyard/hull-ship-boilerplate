'use strict';

// For better integration in React apps, we recommend using this pattern.
// We've seen it work pretty well.

import start from './start';

// This file starts the ship "Manually"
// In production, it will be served from ship.js and auto-started

Hull.ready(function(hull, me, platform /* ,organization */ ) {
  start(document.getElementById('ship'), platform.deployments[0], hull);
});
