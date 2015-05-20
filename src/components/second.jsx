/**
 * This is where the Ship code actually begins.
 **/

import React     from 'react';
import HullStyle from './hull-style';
import Icons     from './hull-icons';
import {Link}    from 'react-router'

var Second = React.createClass({
  propTypes: {
    sandbox: React.PropTypes.bool,
  },
  render: function() {
    return <div>
      <HullStyle {...this.props.settings}  document={this.props.engine.document} right_color={"#ff6600"}/>
      <hr/>
      <h1>Hull Sandboxed Ship</h1>
      <p>
        <Icons.Hull {...this.props.settings}/>
      </p>
      <p>
        <a href='https://github.com/hull-ships/hull-ship-boilerplate/archive/master.zip' className='download-link'>
          <Icons.Download {...this.props.settings} style={{marginBottom:5}}/> Download Boilerplate
        </a>
      </p>
      <p>
        <Link to='/' className='download-link'>See first page</Link>
      </p>
    </div>
  },
});

module.exports = Second;


