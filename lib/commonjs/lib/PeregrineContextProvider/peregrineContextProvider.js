"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _app = _interopRequireDefault(require("../context/app"));

var _cart = _interopRequireDefault(require("../context/cart"));

var _catalog = _interopRequireDefault(require("../context/catalog"));

var _checkout = _interopRequireDefault(require("../context/checkout"));

var _unhandledErrors = _interopRequireDefault(require("../context/unhandledErrors"));

var _user = _interopRequireDefault(require("../context/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * List of essential context providers that are required to run Peregrine
 *
 * @property {React.Component[]} contextProviders
 */
const contextProviders = [_unhandledErrors.default, _app.default, _user.default, _catalog.default, _cart.default, _checkout.default];

const PeregrineContextProvider = ({
  children
}) => {
  return contextProviders.reduceRight((memo, ContextProvider) => {
    return /*#__PURE__*/_react.default.createElement(ContextProvider, null, memo);
  }, children);
};

var _default = PeregrineContextProvider;
exports.default = _default;
//# sourceMappingURL=peregrineContextProvider.js.map