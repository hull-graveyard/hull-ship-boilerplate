'use strict';
/* global Hull, module*/

// Our boilerplate uses React.
import React from 'react';


// CSS Modules for sandboxed styles.
import reactCSSModules from 'react-css-modules';
import shipStyles from './index.css';

// A custom component to inject a stylesheet that describes how customer can customize styles
import CustomStyles from '../styles';

// Contains the logic and state for the app
import Engine from '../../lib/engine';

const Ship = React.createClass({

  propTypes: {
    engine: React.PropTypes.object.isRequired,
    styles: React.PropTypes.object,
  },

  statics: {
    // This method, when called, starts the ship
    start: function(element, deployment, hull) {
      // Create an Engine. We like this pattern even though it's not mandatory.
      const engine = new Engine(deployment, hull);
      // Render Ship into the designated root
      React.render(<Ship engine={engine}/>, element);
    },
  },

  getDefaultProps() {
    return {
      engine: {},
      styles: {},
    };
  },
  getInitialState() {
    return this.props.engine.getState();
  },

  componentWillMount() {
    this.props.engine.addChangeListener(this._onChange);
  },

  componentWillUnmount() {
    this.props.engine.removeChangeListener(this._onChange);
  },

  _onChange() {
    this.setState(this.props.engine.getState());
  },

  render() {
    const { settings } = this.state;
    const { engine, styles } = this.props;
    return (
      <div styleName="ship">
        <CustomStyles scope={styles.ship} styles={styles} settings={settings} />
        <h3 styleName="title">{engine.translate('Ship Started')}</h3>
        <hr/>
        <p>
          <small>
            <a href="https://github.com/hull-ships/hull-ship-boilerplate/archive/master.zip" className="download-link">{engine.translate('Download Boilerplate')}</a>
          </small>
        </p>
      </div>
    );
  },
});

export default reactCSSModules(Ship, shipStyles);
