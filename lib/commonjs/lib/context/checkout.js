"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckoutContext = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = _interopRequireDefault(require("../store/actions/checkout/actions"));

var asyncActions = _interopRequireWildcard(require("../store/actions/checkout/asyncActions"));

var _bindActionCreators = _interopRequireDefault(require("../util/bindActionCreators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const CheckoutContext = /*#__PURE__*/(0, _react.createContext)();

const CheckoutContextProvider = props => {
  const {
    actions,
    asyncActions,
    checkoutState,
    children
  } = props;
  const checkoutApi = (0, _react.useMemo)(() => ({
    actions,
    ...asyncActions
  }), [actions, asyncActions]);
  const contextValue = (0, _react.useMemo)(() => [checkoutState, checkoutApi], [checkoutApi, checkoutState]);
  return /*#__PURE__*/_react.default.createElement(CheckoutContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  checkout
}) => ({
  checkoutState: checkout
});

const mapDispatchToProps = dispatch => ({
  actions: (0, _bindActionCreators.default)(_actions.default, dispatch),
  asyncActions: (0, _bindActionCreators.default)(asyncActions, dispatch)
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CheckoutContextProvider);

exports.default = _default;

const useCheckoutContext = () => (0, _react.useContext)(CheckoutContext);

exports.useCheckoutContext = useCheckoutContext;
//# sourceMappingURL=checkout.js.map