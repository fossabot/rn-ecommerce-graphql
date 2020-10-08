"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCheckoutPage = exports.CHECKOUT_STEP = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _clearCartDataFromCache = require("../../Apollo/clearCartDataFromCache");

var _app = require("../../context/app");

var _user = require("../../context/user");

var _cart = require("../../context/cart");

var _CheckoutError = _interopRequireDefault(require("./CheckoutError"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CHECKOUT_STEP = {
  SHIPPING_ADDRESS: 1,
  SHIPPING_METHOD: 2,
  PAYMENT: 3,
  REVIEW: 4
};
exports.CHECKOUT_STEP = CHECKOUT_STEP;

const useCheckoutPage = props => {
  const {
    mutations: {
      createCartMutation,
      placeOrderMutation
    },
    queries: {
      getCheckoutDetailsQuery,
      getCustomerQuery,
      getOrderDetailsQuery
    }
  } = props;
  const [reviewOrderButtonClicked, setReviewOrderButtonClicked] = (0, _react.useState)(false);
  const apolloClient = (0, _client.useApolloClient)();
  const [isUpdating, setIsUpdating] = (0, _react.useState)(false);
  const [activeContent, setActiveContent] = (0, _react.useState)('checkout');
  const [checkoutStep, setCheckoutStep] = (0, _react.useState)(CHECKOUT_STEP.SHIPPING_ADDRESS);
  const [, {
    toggleDrawer
  }] = (0, _app.useAppContext)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const [{
    cartId
  }, {
    createCart,
    removeCart
  }] = (0, _cart.useCartContext)();
  const [fetchCartId] = (0, _client.useMutation)(createCartMutation);
  const [placeOrder, {
    data: placeOrderData,
    error: placeOrderError,
    loading: placeOrderLoading,
    called: placeOrderCalled
  }] = (0, _client.useMutation)(placeOrderMutation);
  const [getOrderDetails, {
    data: orderDetailsData,
    loading: orderDetailsLoading
  }] = (0, _client.useLazyQuery)(getOrderDetailsQuery, {
    // We use this query to fetch details _just_ before submission, so we
    // want to make sure it is fresh. We also don't want to cache this data
    // because it may contain PII.
    fetchPolicy: 'no-cache'
  });
  const {
    data: customerData,
    loading: customerLoading
  } = (0, _client.useQuery)(getCustomerQuery, {
    skip: !isSignedIn
  });
  const {
    data: checkoutData,
    networkStatus: checkoutQueryNetworkStatus
  } = (0, _client.useQuery)(getCheckoutDetailsQuery, {
    /**
     * Skip fetching checkout details if the `cartId`
     * is a falsy value.
     */
    skip: !cartId,
    notifyOnNetworkStatusChange: true,
    variables: {
      cartId
    }
  });
  const cartItems = (0, _react.useMemo)(() => {
    return checkoutData && checkoutData.cart.items || [];
  }, [checkoutData]);
  /**
   * For more info about network statues check this out
   *
   * https://www.apollographql.com/docs/react/data/queries/#inspecting-loading-states
   */

  const isLoading = (0, _react.useMemo)(() => {
    const checkoutQueryInFlight = checkoutQueryNetworkStatus ? checkoutQueryNetworkStatus < 7 : true;
    return checkoutQueryInFlight || customerLoading;
  }, [checkoutQueryNetworkStatus, customerLoading]);
  const customer = customerData && customerData.customer;
  const toggleActiveContent = (0, _react.useCallback)(() => {
    const nextContentState = activeContent === 'checkout' ? 'addressBook' : 'checkout';
    setActiveContent(nextContentState);
  }, [activeContent]);
  const checkoutError = (0, _react.useMemo)(() => {
    if (placeOrderError) {
      return new _CheckoutError.default(placeOrderError);
    }
  }, [placeOrderError]);
  const handleSignIn = (0, _react.useCallback)(() => {
    // TODO: set navigation state to "SIGN_IN". useNavigation:showSignIn doesn't work.
    toggleDrawer('nav');
  }, [toggleDrawer]);
  const handleReviewOrder = (0, _react.useCallback)(() => {
    setReviewOrderButtonClicked(true);
  }, []);
  const resetReviewOrderButtonClicked = (0, _react.useCallback)(() => {
    setReviewOrderButtonClicked(false);
  }, [setReviewOrderButtonClicked]);
  const setShippingInformationDone = (0, _react.useCallback)(() => {
    if (checkoutStep === CHECKOUT_STEP.SHIPPING_ADDRESS) {
      setCheckoutStep(CHECKOUT_STEP.SHIPPING_METHOD);
    }
  }, [checkoutStep, setCheckoutStep]);
  const setShippingMethodDone = (0, _react.useCallback)(() => {
    if (checkoutStep === CHECKOUT_STEP.SHIPPING_METHOD) {
      setCheckoutStep(CHECKOUT_STEP.PAYMENT);
    }
  }, [checkoutStep, setCheckoutStep]);
  const setPaymentInformationDone = (0, _react.useCallback)(() => {
    if (checkoutStep === CHECKOUT_STEP.PAYMENT) {
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
      setCheckoutStep(CHECKOUT_STEP.REVIEW);
    }
  }, [checkoutStep, setCheckoutStep]);
  const handlePlaceOrder = (0, _react.useCallback)(async () => {
    // Fetch order details and then use an effect to actually place the
    // order. If/when Apollo returns promises for invokers from useLazyQuery
    // we can just await this function and then perform the rest of order
    // placement.
    getOrderDetails({
      variables: {
        cartId
      }
    });
  }, [cartId, getOrderDetails]);
  (0, _react.useEffect)(() => {
    async function placeOrderAndCleanup() {
      try {
        await placeOrder({
          variables: {
            cartId
          }
        }); // Cleanup stale cart and customer info.

        await removeCart();
        await (0, _clearCartDataFromCache.clearCartDataFromCache)(apolloClient);
        await createCart({
          fetchCartId
        });
      } catch (err) {
        console.error('An error occurred during when placing the order', err);
        setReviewOrderButtonClicked(false);
        setCheckoutStep(CHECKOUT_STEP.PAYMENT);
      }
    }

    if (orderDetailsData && !placeOrderCalled) {
      placeOrderAndCleanup();
    }
  }, [apolloClient, cartId, createCart, fetchCartId, orderDetailsData, placeOrder, placeOrderCalled, removeCart]);
  return {
    activeContent,
    cartItems,
    checkoutStep,
    customer,
    error: checkoutError,
    handleSignIn,
    handlePlaceOrder,
    hasError: !!checkoutError,
    isCartEmpty: !(checkoutData && checkoutData.cart.total_quantity),
    isGuestCheckout: !isSignedIn,
    isLoading,
    isUpdating,
    orderDetailsData,
    orderDetailsLoading,
    orderNumber: placeOrderData && placeOrderData.placeOrder.order.order_number || null,
    placeOrderLoading,
    setCheckoutStep,
    setIsUpdating,
    setShippingInformationDone,
    setShippingMethodDone,
    setPaymentInformationDone,
    resetReviewOrderButtonClicked,
    handleReviewOrder,
    reviewOrderButtonClicked,
    toggleActiveContent
  };
};

exports.useCheckoutPage = useCheckoutPage;
//# sourceMappingURL=useCheckoutPage.js.map