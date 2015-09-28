# How to build components with Scoped CSS in Every Browser

This document explains how we achieve Scoped CSS in a page, effectively bringing Web Components-like behaviour to all available browsers.

To achieve scoped styles, you need a combination of 4 things:

- [Webpack](http://webpack.github.io/), a modern module bundler that handles more than JS, and extends to CSS, images and more.
- [React](http://facebook.github.io/react/), from Facebook that enables one-way, reactive data flow instead of stateful code.
- A tweaked version of [React-Frame-Component](https://github.com/ryanseddon/react-frame-component) allowing you to sandbox a component by rendering it inside an Iframe;
- [Our fork](https://github.com/hull/style-loader) of the `styles-loader` webpack module that allows to define where to inject css

Here's the general React architecture of the finished setup: 

```html
  <html>
    <body>
      <!-- Automatically created -->
      <iframe src=""> 
        <head>
          <!-- Your injected, sandboxed stylesheet -->
          <link rel="stylesheet" href="...">
        </head>
        <body>
          <!-- Your App -->
          <MyShip options={...}/>
        </body>
      </iframe>
    </body>
  </html>
```


What we've done here, is simply wrap our entire app inside an Iframe created on the fly, and then inject our styles in this iframe's Head.

#### Here's how the code looks like:

_app.jsx_
```js
'use strict';
var React = require('react');
var MyShip = require('./my-ship');
var Frame = require('./components/iframe');
var styles = require('./styles/main.scss');

var Ship = React.createClass({
  //Inject the styles in the iframe at boot
  componentDidMount: function() {
    this.props.styles.use(this.getStyleContainer());
  },
  //Unnecessary for iframe, but necessary if you decide to remove the iframe
  componentWillUnmount: function() {
    this.props.styles.unuse(this.getStyleContainer());
  },
  //Handles both the iframed and inline scenarios
  getStyleContainer: function(){
    if(this.refs && this.refs.frame){
      return this.refs.frame.getDOMNode().contentDocument.head;
    }
    return document.getElementsByTagName('head')[0];
  },
  //Build all styles into style tags.
  renderStyles: function(){
    return this.props.styles.map(function(style){
      return <style>{style[1]}</style>
    });
  },
  //Usage is trivial.
  render: function() {
    return <Frame ref='frame'><MyShip {...this.state}/></Frame>;
  }
});

//Boot your app here
React.render(<Ship styles={styles} />, element);
```

_frame.jsx_
```js
// Based on https://github.com/ryanseddon/react-frame-component

var React = require('react');
var Frame = React.createClass({

  getDefaultProps: function() {
    return {width: '100%', frameBorder: 0};
  },

  componentDidMount: function() {
    this.renderFrame();
    // Ensure the frame doesnt scroll if it grows.
    this._autogrow = setInterval(this.autoGrow, 200);
  },
  componentDidUpdate: function() {
    this.renderFrame();
  },
  render: function () {
    // Memoize the frame to avoid breaking virtual tree when re-rendering it
    // Works great as long as you don't update the props for this frame.
    if(!this.frame){this.frame = React.createElement('iframe', this.props);}
    return this.frame;
  },

  renderFrame: function(callback) {
    var self=this, doc = this.getDOMNode().contentDocument;
    //Wait for iframe to be initialized to render content inside.
    if(doc && doc.readyState === 'complete') {
      var content = <div>{this.props.children}</div>;
      React.render(content, doc.body, callback);
      this.autoGrow();
    } else {
      setTimeout(function(){self.renderFrame(callback)}, 0);
    }
  },

  autoGrow: function() {
    // Automatically update height to prevent scrollbars
    if (this.isMounted()) {
      var frame = this.getDOMNode();
      var doc = frame.contentDocument;
      setTimeout(function() {
        doc.body.style.margin = 0;
        doc.body.style.padding = 0;
        // Give it a bit of padding, to handle browser differences.
        var height = doc.body.firstChild.offsetHeight + 30;
        frame.style.height = height + "px";
      }, 10);
    } else {
      // We're not mounted. Stop polling
      if (this._autogrow) clearInterval(this._autogrow);
    }
  },
});


module.exports = Frame;
```
