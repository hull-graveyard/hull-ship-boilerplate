import React  from 'react';
import Router from 'react-router';
var {Route, Routes, NotFoundRoute, DefaultRoute, Redirect} = Router;

import Ship   from '../components/ship';

var routes=(
  <Route path='/' handler={Ship}>
  </Route>
);

var AppRouter;
var isRunning = false;

function onError(error) {
  console.error("---------------------- Router Error ---------------------- ",error, error.stack);
}

module.exports = {
  run: function(onRouteChange) {
    AppRouter = Router.create({
      routes: routes,
      location: Router.HashLocation,
      onError: onError
    });
    return AppRouter.run(function(Handler, state) {
      isRunning = true;
      onRouteChange(Handler, state);
    });
  },
  transitionTo: function(path, params={}, query={}) {
    // This helps when we need to handle some transition overrides globally
    if(!isRunning){
      console.warn("Router not started yet. Cannot transition...");
      return undefined;
    }
    return AppRouter.transitionTo(path, params, query);
  }
};
