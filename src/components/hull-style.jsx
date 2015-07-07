import React      from "react";
import color      from "color";

import MainStyles from "../styles/main.scss";

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
var HullStyle = React.createClass({
  getDefaultProps: function() {
    return {
      document: {}
    };
  },
  componentDidMount: function() {
    if(this.props.document.head){
      MainStyles.use(this.props.document.head);
    }
  },
  componentWillUnmount: function() {
    MainStyles.unuse();
  },
  getStyle: function(){

    // Just Javascript™
    let textColor = this.props.text_color;
    let backgroundImage = this.props.background_image;
    let rightColor = this.props.right_color || "#0093e6";
    let leftColor = this.props.left_color || "#4bc2b8";

    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.

    var style = `
      /* Style Tag inserted at runtime into Body */
      body {
        color: ${color(textColor).clearer(.4).hslString()};
        background-image: url(${backgroundImage});
      }
      hr{
        height: 40px;
        border:0;
        background-image: linear-gradient(to right, ${leftColor} 0%,  ${rightColor} 100%);
        padding: 0 0 0 0;
      }
    ` + ".s2{color:#0E1FC7} .s2:after{color: #0E1FC7; content:\" = 2 inline, wrong order\";} .s2:after{content:\" = 2 inline\";}";
    return style;
  },
  render: function() {
    // return <div></div>
    // Insert any css you want here. Live updates FTW
    return <style type="text/css" dangerouslySetInnerHTML={{__html:this.getStyle()}}></style>;
  }

});

module.exports = HullStyle;

