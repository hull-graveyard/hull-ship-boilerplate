'use strict';

/* global Hull, module*/

// This is where our actual App begings.

// Our boilerplate uses React.
// We love it, and we thing you will too.
import React from 'react';

// The engine contains all the logic and state for the app
import Engine from './lib/engine';

// The engine contains all the logic and state for the app
import Ship from './components/ship';

// Entry point for the Library
// Don't start the app from here
// Call Ship.start on the callback  from your script to boot
const start = function(element, deployment, hull) {
  // Create an Engine. We like this pattern even though it's not mandatory.
  const engine = new Engine(deployment, hull);
  // Start the router
  React.render(<Ship engine={engine}/>, element);
};

if ( Hull && Hull.onEmbed ) {
  Hull.onEmbed(start);
}

module.exports = start;
