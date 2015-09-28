'use strict';
/* global Hull, module*/

/**
 * This is where the Ship code actually begins.
 **/


// Our boilerplate uses React.
import React from 'react';

// A good way to define styles that can be customized from the dashboard
import DynamicStyles from './dynamic-styles';

// A good way to import styles sandboxed to the current Ship
import Styles from '../styles/main.scss';

// The engine contains all the logic and state for the app
import Engine from '../lib/engine';

const Ship = React.createClass({
  propTypes: {
    engine: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired,
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
      settings: {},
    };
  },
  getInitialState() {
    return {
      styles: {
        locals: {},
      },
    };
  },
  componentWillMount() {
    const styles = Styles.use();
    this.setState({ styles, classes: styles.locals });
  },
  componentWillUnmount() {
    Styles.unuse();
  },
  render() {
    // this.state.locals.ship -> the local, encoded className for the .ship class in main.css.
    // checkout https://github.com/css-modules/css-modules
    const { classes } = this.state;
    const { engine, settings } = this.props;
    return (
      <div className={classes.ship}>
        <DynamicStyles rootClass={classes.ship} {...settings} document={engine.document}/>
        <h3 className={classes.title}>{this.props.engine.translate('Ship Started')}</h3>
        <hr/>
        <p>
          <small>
            <a href="https://github.com/hull-ships/hull-ship-boilerplate/archive/master.zip" className="download-link">{this.props.engine.translate('Download Boilerplate')}</a>
          </small>
        </p>
      </div>
    );
  },
});

module.exports = Ship;
