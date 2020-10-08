"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuthBar = void 0;

var _react = require("react");

var _user = require("../../context/user");

/**
 * Returns props necessary to render an AuthBar component.
 *
 * @param {object} props
 * @param {boolean} props.disabled - whether sign in button should be disabled
 * @param {function} props.showMyAccount - callback that displays my account view
 * @param {function} props.showSignIn - callback that displays sign in view
 * @return {{
 *   handleShowMyAccount: function,
 *   handleSignIn: function,
 *   isDisabled: boolean
 *   isUserSignedIn: boolean
 * }}
 */
const useAuthBar = props => {
  const {
    disabled,
    showMyAccount,
    showSignIn
  } = props;
  const [{
    isSignedIn: isUserSignedIn
  }] = (0, _user.useUserContext)();
  const handleSignIn = (0, _react.useCallback)(() => {
    showSignIn();
  }, [showSignIn]);
  const handleShowMyAccount = (0, _react.useCallback)(() => {
    showMyAccount();
  }, [showMyAccount]);
  return {
    handleShowMyAccount,
    handleSignIn,
    isDisabled: disabled,
    isUserSignedIn
  };
};

exports.useAuthBar = useAuthBar;
//# sourceMappingURL=useAuthBar.js.map