'use strict';
/* global Hull, module*/

// Our boilerplate uses React.
import React from 'react';


// CSS Modules for sandboxed styles.
import reactCSSModules from 'react-css-modules';
import shipStyles from './index.css';

// A custom component to inject a stylesheet that describes how customer can customize styles
import Styles from '../styles';

import Icon from '../icon';

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
        <a styleName="button" href="https://github.com/hull-ships/hull-ship-boilerplate/blob/master/README.md" target='_blank'><Icon name="show"/> Boilerplate README</a>
        <a styleName="button" href="https://github.com/hull-ships/hull-ship-boilerplate/blob/master/ship_boot_sequence.md" target='_blank'><Icon name="cog"/> Boot Sequence</a>
        <a styleName="button" href="http://www.hull.io/docs/apps/ships" target='_blank'><Icon name="codesnippet"/> Ships Documentation</a>
        <a href="https://github.com/hull-ships/hull-ship-boilerplate/archive/master.zip" styleName="button" target='_blank'><Icon name="download"/> {engine.translate('Download Boilerplate')}</a>
      </div>
    );
  }
}
