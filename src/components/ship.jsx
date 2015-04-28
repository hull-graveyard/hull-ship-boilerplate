/**
 * This is where the Ship code actually begins.
 **/

import React     from 'react';
import HullStyle from './hull-style';
import Icons     from './hull-icons';
import {Link}    from 'react-router'

var Ship = React.createClass({
  propTypes: {
    sandbox: React.PropTypes.bool,
  },
  render: function() {
    return <div className='container-fluid'>
      <HullStyle {...this.props.settings}/>
      <hr/>
      <h2>Hull Sandboxed Ship</h2>
      <p className="test-message"></p>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4">
          <div className="well">
            <span className="glyphicon glyphicon-piggy-bank"></span>
          </div>
        </div>
      </div>
      <p>
        <Icons.Hull {...this.props.settings}/>
      </p>
      <p>
        <a href='https://github.com/hull-ships/hull-ship-boilerplate/archive/master.zip' className='download-link'>
          <Icons.Download {...this.props.settings} style={{marginBottom:5}}/> Download Boilerplate
        </a>
      </p>
      <p>
        <Link to='second' className='download-link'>See second page</Link>
      </p>
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


