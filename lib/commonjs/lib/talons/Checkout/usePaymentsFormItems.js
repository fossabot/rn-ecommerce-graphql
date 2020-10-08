"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePaymentsFormItems = void 0;

var _react = require("react");

var _informed = require("informed");

/**
 *
 * @param {boolean} props.isSubmitting whether or not the payment form items are
 * @param {function} props.setIsSubmitting callback for setting submitting state
 * @param {function} props.onSubmit submit callback
 */
const usePaymentsFormItems = props => {
  const [isReady, setIsReady] = (0, _react.useState)(false);
  const {
    isSubmitting,
    setIsSubmitting,
    onCancel,
    onSubmit
  } = props; // Currently form state toggles dirty from false to true because of how
  // informed is implemented. This effectively causes this child components
  // to re-render multiple times. Keep tabs on the following issue:
  //   https://github.com/joepuzzo/informed/issues/138
  // If they resolve it or we move away from informed we can probably get some
  // extra performance.

  const formState = (0, _informed.useFormState)();
  const addressDiffers = formState.values.addresses_same === false;
  const handleCancel = (0, _react.useCallback)(() => {
    onCancel();
  }, [onCancel]);
  const handleError = (0, _react.useCallback)(() => {
    setIsSubmitting(false);
  }, [setIsSubmitting]); // The success callback. Unfortunately since form state is created first and
  // then modified when using initialValues any component who uses this
  // callback will be rendered multiple times on first render. See above
  // comments for more info.

  const handleSuccess = (0, _react.useCallback)(value => {
    setIsSubmitting(false);
    const sameAsShippingAddress = formState.values['addresses_same'];
    let billingAddress;

    if (!sameAsShippingAddress) {
      billingAddress = {
        city: formState.values['city'],
        email: formState.values['email'],
        firstname: formState.values['firstname'],
        lastname: formState.values['lastname'],
        postcode: formState.values['postcode'],
        region_code: formState.values['region_code'],
        street: formState.values['street'],
        telephone: formState.values['telephone']
      };
    } else {
      billingAddress = {
        sameAsShippingAddress
      };
    }

    onSubmit({
      billingAddress,
      paymentMethod: {
        code: 'braintree',
        data: value
      }
    });
  }, [formState.values, setIsSubmitting, onSubmit]);
  return {
    addressDiffers,
    handleCancel,
    handleError,
    handleSuccess,
    isDisabled: !isReady || isSubmitting,
    setIsReady
  };
};

exports.usePaymentsFormItems = usePaymentsFormItems;
//# sourceMappingURL=usePaymentsFormItems.js.map