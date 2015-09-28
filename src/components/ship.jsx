/**
 * This is where the Ship code actually begins.
 **/

import React from 'react';
import DynamicStyles from './dynamic-styles';
import Styles from '../styles/main.scss';

const Ship = React.createClass({
  propTypes: {
    engine: React.PropTypes.object.isRequired,
    settings: React.PropTypes.object.isRequired,
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
