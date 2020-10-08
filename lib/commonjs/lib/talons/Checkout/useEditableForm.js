"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditableForm = void 0;

var _react = require("react");

const useEditableForm = props => {
  const {
    countries,
    setEditing,
    submitPaymentMethodAndBillingAddress,
    submitShippingMethod
  } = props;
  const handleCancel = (0, _react.useCallback)(() => {
    setEditing(null);
  }, [setEditing]);
  const handleSubmitAddressForm = (0, _react.useCallback)(() => {
    setEditing(null);
  }, [setEditing]);
  const handleSubmitPaymentsForm = (0, _react.useCallback)(async formValues => {
    await submitPaymentMethodAndBillingAddress({
      countries,
      formValues
    });
    setEditing(null);
  }, [countries, setEditing, submitPaymentMethodAndBillingAddress]);
  const handleSubmitShippingForm = (0, _react.useCallback)(async formValues => {
    await submitShippingMethod({
      formValues
    });
    setEditing(null);
  }, [setEditing, submitShippingMethod]);
  return {
    handleCancel,
    handleSubmitAddressForm,
    handleSubmitPaymentsForm,
    handleSubmitShippingForm
  };
};

exports.useEditableForm = useEditableForm;
//# sourceMappingURL=useEditableForm.js.map