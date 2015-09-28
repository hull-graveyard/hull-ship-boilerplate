import React from 'react';
import color from 'color';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
const HullStyle = React.createClass({
  propTypes: {
    rootClass: React.PropTypes.string.isRequired,
    text_color: React.PropTypes.string,
    left_color: React.PropTypes.string,
    right_color: React.PropTypes.string,
    background_image: React.PropTypes.string,
  },
  getDefaultProps() {
    return {
      document: {},
    };
  },
  getStyle() {
    const {
      background_image: backgroundImage,
      text_color: textColor,
      right_color: rightColor,
      left_color: leftColor,
    } = this.props;
    // Just Javascript™
    const right = rightColor || '#0093e6';
    const left = leftColor || '#4bc2b8';

    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.

    /* Style Tag inserted at runtime into Body */
    return `
      ${this.props.rootClass} {
        color: ${color(textColor).clearer( 0.4 ).hslString()};
        background-image: url(${backgroundImage});
      }
      ${this.props.rootClass} hr{
        height: 40px;
        border:0;
        background-image: linear-gradient(to right, ${left} 0%,  ${right} 100%);
        padding: 0 0 0 0;
      }
    `;
  },
  render() {
    // return <div></div>
    // Insert any css you want here. Live updates FTW
    return <style type="text/css" dangerouslySetInnerHTML={{__html: this.getStyle()}}></style>;
  },

});

module.exports = HullStyle;

