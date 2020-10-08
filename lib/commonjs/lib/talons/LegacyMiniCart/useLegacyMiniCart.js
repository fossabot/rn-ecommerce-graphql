"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useLegacyMiniCart = void 0;

var _react = require("react");

var _app = require("@magento/peregrine/lib/context/app");

var _cart = require("@magento/peregrine/lib/context/cart");

var _checkout = require("@magento/peregrine/lib/context/checkout");

const useLegacyMiniCart = () => {
  const [{
    drawer
  }, {
    closeDrawer
  }] = (0, _app.useAppContext)();
  const [cartState] = (0, _cart.useCartContext)();
  const [, {
    cancelCheckout
  }] = (0, _checkout.useCheckoutContext)();
  const [isEditingItem, setIsEditingItem] = (0, _react.useState)(false);
  const [step, setStep] = (0, _react.useState)('cart');
  const {
    derivedDetails,
    details,
    isLoading,
    isUpdatingItem
  } = cartState;
  const {
    items
  } = details;
  const {
    currencyCode,
    numItems,
    subtotal
  } = derivedDetails;
  const shouldShowFooter = step === 'receipt' || step === 'form' || !(cartState.isEmpty && step === 'cart' || isLoading || isEditingItem);
  const isMiniCartMaskOpen = step === 'form';
  const isOpen = drawer === 'cart';
  const handleClose = (0, _react.useCallback)(() => {
    setStep('cart');
    setIsEditingItem(false);
    closeDrawer();
  }, [closeDrawer, setStep]);
  const handleBeginEditItem = (0, _react.useCallback)(() => {
    setIsEditingItem(true);
  }, []);
  const handleEndEditItem = (0, _react.useCallback)(() => {
    setIsEditingItem(false);
  }, []);
  const handleDismiss = (0, _react.useCallback)(() => {
    setStep('cart');
    cancelCheckout();
  }, [cancelCheckout]);
  return {
    cartItems: items,
    cartState,
    currencyCode,
    handleBeginEditItem,
    handleDismiss,
    handleEndEditItem,
    handleClose,
    isEditingItem,
    isLoading,
    isMiniCartMaskOpen,
    isOpen,
    isUpdatingItem,
    numItems,
    setStep,
    shouldShowFooter,
    step,
    subtotal
  };
};

exports.useLegacyMiniCart = useLegacyMiniCart;
//# sourceMappingURL=useLegacyMiniCart.js.map