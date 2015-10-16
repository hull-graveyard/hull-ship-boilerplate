import _ from 'lodash';
import React from 'react';
import radium from 'radium';
const Style = radium.Style;
import color from 'color';
import mixins from '../../styles/mixins.css';

/**
 * Style component
 * @param  {hash} settings
 * @return {React Component} A style tag
 */
const Styles = React.createClass({
  propTypes: {
    scope: React.PropTypes.string.isRequired,
    settings: React.PropTypes.object.isRequired,
  },

  getDefaultProps() {
    return {
      styles: {},
    };
  },

  getSelector() {
    return `.${this.props.scope}`;
  },

  getStyles() {
    const {
      primary_color: primary,
    } = this.props.settings;

    const primaryTextColor = color(primary).darken(0.5).dark() ? 'white' : '#444';
    const primaryFilet = color(primary).alpha(0.8).hslString();
    return {
      primaryText: {
        normal: {
          color: primary,
        },
      },
      boxShadowFilet: {
        normal: {
          boxShadow: `0 0 0 2px ${primaryFilet}`,
        },
      },
      primaryBackground: {
        'normal': {
          backgroundColor: primary,
          color: primaryTextColor,
        },
        ':link': {
          color: primaryTextColor,
          backgroundColor: primary,
        },
        ':visited': {
          color: primaryTextColor,
          backgroundColor: primary,
        },
        ':active': {
          color: primaryTextColor,
          backgroundColor: color(primary).darken(0.2).hexString(),
        },
        ':hover': {
          color: primaryTextColor,
          backgroundColor: color(primary).darken(0.2).hexString(),
        },
        ':focus': {
          color: primaryTextColor,
          backgroundColor: color(primary).darken(0.2).hexString(),
        },
      },
    };
  },

  getRules() {
    const styles = this.getStyles();

    // Search for each class in the mixins.css file, and apply every override we have stored in this component.
    return _.reduce(mixins, function(hash, cls, name) {
      const style = styles[name];
      if (!style) { return hash; }
      _.each(cls.split(' '), function(publicName) {
        if (!hash[`.${publicName}`]) {
          _.each(style, function(rule, key) {
            if (key === 'normal') {
              hash[`.${publicName}`] = rule;
            } else {
              hash[`.${publicName}${key}`] = rule;
            }
          });
        }
      });
      return hash;
    }, {
      [`.${this.props.scope} ::-moz-placeholder`]: styles.placeholder,
      [`.${this.props.scope} input::-moz-placeholder`]: styles.placeholder,
      [`.${this.props.scope} textarea::-moz-placeholder`]: styles.placeholder,

      [`.${this.props.scope} :-ms-input-placeholder`]: styles.placeholder,
      [`.${this.props.scope} input:-ms-input-placeholder`]: styles.placeholder,
      [`.${this.props.scope} textarea:-ms-input-placeholder`]: styles.placeholder,

      [`.${this.props.scope} ::-webkit-input-placeholder`]: styles.placeholder,
      [`.${this.props.scope} input::-webkit-input-placeholder`]: styles.placeholder,
      [`.${this.props.scope} textarea::-webkit-input-placeholder`]: styles.placeholder,

      [`.${this.props.scope} ::-moz-focus-inner`]: { border: 0, padding: 0 },
    });
  },

  render() {
    return <Style rules={this.getRules()} />;
  },
});

export default radium(Styles);
