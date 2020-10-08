"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePaymentInformation = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _app = require("../../../context/app");

var _cart = require("../../../context/cart");

var _CheckoutError = _interopRequireDefault(require("../CheckoutError"));

var _useCheckoutPage = require("../useCheckoutPage");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *
 * @param {Function} props.onSave callback to be called when user clicks review order button
 * @param {Object} props.checkoutError an instance of the `CheckoutError` error that has been generated using the error from the place order mutation
 * @param {DocumentNode} props.queries.getPaymentNonceQuery query to fetch and/or clear payment nonce from cache
 * @param {Boolean} props.shouldSubmit property telling us to proceed to next step
 * @param {Function} props.resetShouldSubmit callback to reset the review order button flag
 * @param {DocumentNode} props.queries.getPaymentInformation query to fetch data to render this component
 * @param {DocumentNode} props.mutation.setBillingAddressMutation
 * @param {DocumentNode} props.mutation.setFreePaymentMethodMutation
 *
 * @returns {
 *   doneEditing: Boolean,
 *   isEditModalActive: Boolean,
 *   showEditModal: Function,
 *   hideEditModal: Function,
 *   handlePaymentError: Function,
 *   handlePaymentSuccess: Function,
 *   checkoutStep: Number,
 *
 * }
 */
const usePaymentInformation = props => {
  const {
    mutations,
    onSave,
    checkoutError,
    queries,
    resetShouldSubmit,
    setCheckoutStep,
    shouldSubmit
  } = props;
  const {
    setFreePaymentMethodMutation,
    setBillingAddressMutation
  } = mutations;
  const {
    getPaymentInformation,
    getPaymentNonceQuery
  } = queries;
  /**
   * Definitions
   */

  const [doneEditing, setDoneEditing] = (0, _react.useState)(false);
  const [{
    drawer
  }, {
    toggleDrawer,
    closeDrawer
  }] = (0, _app.useAppContext)();
  const isEditModalActive = drawer === 'edit.payment';
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const client = (0, _client.useApolloClient)();
  /**
   * Helper Functions
   */

  const showEditModal = (0, _react.useCallback)(() => {
    toggleDrawer('edit.payment');
  }, [toggleDrawer]);
  const hideEditModal = (0, _react.useCallback)(() => {
    closeDrawer('edit.payment');
  }, [closeDrawer]);
  const handlePaymentSuccess = (0, _react.useCallback)(() => {
    setDoneEditing(true);

    if (onSave) {
      onSave();
    }
  }, [onSave]);
  const handlePaymentError = (0, _react.useCallback)(() => {
    resetShouldSubmit();
    setDoneEditing(false);
  }, [resetShouldSubmit]);
  /**
   * Queries
   */

  const {
    data: paymentInformationData,
    loading: paymentInformationLoading
  } = (0, _client.useQuery)(getPaymentInformation, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !cartId,
    variables: {
      cartId
    }
  });
  const [setFreePaymentMethod, {
    loading: setFreePaymentMethodLoading
  }] = (0, _client.useMutation)(setFreePaymentMethodMutation);
  const clearPaymentDetails = (0, _react.useCallback)(() => {
    client.writeQuery({
      query: getPaymentNonceQuery,
      data: {
        cart: {
          __typename: 'Cart',
          id: cartId,
          paymentNonce: null
        }
      }
    });
  }, [cartId, client, getPaymentNonceQuery]);
  const [setBillingAddress] = (0, _client.useMutation)(setBillingAddressMutation); // We must wait for payment method to be set if this is the first time we
  // are hitting this component and the total is $0. If we don't wait then
  // the CC component will mount while the setPaymentMethod mutation is in flight.

  const isLoading = paymentInformationLoading || setFreePaymentMethodLoading;
  /**
   * Effects
   */

  const availablePaymentMethods = paymentInformationData ? paymentInformationData.cart.available_payment_methods : [];
  const selectedPaymentMethod = paymentInformationData && paymentInformationData.cart.selected_payment_method.code || null; // Whenever selected payment method is no longer an available method we
  // should reset to the payment step to force the user to select again.

  (0, _react.useEffect)(() => {
    if (!availablePaymentMethods.find(({
      code
    }) => code === selectedPaymentMethod)) {
      resetShouldSubmit();
      setCheckoutStep(_useCheckoutPage.CHECKOUT_STEP.PAYMENT);
      setDoneEditing(false);
    }
  }, [availablePaymentMethods, resetShouldSubmit, selectedPaymentMethod, setCheckoutStep]); // If free is ever available and not selected, automatically select it.

  (0, _react.useEffect)(() => {
    const setFreeIfAvailable = async () => {
      const freeIsAvailable = !!availablePaymentMethods.find(({
        code
      }) => code === 'free');

      if (freeIsAvailable) {
        if (selectedPaymentMethod !== 'free') {
          await setFreePaymentMethod({
            variables: {
              cartId
            }
          });
          setDoneEditing(true);
        } else {
          setDoneEditing(true);
        }
      }
    };

    setFreeIfAvailable();
  }, [availablePaymentMethods, cartId, selectedPaymentMethod, setDoneEditing, setFreePaymentMethod]);
  const shippingAddressOnCart = paymentInformationData && paymentInformationData.cart.shipping_addresses.length && paymentInformationData.cart.shipping_addresses[0] || null; // If the selected payment method is "free" keep the shipping address
  // synced with billing address.This _requires_ the UI does not allow payment
  // information before shipping address.

  (0, _react.useEffect)(() => {
    if (selectedPaymentMethod === 'free' && shippingAddressOnCart) {
      const {
        firstname,
        lastname,
        street,
        city,
        region,
        postcode,
        country,
        telephone
      } = shippingAddressOnCart;
      const regionCode = region.code;
      const countryCode = country.code;
      setBillingAddress({
        variables: {
          cartId,
          firstname,
          lastname,
          street,
          city,
          regionCode,
          postcode,
          countryCode,
          telephone
        }
      });
    }
  }, [cartId, selectedPaymentMethod, setBillingAddress, shippingAddressOnCart]); // When the "review order" button is clicked, if the selected method is free
  // and free is still available, proceed.

  (0, _react.useEffect)(() => {
    if (shouldSubmit && availablePaymentMethods.find(({
      code
    }) => code === 'free') && selectedPaymentMethod === 'free') {
      onSave();
    }
  });
  const handleExpiredPaymentError = (0, _react.useCallback)(() => {
    setDoneEditing(false);
    clearPaymentDetails({
      variables: {
        cartId
      }
    });
    resetShouldSubmit();
    setCheckoutStep(_useCheckoutPage.CHECKOUT_STEP.PAYMENT);
  }, [resetShouldSubmit, setCheckoutStep, clearPaymentDetails, cartId]);
  (0, _react.useEffect)(() => {
    if (checkoutError instanceof _CheckoutError.default && checkoutError.hasPaymentExpired()) {
      handleExpiredPaymentError();
    }
  }, [checkoutError, handleExpiredPaymentError]);
  return {
    doneEditing,
    isEditModalActive,
    isLoading,
    handlePaymentError,
    handlePaymentSuccess,
    hideEditModal,
    showEditModal
  };
};

exports.usePaymentInformation = usePaymentInformation;
//# sourceMappingURL=usePaymentInformation.js.map