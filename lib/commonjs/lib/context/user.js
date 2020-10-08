"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useUserContext = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _actions = _interopRequireDefault(require("../store/actions/user/actions"));

var asyncActions = _interopRequireWildcard(require("../store/actions/user/asyncActions"));

var _bindActionCreators = _interopRequireDefault(require("../util/bindActionCreators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const UserContext = /*#__PURE__*/(0, _react.createContext)();

const UserContextProvider = props => {
  const {
    actions,
    asyncActions,
    children,
    userState
  } = props;
  const userApi = (0, _react.useMemo)(() => ({
    actions,
    ...asyncActions
  }), [actions, asyncActions]);
  const contextValue = (0, _react.useMemo)(() => [userState, userApi], [userApi, userState]);
  return /*#__PURE__*/_react.default.createElement(UserContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  user
}) => ({
  userState: user
});

const mapDispatchToProps = dispatch => ({
  actions: (0, _bindActionCreators.default)(_actions.default, dispatch),
  asyncActions: (0, _bindActionCreators.default)(asyncActions, dispatch)
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserContextProvider);
/**
 * @typedef {Object} UserState
 *
 * @property {CurrentUser} currentUser Current user details
 * @property {Error} getDetailsError Get Details call related error
 * @property {Boolean} isGettingDetails Boolean if true indicates that user details are being fetched. False otherwise.
 * @property {Boolean} isResettingPassword Deprecated
 * @property {Boolean} isSignedIn Boolean if true indicates that the user is signed in. False otherwise.
 * @property {Error} resetPasswordError Deprecated
 *
 */

/**
 * @typedef {Object} CurrentUser
 *
 * @property {String} email Current user's email
 * @property {String} firstname Current user's first name
 * @property {String} lastname Current user's last name
 */

/**
 * @typedef {Object} UserActions
 *
 * @property {Function} clearToken Callback to clear user token in browser persistence storage
 * @property {Function} getUserDetails Callback to get user details
 * @property {Function} resetPassword Deprecated
 * @property {Function} setToken Callback to set user token in browser persistence storage
 * @property {Function} signOut Callback to sign the user out
 */

/**
 * @returns {[UserState, UserActions]}
 */


exports.default = _default;

const useUserContext = () => (0, _react.useContext)(UserContext);

exports.useUserContext = useUserContext;
//# sourceMappingURL=user.js.map