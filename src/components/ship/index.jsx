'use strict';
/* global Hull, module*/

// Our boilerplate uses React.
import React from 'react';


// CSS Modules for sandboxed styles.
import reactCSSModules from 'react-css-modules';
import shipStyles from './index.css';

// A custom component to inject a stylesheet that describes how customer can customize styles
import Styles from '../styles';

@reactCSSModules(shipStyles)
export default class Ship extends React.Component {

  static propTypes = {
    engine: React.PropTypes.object.isRequired,
    styles: React.PropTypes.object,
  }

  state = this.props.engine.getState();

  componentWillMount = () => {
    this.props.engine.addChangeListener(this._onChange);
  }

  componentWillUnmount = () => {
    this.props.engine.removeChangeListener(this._onChange);
  }

  _onChange = () => {
    this.setState(this.props.engine.getState());
  }

  render() {
    const { engine, styles } = this.props;
    const { settings, user } = this.state;
    return (
      <div styleName="ship">
        <Styles scope={styles.ship} styles={styles} settings={settings} />
        <h3 styleName="title">{engine.translate('Ship Started')}</h3>
        <p>Hello, {user.name || 'There'}</p>
        <hr styleName="divider"/>
        <a href="https://github.com/hull-ships/hull-ship-boilerplate/archive/master.zip" styleName="download-link">{engine.translate('Download Boilerplate')}</a>
      </div>
    );
  }
}
