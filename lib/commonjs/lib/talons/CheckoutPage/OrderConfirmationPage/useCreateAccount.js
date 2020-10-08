"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateAccount = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _user = require("../../../../lib/context/user");

var _cart = require("../../../../lib/context/cart");

var _useAwaitQuery = require("../../../../lib/hooks/useAwaitQuery");

/**
 * Returns props necessary to render CreateAccount component. In particular this
 * talon handles the submission flow by first doing a pre-submisson validation
 * and then, on success, invokes the `onSubmit` prop, which is usually the action.
 *
 * This talon is almost identical to the other useCreateAccount but does not
 * return `isSignedIn`.
 *
 * @param {Object} props.initialValues initial values to sanitize and seed the form
 * @param {Function} props.onSubmit the post submit callback
 * @param {String} createAccountQuery the graphql query for creating the account
 * @param {String} signInQuery the graphql query for logging in the user (and obtaining the token)
 * @returns {{
 *   errors: Map,
 *   handleSubmit: function,
 *   isDisabled: boolean,
 *   initialValues: object
 * }}
 */
const useCreateAccount = props => {
  const {
    queries: {
      createAccountQuery,
      customerQuery,
      getCartDetailsQuery
    },
    mutations: {
      createCartMutation,
      signInMutation
    },
    initialValues = {},
    onSubmit
  } = props;
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(false);
  const [, {
    createCart,
    getCartDetails,
    removeCart
  }] = (0, _cart.useCartContext)();
  const [{
    isGettingDetails
  }, {
    getUserDetails,
    setToken
  }] = (0, _user.useUserContext)();
  const [fetchCartId] = (0, _client.useMutation)(createCartMutation); // For create account and sign in mutations, we don't want to cache any
  // personally identifiable information (PII). So we set fetchPolicy to 'no-cache'.

  const [createAccount, {
    error: createAccountError
  }] = (0, _client.useMutation)(createAccountQuery, {
    fetchPolicy: 'no-cache'
  });
  const [signIn, {
    error: signInError
  }] = (0, _client.useMutation)(signInMutation, {
    fetchPolicy: 'no-cache'
  });
  const fetchUserDetails = (0, _useAwaitQuery.useAwaitQuery)(customerQuery);
  const fetchCartDetails = (0, _useAwaitQuery.useAwaitQuery)(getCartDetailsQuery);
  const handleSubmit = (0, _react.useCallback)(async formValues => {
    setIsSubmitting(true);

    try {
      // Create the account and then sign in.
      await createAccount({
        variables: {
          email: formValues.customer.email,
          firstname: formValues.customer.firstname,
          lastname: formValues.customer.lastname,
          password: formValues.password,
          is_subscribed: !!formValues.subscribe
        }
      });
      const signInResponse = await signIn({
        variables: {
          email: formValues.customer.email,
          password: formValues.password
        }
      });
      const token = signInResponse.data.generateCustomerToken.token;
      await setToken(token); // Clear guest cart from redux.

      await removeCart(); // Create a new customer cart.

      await createCart({
        fetchCartId
      }); // Ensure old stores are updated with any new data.

      await getUserDetails({
        fetchUserDetails
      });
      await getCartDetails({
        fetchCartId,
        fetchCartDetails
      }); // Finally, invoke the post-submission callback.

      if (onSubmit) {
        onSubmit();
      }
    } catch (error) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(error);
      }

      setIsSubmitting(false);
    }
  }, [createAccount, createCart, fetchCartDetails, fetchCartId, fetchUserDetails, getCartDetails, getUserDetails, onSubmit, removeCart, setToken, signIn]);
  const sanitizedInitialValues = (0, _react.useMemo)(() => {
    const {
      email,
      firstName,
      lastName,
      ...rest
    } = initialValues;
    return {
      customer: {
        email,
        firstname: firstName,
        lastname: lastName
      },
      ...rest
    };
  }, [initialValues]);
  const errors = (0, _react.useMemo)(() => new Map([['createAccountQuery', createAccountError], ['signInMutation', signInError]]), [createAccountError, signInError]);
  return {
    errors,
    handleSubmit,
    isDisabled: isSubmitting || isGettingDetails,
    initialValues: sanitizedInitialValues
  };
};

exports.useCreateAccount = useCreateAccount;
//# sourceMappingURL=useCreateAccount.js.map