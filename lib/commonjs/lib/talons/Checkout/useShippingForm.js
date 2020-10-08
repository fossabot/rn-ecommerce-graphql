"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShippingForm = void 0;

var _react = require("react");

/**
 * Returns props necessary to render a shipping form.
 *
 * @param {Object} props
 * @param {Object[]} props.availableShippingMethods an array of possible shipping methods
 * @param {function} onCancel callback for cancellation
 * @param {function} onSubmit callback for submission
 * @param {string} initialValue current selected shipping method value
 *
 * @returns {{
 *      handleCancel: function,
 *      handleSubmit: function,
 *      initialValue: object,
 *      selectableShippingMethods: array
 * }}
 */
const useShippingForm = props => {
  const {
    availableShippingMethods,
    onCancel,
    onSubmit
  } = props;
  let initialValue;
  let selectableShippingMethods;

  if (availableShippingMethods.length) {
    selectableShippingMethods = availableShippingMethods.map(({
      carrier_code,
      carrier_title
    }) => ({
      label: carrier_title,
      value: carrier_code
    }));
    initialValue = props.initialValue || availableShippingMethods[0].carrier_code;
  } else {
    selectableShippingMethods = [];
    initialValue = '';
  }

  const handleSubmit = (0, _react.useCallback)(({
    shippingMethod
  }) => {
    const selectedShippingMethod = availableShippingMethods.find(({
      carrier_code
    }) => carrier_code === shippingMethod);

    if (!selectedShippingMethod) {
      console.warn("Could not find the selected shipping method ".concat(selectedShippingMethod, " in the list of available shipping methods."));
      onCancel();
    } else {
      onSubmit({
        shippingMethod: selectedShippingMethod
      });
    }
  }, [availableShippingMethods, onCancel, onSubmit]);
  return {
    handleCancel: onCancel,
    handleSubmit,
    initialValue,
    selectableShippingMethods
  };
};

exports.useShippingForm = useShippingForm;
//# sourceMappingURL=useShippingForm.js.map