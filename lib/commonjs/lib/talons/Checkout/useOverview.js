"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOverview = void 0;

var _react = require("react");

/**
 * Returns props to render an Overview component.
 *
 * @param {Object} props.cart cart state object
 * @param {boolean} props.isSubmitting is the form already submitting
 * @param {boolean} props.ready is the form ready to submit
 * @param {function} props.setEditing set editing state object
 */
const useOverview = props => {
  const {
    cancelCheckout,
    cart,
    isSubmitting,
    ready,
    setEditing,
    submitOrder
  } = props;
  const handleAddressFormClick = (0, _react.useCallback)(() => {
    setEditing('address');
  }, [setEditing]);
  const handlePaymentFormClick = (0, _react.useCallback)(() => {
    setEditing('paymentMethod');
  }, [setEditing]);
  const handleShippingFormClick = (0, _react.useCallback)(() => {
    setEditing('shippingMethod');
  }, [setEditing]);
  const handleCancel = (0, _react.useCallback)(() => {
    cancelCheckout();
  }, [cancelCheckout]);
  const handleSubmit = (0, _react.useCallback)(() => {
    submitOrder();
  }, [submitOrder]);
  const {
    derivedDetails
  } = cart;
  const {
    currencyCode,
    numItems,
    subtotal
  } = derivedDetails;
  return {
    currencyCode,
    handleAddressFormClick,
    handleCancel,
    handlePaymentFormClick,
    handleShippingFormClick,
    handleSubmit,
    isSubmitDisabled: isSubmitting || !ready,
    numItems,
    subtotal
  };
};

exports.useOverview = useOverview;
//# sourceMappingURL=useOverview.js.map