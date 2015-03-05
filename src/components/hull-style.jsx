import React      from 'react';
import Color      from 'color';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
var HullStyle = React.createClass({
  getStyle: function(){

    // Just Javascript™
    var props = this.props
    var left_color='#0093e6';
    var right_color='#4bc2b8';
    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.
    var style = `
      body {
        color: ${Color(props.text_color).clearer(.4).hslString()};
        background-image: url(${props.background_image});
      }
      hr{
        height: 4px;
        border:0;
        background-image: linear-gradient(to right, ${left_color} 0%,  ${right_color} 100%);
        padding: 10px;
        margin:12px 0;
      }
      .svg-share-icon{
        width:64px;
      }
      .svg-icon-hull{
        width: 128px;
        margin:0 auto;
        display:blockn
      }
    `
    return style
  },
  render: function() {
    // Insert any css you want here. Live updates FTW
    return <style type="text/css">{this.getStyle()}</style>;
  }

});

module.exports = HullStyle;

