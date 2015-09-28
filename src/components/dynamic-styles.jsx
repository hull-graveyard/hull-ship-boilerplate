import React      from "react";
import color      from "color";

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
var HullStyle = React.createClass({
  getDefaultProps() {
    return {
      document: {}
    };
  },
  getStyle(){

    let {text_color, background_image, right_color, left_color} = this.props;
    // Just Javascript™
    right_color = right_color || "#0093e6";
    left_color = left_color || "#4bc2b8";

    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.

    /* Style Tag inserted at runtime into Body */
    return `
      ${this.props.rootClass} {
        color: ${color(text_color).clearer(.4).hslString()};
        background-image: url(${background_image});
      }
      ${this.props.rootClass} hr{
        height: 40px;
        border:0;
        background-image: linear-gradient(to right, ${left_color} 0%,  ${right_color} 100%);
        padding: 0 0 0 0;
      }
    `;
  },
  render() {
    // return <div></div>
    // Insert any css you want here. Live updates FTW
    return <style type="text/css" dangerouslySetInnerHTML={{__html:this.getStyle()}}></style>;
  }

});

module.exports = HullStyle;

