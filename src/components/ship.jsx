import React     from 'react';

/**
 * This is where the Ship code actually begins.
 */

import HullFrame from './hull-frame';
import HullStyle from './hull-style';

var Ship = React.createClass({
  propTypes: {
    sandbox: React.PropTypes.bool,
  },
  renderContent: function() {
    return <div>
      <Style {...this.props.settings}/>
      <h1>Ship Demo</h1>
      <p>This app is sandboxed</p>
    </div>
  },
  render: function() {
    if (!this.props.sandbox) { return this.renderContent(); }
    return <Frame ref='frame'>{this.renderContent()}</Frame>;
  },

  statics:{
    // Expose a static entry point to boot the ship
    // You can call it with Ship.start(element,deployment)
    start : function(element, deployment){
      React.render(<Ship sandbox={true} styles={styles} />, element);
    }
  }
});

module.exports = Ship;
