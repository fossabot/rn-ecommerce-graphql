"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddressForm = void 0;

var _react = require("react");

var _checkout = require("@magento/peregrine/lib/context/checkout");

var _client = require("@apollo/client");

var _user = require("@magento/peregrine/lib/context/user");

/**
 * Returns values used to render an AddressForm component.
 *
 * @param {Object} props
 * @param {Object[]} props.fields an array of fields to reduce over for initial values
 * @param {function} props.onCancel cancel callback
 * @param {function} props.onSubmit submit callback
 * @returns {{
 *   handleCancel: function,
 *   handleSubmit: function,
 *   initialValues: object
 * }}
 */
const useAddressForm = props => {
  const {
    countries,
    fields,
    onCancel,
    onSubmit,
    setGuestEmailMutation,
    setShippingAddressOnCartMutation
  } = props;
  const [{
    shippingAddress,
    shippingAddressError
  }, {
    submitShippingAddress
  }] = (0, _checkout.useCheckoutContext)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const [setGuestEmail] = (0, _client.useMutation)(setGuestEmailMutation, {
    // For security, never cache this mutation or the mutation results.
    fetchPolicy: 'no-cache'
  });
  const [setShippingAddressOnCart] = (0, _client.useMutation)(setShippingAddressOnCartMutation);
  const values = (0, _react.useMemo)(() => fields.reduce((acc, key) => {
    acc[key] = shippingAddress[key];
    return acc;
  }, {}), [fields, shippingAddress]);
  const handleCancel = (0, _react.useCallback)(() => {
    onCancel();
  }, [onCancel]);
  const handleSubmit = (0, _react.useCallback)(async addressFormValues => {
    try {
      await submitShippingAddress({
        formValues: addressFormValues,
        countries,
        setGuestEmail,
        setShippingAddressOnCart
      });
      onSubmit();
    } catch (error) {
      console.error(error);
    }
  }, [countries, onSubmit, setGuestEmail, setShippingAddressOnCart, submitShippingAddress]);
  return {
    error: shippingAddressError,
    handleCancel,
    handleSubmit,
    isSignedIn,
    initialValues: values
  };
};

exports.useAddressForm = useAddressForm;
//# sourceMappingURL=useAddressForm.js.map