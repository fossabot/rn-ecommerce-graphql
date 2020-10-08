"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Provider = exports.Consumer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _propTypes = require("prop-types");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const {
  Consumer,
  Provider
} = /*#__PURE__*/(0, _react.createContext)();
exports.Provider = Provider;
exports.Consumer = Consumer;

class MagentoRouter extends _react.Component {
  render() {
    const {
      apiBase,
      children,
      routerProps,
      using: Router
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(Router, routerProps, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, null, routeProps => /*#__PURE__*/_react.default.createElement(Provider, {
      value: {
        apiBase,
        ...routeProps
      }
    }, children)));
  }

}

exports.default = MagentoRouter;

_defineProperty(MagentoRouter, "propTypes", {
  apiBase: _propTypes.string.isRequired,
  routerProps: _propTypes.object,
  using: _propTypes.func // e.g., BrowserRouter, MemoryRouter

});

_defineProperty(MagentoRouter, "defaultProps", {
  routerProps: {},
  using: _reactRouterDom.BrowserRouter
});
//# sourceMappingURL=router.js.map