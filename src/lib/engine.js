'use strict';
/*global require, module, Hull, console*/
var assign = require('object-assign');
var Emitter = require('events').EventEmitter;

/**
 * The engine is a condensed and simplified version of the Flux architecture,
 * It combines Store, Dispatcher and Actions into a single file, ensuring
 * top-down data flows that prevent bugs and make the architecture easy to 
 * understand
 */

var Constants = {
  INTRODUCTION_STEP: 'introduction_step',
  RESULT_STEP: 'result_step',
};

function Engine(deployment) {
  var self=this;
  onChange = function() {
    self.emitChange();
  }

  // Subscribe to every Hull auth event
  Hull.on('hull.auth.*', onChange);
  this.emitChange();
}

assign(Engine.prototype, Emitter.prototype, {
  addChangeListener: function(listener) {this.addListener(EVENT, listener);},
  removeChangeListener: function(listener) {this.removeListener(EVENT, listener);},
  emitChange: function(message) {this.emit(EVENT, message);}
});

Engine.Constants = Constants;

module.exports = Engine;
