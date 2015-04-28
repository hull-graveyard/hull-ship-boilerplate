import React      from 'react';
import Color      from 'color';

// Yes. You can do this with Webpack.
import MainStyles from '../styles/main.scss';

//// Now you can embed CSS like this.
//// Gives you reference-counted files;

//// To remove the style: 
// MainStyles.unuse();

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
var HullStyle = React.createClass({
  componentDidMount: function() {
    var cs = document.currentScript || document._currentScript
    if(cs && cs.ownerDocument){
      MainStyles.use(cs.ownerDocument.body);
    }
  },
  componentWillUnmount: function() {
    // MainStyles.unuse();
  },
  getStyle: function(){

    // Just Javascript™
    var props = this.props
    var left_color='#0093e6';
    var right_color=this.props.right_color || '#4bc2b8';
    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.

    var style = `
      /* Style Tag inserted at runtime into Body */
      body {
        color: ${Color(props.text_color).clearer(.4).hslString()};
        background-image: url(${props.background_image});
      }
      hr{
        height: 40px;
        border:0;
        background-image: linear-gradient(to right, ${left_color} 0%,  ${right_color} 100%);
        padding: 0 0 0 0;
      }
    `
    return style
  },
  render: function() {
    // return <div></div>
    // Insert any css you want here. Live updates FTW
    return <style type="text/css">{this.getStyle()}</style>;
  }

});

module.exports = HullStyle;

