import React from 'react';

/**
 * Based on https://github.com/ryanseddon/react-frame-component
 */

// Render Everything in an iframe, get CSS sandboxing!
var Frame = React.createClass({
  propTypes: {
    style: React.PropTypes.object,
    head :  React.PropTypes.node
  },
  getDefaultProps: function() {
    return {
      width       : '100%',
      frameBorder : 0
    };
  },
  render: function () {
    // Memoize the frame to avoid breaking virtual tree when re-rendering it
    // Works as long as you don't update the props for this frame.
    if(!this.frame){this.frame = React.createElement('iframe', this.props);}
    return this.frame;
  },
  componentDidMount: function() {
    this.renderFrameContents();
    // Ensure the frame doesnt scroll if it grows.
    this._autogrow = setInterval(this.autoGrow, 200);
  },
  renderFrameContents: function() {
    var doc = this.getDOMNode().contentDocument;
    if(doc && doc.readyState === 'complete') {
      var contents = React.createElement('div',
        undefined,
        this.props.head,
        this.props.children
      );

      React.render(contents, doc.body, this.autoGrow);
    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  },
  componentDidUpdate: function() {
    this.renderFrameContents();
  },
  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.getDOMNode().contentDocument.body);
  },
  autoGrow: function() {
    // Automatically update height to prevent scrollbars
    if (this.isMounted()) {
      var frame = this.getDOMNode();
      var doc = frame.contentDocument;
      setTimeout(function() {
        doc.body.style.margin = 0;
        doc.body.style.padding = 0;
        var height = doc.body.firstChild.offsetHeight;
        frame.style.height = height + "px";
      }, 25);
    } else {
      // We're not mounted. Stop polling
      if (this._autogrow) clearInterval(this._autogrow);
    }
  },
});


module.exports = Frame;
