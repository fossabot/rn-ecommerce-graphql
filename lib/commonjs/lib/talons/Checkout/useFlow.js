"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFlow = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("@magento/peregrine/lib/context/cart");

var _checkout = require("@magento/peregrine/lib/context/checkout");

var _isObjectEmpty = _interopRequireDefault(require("@magento/peregrine/lib/util/isObjectEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isCheckoutReady = checkout => {
  const {
    billingAddress,
    paymentData,
    shippingAddress,
    shippingMethod
  } = checkout;
  const objectsHaveData = [billingAddress, paymentData, shippingAddress].every(data => {
    return !!data && !(0, _isObjectEmpty.default)(data);
  });
  const stringsHaveData = !!shippingMethod && shippingMethod.length > 0;
  return objectsHaveData && stringsHaveData;
};

const useFlow = props => {
  const {
    createCartMutation,
    onSubmitError,
    setStep
  } = props;
  const [fetchCartId] = (0, _client.useMutation)(createCartMutation);
  const [cartState] = (0, _cart.useCartContext)();
  const [checkoutState, {
    beginCheckout,
    cancelCheckout,
    submitOrder,
    submitPaymentMethodAndBillingAddress,
    submitShippingMethod
  }] = (0, _checkout.useCheckoutContext)();
  const handleBeginCheckout = (0, _react.useCallback)(async () => {
    await beginCheckout();
    setStep('form');
  }, [beginCheckout, setStep]);
  const handleCancelCheckout = (0, _react.useCallback)(async () => {
    await cancelCheckout();
    setStep('cart');
  }, [cancelCheckout, setStep]);
  const handleSubmitOrder = (0, _react.useCallback)(async () => {
    try {
      await submitOrder({
        fetchCartId
      });
      setStep('receipt');
    } catch (e) {
      onSubmitError(e);
    }
  }, [fetchCartId, onSubmitError, setStep, submitOrder]);
  const handleCloseReceipt = (0, _react.useCallback)(() => {
    setStep('cart');
  }, [setStep]);
  return {
    cartState,
    checkoutDisabled: checkoutState.isSubmitting || cartState.isEmpty,
    checkoutState,
    isReady: isCheckoutReady(checkoutState),
    submitPaymentMethodAndBillingAddress,
    submitShippingMethod,
    handleBeginCheckout,
    handleCancelCheckout,
    handleCloseReceipt,
    handleSubmitOrder
  };
};

exports.useFlow = useFlow;
//# sourceMappingURL=useFlow.js.map