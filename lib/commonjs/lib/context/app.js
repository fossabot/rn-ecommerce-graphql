"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAppContext = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = _interopRequireDefault(require("../store/actions/app/actions"));

var asyncActions = _interopRequireWildcard(require("../store/actions/app/asyncActions"));

var _bindActionCreators = _interopRequireDefault(require("../util/bindActionCreators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const AppContext = /*#__PURE__*/(0, _react.createContext)();

const AppContextProvider = props => {
  const {
    actions,
    appState,
    asyncActions,
    children
  } = props;
  const appApi = (0, _react.useMemo)(() => ({
    actions,
    ...asyncActions
  }), [actions, asyncActions]);
  const contextValue = (0, _react.useMemo)(() => [appState, appApi], [appApi, appState]);
  return /*#__PURE__*/_react.default.createElement(AppContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  app
}) => ({
  appState: app
});

const mapDispatchToProps = dispatch => ({
  actions: (0, _bindActionCreators.default)(_actions.default, dispatch),
  asyncActions: (0, _bindActionCreators.default)(asyncActions, dispatch)
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(AppContextProvider);

exports.default = _default;

const useAppContext = () => (0, _react.useContext)(AppContext);

exports.useAppContext = useAppContext;
//# sourceMappingURL=app.js.map