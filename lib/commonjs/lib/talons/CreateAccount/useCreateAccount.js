"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateAccount = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _user = require("../../../lib/context/user");

var _cart = require("../../../lib/context/cart");

var _useAwaitQuery = require("../../../lib/hooks/useAwaitQuery");

var _clearCartDataFromCache = require("../../Apollo/clearCartDataFromCache");

var _clearCustomerDataFromCache = require("../../Apollo/clearCustomerDataFromCache");

var _cart2 = require("../../store/actions/cart");

/**
 * Returns props necessary to render CreateAccount component. In particular this
 * talon handles the submission flow by first doing a pre-submisson validation
 * and then, on success, invokes the `onSubmit` prop, which is usually the action.
 *
 * @param {CreateAccountQueries} props.queries queries used by the talon
 * @param {CreateAccountMutations} props.mutations mutations used by the talon
 * @param {InitialValues} props.initialValues initial values to sanitize and seed the form
 * @param {Function} props.onSubmit the post submit callback
 * @param {Function} props.onCancel the cancel callback
 *
 * @returns {CreateAccountProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useForgotPassword } from '@magento/peregrine/lib/talons/CreateAccount/useCreateAccount.js';
 */
const useCreateAccount = props => {
  const {
    queries: {
      customerQuery,
      getCartDetailsQuery
    },
    mutations: {
      createAccountMutation,
      createCartMutation,
      signInMutation,
      mergeCartsMutation
    },
    initialValues = {},
    onSubmit,
    onCancel
  } = props;
  const apolloClient = (0, _client.useApolloClient)();
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(false);
  const [{
    cartId
  }, {
    createCart,
    removeCart,
    getCartDetails
  }] = (0, _cart.useCartContext)();
  const [{
    isGettingDetails,
    isSignedIn
  }, {
    getUserDetails,
    setToken
  }] = (0, _user.useUserContext)();
  const [fetchCartId] = (0, _client.useMutation)(createCartMutation);
  const [mergeCarts] = (0, _client.useMutation)(mergeCartsMutation); // For create account and sign in mutations, we don't want to cache any
  // personally identifiable information (PII). So we set fetchPolicy to 'no-cache'.

  const [createAccount, {
    error: createAccountError
  }] = (0, _client.useMutation)(createAccountMutation, {
    fetchPolicy: 'no-cache'
  });
  const [signIn, {
    error: signInError
  }] = (0, _client.useMutation)(signInMutation, {
    fetchPolicy: 'no-cache'
  });
  const fetchUserDetails = (0, _useAwaitQuery.useAwaitQuery)(customerQuery);
  const fetchCartDetails = (0, _useAwaitQuery.useAwaitQuery)(getCartDetailsQuery);
  const handleCancel = (0, _react.useCallback)(() => {
    onCancel();
  }, [onCancel]);
  const handleSubmit = (0, _react.useCallback)(async formValues => {
    setIsSubmitting(true);

    try {
      // Get source cart id (guest cart id).
      const sourceCartId = cartId; // Create the account and then sign in.

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
      await setToken(token); // Clear all cart/customer data from cache and redux.

      await (0, _clearCartDataFromCache.clearCartDataFromCache)(apolloClient);
      await (0, _clearCustomerDataFromCache.clearCustomerDataFromCache)(apolloClient);
      await removeCart(); // Create and get the customer's cart id.

      await createCart({
        fetchCartId
      });
      const destinationCartId = await (0, _cart2.retrieveCartId)(); // Merge the guest cart into the customer cart.

      await mergeCarts({
        variables: {
          destinationCartId,
          sourceCartId
        }
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
  }, [cartId, apolloClient, removeCart, createAccount, signIn, setToken, createCart, fetchCartId, mergeCarts, getUserDetails, fetchUserDetails, getCartDetails, fetchCartDetails, onSubmit]);
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
    handleCancel,
    handleSubmit,
    initialValues: sanitizedInitialValues,
    isDisabled: isSubmitting || isGettingDetails,
    isSignedIn
  };
};
/** JSDocs type definitions */

/**
 * GraphQL queries for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} CreateAccountQueries
 *
 * @property {GraphQLAST} customerQuery query to fetch customer details
 * @property {GraphQLAST} getCartDetailsQuery query to get cart details
 */

/**
 * GraphQL mutations for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} CreateAccountMutations
 *
 * @property {GraphQLAST} createAccountMutation mutation for creating new account
 * @property {GraphQLAST} createCartMutation mutation for creating new cart
 * @property {GraphQLAST} mergeCartsMutation mutation for merging carts
 * @property {GraphQLAST} signInMutation mutation for signing
 */

/**
 * Initial values for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} InitialValues
 *
 * @property {String} email email id of the user
 * @property {String} firstName first name of the user
 * @property {String} lastName last name of the user
 */

/**
 * Sanitized initial values for the create account form.
 * This is a type used by the {@link useCreateAccount} talon.
 *
 * @typedef {Object} SanitizedInitialValues
 *
 * @property {String} email email id of the user
 * @property {String} firstname first name of the user
 * @property {String} lastname last name of the user
 */

/**
 * Object type returned by the {@link useCreateAccount} talon.
 * It provides props data to use when rendering the create account form component.
 *
 * @typedef {Object} CreateAccountProps
 *
 * @property {Map} errors a map of errors to their respective mutations
 * @property {Function} handleCancel callback function to handle form cancellations
 * @property {Function} handleSubmit callback function to handle form submission
 * @property {SanitizedInitialValues} initialValues initial values for the create account form
 * @property {Boolean} isDisabled true if either details are being fetched or form is being submitted. False otherwise.
 * @property {Boolean} isSignedIn true if user is signed in. False otherwise.
 */


exports.useCreateAccount = useCreateAccount;
//# sourceMappingURL=useCreateAccount.js.map