"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAuthModal = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _client = require("@apollo/client");

var _user = require("../../context/user");

var _clearCartDataFromCache = require("../../Apollo/clearCartDataFromCache");

var _clearCustomerDataFromCache = require("../../Apollo/clearCustomerDataFromCache");

const UNAUTHED_ONLY = ['CREATE_ACCOUNT', 'FORGOT_PASSWORD', 'SIGN_IN'];
/**
 * Returns props necessary to render an AuthModal component.
 *
 * @param {object} props
 * @param {function} props.closeDrawer - callback that closes drawer
 * @param {function} props.showCreateAccount - callback that shows create account view
 * @param {function} props.showForgotPassword - callback that shows forgot password view
 * @param {function} props.showMainMenu - callback that shows main menu view
 * @param {function} props.showMyAccount - callback that shows my account view
 * @param {function} props.showSignIn - callback that shows signin view
 * @param {DocumentNode} props.signOutMutation - mutation to call when signing out
 * @param {string} props.view - string that represents the current view
 *
 * @return {{
 *  handleClose: function,
 *  handleCreateAccount: function,
 *  handleSignOut: function,
 *  setUsername: function,
 *  showCreateAccount: function,
 *  showForgotPassword: function,
 *  showMyAccount: function,
 *  username: string
 * }}
 */

const useAuthModal = props => {
  const {
    closeDrawer,
    showCreateAccount,
    showForgotPassword,
    showMainMenu,
    showMyAccount,
    showSignIn,
    signOutMutation,
    view
  } = props;
  const apolloClient = (0, _client.useApolloClient)();
  const [isSigningOut, setIsSigningOut] = (0, _react.useState)(false);
  const [username, setUsername] = (0, _react.useState)('');
  const [{
    currentUser,
    isSignedIn
  }, {
    signOut
  }] = (0, _user.useUserContext)();
  const [revokeToken] = (0, _client.useMutation)(signOutMutation);
  const history = (0, _reactRouterDom.useHistory)(); // If the user is authed, the only valid view is "MY_ACCOUNT".
  // view an also be `MENU` but in that case we don't want to act.

  (0, _react.useEffect)(() => {
    if (currentUser && currentUser.email && UNAUTHED_ONLY.includes(view)) {
      showMyAccount();
    }
  }, [currentUser, showMyAccount, view]); // If the user token was invalidated by way of expiration, we need to reset
  // the view back to the main menu.

  (0, _react.useEffect)(() => {
    if (!isSignedIn && view === 'MY_ACCOUNT' && !isSigningOut) {
      showMainMenu();
    }
  }, [isSignedIn, isSigningOut, showMainMenu, view]);
  const handleClose = (0, _react.useCallback)(() => {
    showMainMenu();
    closeDrawer();
  }, [closeDrawer, showMainMenu]);
  const handleCancel = (0, _react.useCallback)(() => {
    showSignIn();
  }, [showSignIn]);
  const handleCreateAccount = (0, _react.useCallback)(() => {
    showMyAccount();
  }, [showMyAccount]);
  const handleSignOut = (0, _react.useCallback)(async () => {
    setIsSigningOut(true); // Delete cart/user data from the redux store.

    await signOut({
      revokeToken
    });
    await (0, _clearCartDataFromCache.clearCartDataFromCache)(apolloClient);
    await (0, _clearCustomerDataFromCache.clearCustomerDataFromCache)(apolloClient); // Refresh the page as a way to say "re-initialize". An alternative
    // would be to call apolloClient.resetStore() but that would require
    // a large refactor.

    history.go(0);
  }, [apolloClient, history, revokeToken, signOut]);
  return {
    handleCancel,
    handleClose,
    handleCreateAccount,
    handleSignOut,
    setUsername,
    showCreateAccount,
    showForgotPassword,
    showMyAccount,
    username
  };
};

exports.useAuthModal = useAuthModal;
//# sourceMappingURL=useAuthModal.js.map