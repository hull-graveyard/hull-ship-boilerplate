import React  from "react";
import Router from "react-router";
var {Route, DefaultRoute} = Router;

import Ship    from "../components/ship";
import Second  from "../components/second";

var App = React.createClass({
  render: function() {
    return (<Router.RouteHandler {...this.props}/>);
  }
});

function onError(error) {
  console.error("---------------------- Router Error ---------------------- ", error, error.stack);
}

var AppRouter, isRunning = false, routes=(
  <Route path="/" name="home" handler={App}>
    <DefaultRoute handler={Ship}/>
    <Route name="second" path="/second" handler={Second}/>
  </Route>
);

module.exports = {
  run: function(onRouteChange) {
    AppRouter = Router.create({
      routes: routes,
      location: Router.HistoryLocation,
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
