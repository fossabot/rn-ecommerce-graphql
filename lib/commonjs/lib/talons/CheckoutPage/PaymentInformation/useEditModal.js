"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditModal = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("../../../context/cart");

/**
 * Talon to handle checkout page's payment information edit modal.
 *
 * @param {Function} props.onClose callback to be called when the modal's close or cancel button is clicked.
 * @param {DocumentNode} props.queries.getSelectedPaymentMethodQuery query to fetch the payment method that was used in the payment information checkout step
 *
 * @returns {
 *   selectedPaymentMethod: String,
 *   isLoading: Boolean,
 *   updateButtonClicked: Boolean,
 *   handleClose: Function,
 *   handleUpdate: Function,
 *   handlePaymentSuccess: Function,
 *   handleDropinReady: Function,
 *   handlePaymentError: Function,
 *   resetUpdateButtonClicked: Function
 * }
 */
const useEditModal = props => {
  const {
    onClose,
    queries: {
      getSelectedPaymentMethodQuery
    }
  } = props;
  /**
   * Definitions
   */

  const [isLoading, setIsLoading] = (0, _react.useState)(true);
  const [updateButtonClicked, setUpdateButtonClicked] = (0, _react.useState)(false);
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  /**
   * Queries
   */

  const {
    data: selectedPaymentMethodData
  } = (0, _client.useQuery)(getSelectedPaymentMethodQuery, {
    skip: !cartId,
    variables: {
      cartId
    }
  });
  const selectedPaymentMethod = selectedPaymentMethodData ? selectedPaymentMethodData.cart.selected_payment_method.code : null;
  /**
   * Helper Functions
   */

  const handleClose = (0, _react.useCallback)(() => {
    onClose();
  }, [onClose]);
  const handleUpdate = (0, _react.useCallback)(() => {
    setUpdateButtonClicked(true);
  }, [setUpdateButtonClicked]);
  const handlePaymentSuccess = (0, _react.useCallback)(() => {
    onClose();
  }, [onClose]);
  const handlePaymentError = (0, _react.useCallback)(() => {
    setUpdateButtonClicked(false);
  }, []);
  const handleDropinReady = (0, _react.useCallback)(() => {
    setIsLoading(false);
  }, [setIsLoading]);
  const resetUpdateButtonClicked = (0, _react.useCallback)(() => {
    setUpdateButtonClicked(false);
  }, [setUpdateButtonClicked]);
  return {
    selectedPaymentMethod,
    isLoading,
    updateButtonClicked,
    handleClose,
    handleUpdate,
    handlePaymentSuccess,
    handlePaymentError,
    handleDropinReady,
    resetUpdateButtonClicked
  };
};

exports.useEditModal = useEditModal;
//# sourceMappingURL=useEditModal.js.map