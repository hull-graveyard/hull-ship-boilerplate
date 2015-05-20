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
  getDefaultProps: function() {
    return {
      engine : {},
      settings : {}
    };
  },
  render: function() {
    return <div>
      <HullStyle {...this.props.settings} document={this.props.engine.document}/>
      <hr/>
      <h1>Hull Ship Boilerplate</h1>
      <span className='s2'>2</span> <span className='s3'>3</span> <span className='s4'>4</span> <span className='s5'>5</span>
      <div className="row">
        <div className="col-sm-4 col-sm-offset-4">
          <div className="well" style={{marginTop:12}}>
            <span className="glyphicon glyphicon-piggy-bank"></span>
          </div>
          <div className="visible-xs-block">Iframe mode: Media queries apply</div>
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
  }
});

module.exports = Ship;
