'use strict';
/* global require, module */

// NOT COMPLETE
// NOT COMPLETE
// NOT COMPLETE

import assign from 'object-assign';
import I18n from './i18n';
const Emitter = require('events').EventEmitter;

/**
 * The engine is a condensed and simplified version of the Flux architecture,
 * It combines Store, Dispatcher and Actions into a single file, ensuring
 * top-down data flows that prevent bugs and make the architecture easy to
 * understand
 */

const CHANGE_EVENT = 'change';

function Engine(deployment, hull) {
  const self = this;

  self.hull = hull;
  I18n.setTranslations(deployment.ship.translations);

  const onChange = function() {
    self.emitChange();
  };

  // Subscribe to every Hull user event
  hull.on('hull.user.*', onChange);
  this.emitChange();
}

assign(Engine.prototype, Emitter.prototype, {
  getState: function() {
    return {
      settings: this._ship.settings,
      user: this.hull.currentUser(),
    };
  },
  addChangeListener: function(listener) {
    this.addListener(CHANGE_EVENT, listener);
  },
  removeChangeListener: function(listener) {
    this.removeListener(CHANGE_EVENT, listener);
  },
  emitChange: function(message) {
    this.emit(CHANGE_EVENT, message);
  },
  translate: I18n.translate,
});

module.exports = Engine;
