import React      from 'react';
import Color      from 'color';

// Yes. You can do this with Webpack.
import MainStyles from '../styles/main.scss';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style bundle containing a mix of Stylesheets, Inline styles. 
 */
var Style = React.createClass({
  componentDidMount() {
    //Embed your SCSS Files like this. Gives you reference-counted files, and immediate removal when the component isn't used anymore.
    MainStyles.use(this.getDOMNode());
  },

  componentWillUnmount() {
    MainStyles.unuse();
  },

  getStyle: function(){

    // Just Javascript™
    var props = this.props
    var background_image = props[`${key}_background_image`];

    // Here's where you inject your user-configurable CSS.
    // ES6 template literals (http://updates.html5rocks.com/2015/01/ES6-Template-Strings) make this a fun moment.
    var style = `
      body {
        color: ${props.text_color};
        color: ${Color(props.text_color).clearer(.4).hslString()};
        background-color: ${props.background_color};
        background-image: url(${background_image});
      }
    `
    return style
  },
  render: function() {
    // Insert any css you want here. Live updates FTW
    return (
      <div>
        <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css"/>
        <style  media="screen" type="text/css">{this.getStyle()}</style>
      </div>
    );
  }

});

module.exports = Style;

