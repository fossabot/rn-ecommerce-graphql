"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useErrorContext = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _app = _interopRequireDefault(require("../store/actions/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ErrorContext = /*#__PURE__*/(0, _react.createContext)();

const ErrorContextProvider = props => {
  const {
    children,
    markErrorHandled,
    unhandledErrors
  } = props;
  const errorApi = (0, _react.useMemo)(() => ({
    markErrorHandled
  }), [markErrorHandled]);
  const contextValue = (0, _react.useMemo)(() => [unhandledErrors, errorApi], [errorApi, unhandledErrors]);
  return /*#__PURE__*/_react.default.createElement(ErrorContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  unhandledErrors
}) => ({
  unhandledErrors
});

const mapDispatchToProps = {
  markErrorHandled: _app.default.markErrorHandled
};

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ErrorContextProvider);

exports.default = _default;

const useErrorContext = () => (0, _react.useContext)(ErrorContext);

exports.useErrorContext = useErrorContext;
//# sourceMappingURL=unhandledErrors.js.map