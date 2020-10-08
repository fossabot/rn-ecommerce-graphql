"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSignIn = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("../../store/actions/cart");

var _user = require("../../context/user");

var _cart2 = require("../../context/cart");

var _useAwaitQuery = require("../../hooks/useAwaitQuery");

var _clearCartDataFromCache = require("../../Apollo/clearCartDataFromCache");

var _clearCustomerDataFromCache = require("../../Apollo/clearCustomerDataFromCache");

const useSignIn = props => {
  const {
    createCartMutation,
    customerQuery,
    getCartDetailsQuery,
    mergeCartsMutation,
    setDefaultUsername,
    showCreateAccount,
    showForgotPassword,
    signInMutation
  } = props;
  const apolloClient = (0, _client.useApolloClient)();
  const [isSigningIn, setIsSigningIn] = (0, _react.useState)(false);
  const [{
    cartId
  }, {
    createCart,
    removeCart,
    getCartDetails
  }] = (0, _cart2.useCartContext)();
  const [{
    isGettingDetails,
    getDetailsError
  }, {
    getUserDetails,
    setToken
  }] = (0, _user.useUserContext)();
  const [signIn, {
    error: signInError
  }] = (0, _client.useMutation)(signInMutation, {
    fetchPolicy: 'no-cache'
  });
  const [fetchCartId] = (0, _client.useMutation)(createCartMutation);
  const [mergeCarts] = (0, _client.useMutation)(mergeCartsMutation);
  const fetchUserDetails = (0, _useAwaitQuery.useAwaitQuery)(customerQuery);
  const fetchCartDetails = (0, _useAwaitQuery.useAwaitQuery)(getCartDetailsQuery);
  const formApiRef = (0, _react.useRef)(null);
  const setFormApi = (0, _react.useCallback)(api => formApiRef.current = api, []);
  const handleSubmit = (0, _react.useCallback)(async ({
    email,
    password
  }) => {
    setIsSigningIn(true);

    try {
      // Get source cart id (guest cart id).
      const sourceCartId = cartId; // Sign in and set the token.

      const signInResponse = await signIn({
        variables: {
          email,
          password
        }
      });
      const token = signInResponse.data.generateCustomerToken.token;
      await setToken(token); // Clear all cart/customer data from cache and redux.

      await (0, _clearCartDataFromCache.clearCartDataFromCache)(apolloClient);
      await (0, _clearCustomerDataFromCache.clearCustomerDataFromCache)(apolloClient);
      await removeCart(); // Create and get the customer's cart id.

      await createCart({
        fetchCartId
      });
      const destinationCartId = await (0, _cart.retrieveCartId)(); // Merge the guest cart into the customer cart.

      await mergeCarts({
        variables: {
          destinationCartId,
          sourceCartId
        }
      }); // Ensure old stores are updated with any new data.

      getUserDetails({
        fetchUserDetails
      });
      getCartDetails({
        fetchCartId,
        fetchCartDetails
      });
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }

      setIsSigningIn(false);
    }
  }, [cartId, apolloClient, removeCart, signIn, setToken, createCart, fetchCartId, mergeCarts, getUserDetails, fetchUserDetails, getCartDetails, fetchCartDetails]);
  const handleForgotPassword = (0, _react.useCallback)(() => {
    const {
      current: formApi
    } = formApiRef;

    if (formApi) {
      setDefaultUsername(formApi.getValue('email'));
    }

    showForgotPassword();
  }, [setDefaultUsername, showForgotPassword]);
  const handleCreateAccount = (0, _react.useCallback)(() => {
    const {
      current: formApi
    } = formApiRef;

    if (formApi) {
      setDefaultUsername(formApi.getValue('email'));
    }

    showCreateAccount();
  }, [setDefaultUsername, showCreateAccount]);
  const errors = (0, _react.useMemo)(() => new Map([['getUserDetailsQuery', getDetailsError], ['signInMutation', signInError]]), [getDetailsError, signInError]);
  return {
    errors,
    handleCreateAccount,
    handleForgotPassword,
    handleSubmit,
    isBusy: isGettingDetails || isSigningIn,
    setFormApi
  };
};

exports.useSignIn = useSignIn;
//# sourceMappingURL=useSignIn.js.map