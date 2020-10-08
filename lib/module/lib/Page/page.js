function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { MagentoRouteHandler, RouteConsumer } from '../Router';
export default class Page extends Component {
  render() {
    const {
      props
    } = this;
    return /*#__PURE__*/React.createElement(RouteConsumer, null, context => /*#__PURE__*/React.createElement(MagentoRouteHandler, _extends({}, props, context)));
  }

}
//# sourceMappingURL=page.js.map