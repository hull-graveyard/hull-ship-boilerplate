/**
 * This is where the Ship code actually begins.
 **/

import React from "react";
import DynamicStyles from "./dynamic-styles";
import Styles from "../styles/main.scss";

var Ship = React.createClass({
  getDefaultProps() {
    return {
      engine: {},
      settings: {}
    };
  },
  getInitialState() {
    return {
      styles: {
        locals: {}
      }
    };
  },
  componentWillMount() {
    let styles = Styles.use();
    this.setState({
      styles,
      classes: styles.locals
    });
  },
  componentWillUnmount() {
    Styles.unuse();
  },
  render() {
    // this.state.locals.ship -> the local, encoded className for the .ship class in main.css.
    // checkout https://github.com/css-modules/css-modules
    let {classes} = this.state
    return (
      <div className={classes.ship}>
        <DynamicStyles rootClass={classes.ship} {...this.props.settings} document={this.props.engine.document}/>
        <h3 className={classes.title}>{this.props.engine.translate("Ship Started")}</h3>
        <hr/>
        <p>
          <small>
            <a href='https://github.com/hull-ships/hull-ship-boilerplate/archive/master.zip' className='download-link'>{this.props.engine.translate("Download Boilerplate")}</a>
          </small>
        </p>
      </div>
      );
  }
});

module.exports = Ship;
