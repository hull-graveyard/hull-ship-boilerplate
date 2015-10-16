import React from 'react';
import ReactDOM from 'react-dom';

// Contains the logic and state for the app
import Engine from './lib/engine';

// Starts the React Ship
import Ship from './components/ship';

// This method, when called, starts the ship
export default function(element, deployment, hull) {
  // Create an Engine. We like this pattern even though it's not mandatory.
  const engine = new Engine(deployment, hull);
  // Render Ship into the designated root
  ReactDOM.render(<Ship engine={engine}/>, element);
}

