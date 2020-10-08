function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component, createContext } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { func, object, string } from 'prop-types';
export const {
  Consumer,
  Provider
} = /*#__PURE__*/createContext();
export default class MagentoRouter extends Component {
  render() {
    const {
      apiBase,
      children,
      routerProps,
      using: Router
    } = this.props;
    return /*#__PURE__*/React.createElement(Router, routerProps, /*#__PURE__*/React.createElement(Route, null, routeProps => /*#__PURE__*/React.createElement(Provider, {
      value: {
        apiBase,
        ...routeProps
      }
    }, children)));
  }

}

_defineProperty(MagentoRouter, "propTypes", {
  apiBase: string.isRequired,
  routerProps: object,
  using: func // e.g., BrowserRouter, MemoryRouter

});

_defineProperty(MagentoRouter, "defaultProps", {
  routerProps: {},
  using: BrowserRouter
});
//# sourceMappingURL=router.js.map