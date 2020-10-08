"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccountMenu = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _client = require("@apollo/client");

var _user = require("@magento/peregrine/lib/context/user");

var _clearCartDataFromCache = require("@magento/peregrine/lib/Apollo/clearCartDataFromCache");

var _clearCustomerDataFromCache = require("@magento/peregrine/lib/Apollo/clearCustomerDataFromCache");

/**
 * The useAccountMenu talon complements the AccountMenu component.
 *
 * @param {Object} props
 * @param {DocumentNode} props.mutations.signOutMutation - Mutation to be called for signout.
 * @param {Boolean} props.accountMenuIsOpen - Boolean to notify if the account menu dropdown is open.
 * @param {Function} props.setAccountMenuIsOpen - Function to set the value of accountMenuIsOpen
 *
 * @returns {Object}    talonProps
 * @returns {String}    talonProps.view - Current view.
 * @returns {String}  talonProps.username - Username of the current user trying to login / logged in.
 * @returns {Boolean}   talonProps.isUserSignedIn - Boolean to notify if the user is signed in.
 * @returns {Function}  talonProps.handleSignOut - Function to handle the signout workflow.
 * @returns {Function}  talonProps.handleForgotPassword - Function to handle forgot password workflow.
 * @returns {Function}  talonProps.handleCreateAccount - Function to handle create account workflow.
 * @returns {Function}  talonProps.setUsername - Function to set the username.
 */
const useAccountMenu = props => {
  const {
    mutations,
    accountMenuIsOpen,
    setAccountMenuIsOpen
  } = props;
  const {
    signOut: signOutMutation
  } = mutations;
  const [view, setView] = (0, _react.useState)('SIGNIN');
  const [username, setUsername] = (0, _react.useState)('');
  const apolloClient = (0, _client.useApolloClient)();
  const history = (0, _reactRouterDom.useHistory)();
  const location = (0, _reactRouterDom.useLocation)();
  const [revokeToken] = (0, _client.useMutation)(signOutMutation);
  const [{
    isSignedIn: isUserSignedIn
  }, {
    signOut
  }] = (0, _user.useUserContext)();
  const handleSignOut = (0, _react.useCallback)(async () => {
    setView('SIGNIN');
    setAccountMenuIsOpen(false); // Delete cart/user data from the redux store.

    await signOut({
      revokeToken
    });
    await (0, _clearCartDataFromCache.clearCartDataFromCache)(apolloClient);
    await (0, _clearCustomerDataFromCache.clearCustomerDataFromCache)(apolloClient); // Refresh the page as a way to say "re-initialize". An alternative
    // would be to call apolloClient.resetStore() but that would require
    // a large refactor.

    history.go(0);
  }, [apolloClient, history, revokeToken, setAccountMenuIsOpen, signOut]);
  const handleForgotPassword = (0, _react.useCallback)(() => {
    setView('FORGOT_PASSWORD');
  }, []);
  const handleCancel = (0, _react.useCallback)(() => {
    setView('SIGNIN');
  }, []);
  const handleCreateAccount = (0, _react.useCallback)(() => {
    setView('CREATE_ACCOUNT');
  }, []);
  const handleAccountCreation = (0, _react.useCallback)(() => {
    setView('ACCOUNT');
  }, []); // Close the Account Menu on page change.
  // This includes even when the page "changes" to the current page.
  // This can happen when clicking on a link to a page you're already on, for example.

  (0, _react.useEffect)(() => {
    setAccountMenuIsOpen(false);
  }, [location, setAccountMenuIsOpen]); // Update view based on user status everytime accountMenuIsOpen has changed.

  (0, _react.useEffect)(() => {
    if (isUserSignedIn) {
      setView('ACCOUNT');
    } else {
      setView('SIGNIN');
    }
  }, [accountMenuIsOpen, isUserSignedIn]);
  return {
    handleAccountCreation,
    handleCreateAccount,
    handleForgotPassword,
    handleCancel,
    handleSignOut,
    updateUsername: setUsername,
    username,
    view
  };
};

exports.useAccountMenu = useAccountMenu;
//# sourceMappingURL=useAccountMenu.js.map