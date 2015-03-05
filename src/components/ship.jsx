/**
 * This is where the Ship code actually begins.
 **/

import React     from 'react';
import HullStyle from './hull-style';

var Ship = React.createClass({
  propTypes: {
    sandbox: React.PropTypes.bool,
  },
  render: function() {
    return <div>
      <HullStyle {...this.props.settings}/>
      <h2>Ship Demo</h2>
    </div>
  },

  statics:{
    // Expose a static entry point to boot the ship
    // You can call it with Ship.start(element,deployment)
    start : function(element, deployment){

      // A bit meta :p
      React.render(<Ship/>, element);
    }
  }
});

module.exports = Ship;
