'use strict';
/* global require, module */

import I18n from './i18n';
const Emitter = require('events').EventEmitter;

/**
 * The engine is a condensed and simplified version of the Flux architecture,
 * It combines Store, Dispatcher and Actions into a single file, ensuring
 * top-down data flows that prevent bugs and make the architecture easy to
 * understand
 */

const CHANGE_EVENT = 'change';

export default class Engine extends Emitter {

  constructor(deployment, hull) {
    super();

    if (!deployment) {
      throw new Error('Ship could not get deployment object. It is required to boot');
    }
    if (!hull) {
      throw new Error('Ship could not get hull instance. It is required to boot');
    }

    this.hull = hull;
    this.ship = deployment.ship;
    I18n.setTranslations(deployment.ship.translations);

    const onChange = function() {
      self.emitChange();
    };

    // Subscribe to every Hull user event
    hull.on('hull.user.*', onChange);
    this.emitChange();
  }

  getState = () => {
    return {
      settings: this.ship.settings,
      user: this.hull.currentUser(),
    };
  }

  addChangeListener = (listener) => {
    this.addListener(CHANGE_EVENT, listener);
  }

  removeChangeListener = (listener) => {
    this.removeListener(CHANGE_EVENT, listener);
  }

  emitChange = (message) => {
    this.emit(CHANGE_EVENT, message);
  }

  translate = I18n.translate

}
