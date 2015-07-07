"use strict";

/* global Hull, module*/

// This is where our actual App begings.

// Our boilerplate uses React.
// We love it, and we thing you will too.
import React      from "react";

// The engine contains all the logic and state for the app
import Engine     from "./lib/engine";

// The views are described in the router.
import ShipRouter from "./lib/router";

// Entry point for the Library
// Don't start the app from here
// Call Ship.start on the callback  from your script to boot
var start = function(element, deployment, hull){

  // Create an Engine. We like this pattern even though it's not mandatory.
  var engine = new Engine(deployment, hull);

  // Automatically resize the frame to match the Ship Content
  // Note: We use a local hull instance, not Hull directly.
  hull.autoSize(400);

  // Start the router
  ShipRouter.run(function (Handler, state) {
    // On location change, Update the Engine state.
    React.render(React.createElement(Handler, Object.assign({engine}, state)), element);
  });
};

Hull.onEmbed(start);

module.exports = start;
