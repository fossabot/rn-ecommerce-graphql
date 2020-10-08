"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGuestForm = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("../../../../context/cart");

const useGuestForm = props => {
  const {
    afterSubmit,
    mutations: {
      setGuestShippingMutation
    },
    onCancel,
    shippingData
  } = props;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const [setGuestShipping, {
    error,
    loading
  }] = (0, _client.useMutation)(setGuestShippingMutation);
  const {
    country,
    region
  } = shippingData;
  const {
    code: countryCode
  } = country;
  const {
    code: regionCode
  } = region;
  const initialValues = { ...shippingData,
    country: countryCode,
    region: regionCode
  }; // Simple heuristic to indicate form was submitted prior to this render

  const isUpdate = !!shippingData.city;
  const handleSubmit = (0, _react.useCallback)(async formValues => {
    const {
      country,
      email,
      ...address
    } = formValues;

    try {
      await setGuestShipping({
        variables: {
          cartId,
          email,
          address: { ...address,
            country_code: country
          }
        }
      });
    } catch {
      return;
    }

    if (afterSubmit) {
      afterSubmit();
    }
  }, [afterSubmit, cartId, setGuestShipping]);
  const handleCancel = (0, _react.useCallback)(() => {
    onCancel();
  }, [onCancel]);
  const errors = (0, _react.useMemo)(() => new Map([['setGuestShippingMutation', error]]), [error]);
  return {
    errors,
    handleCancel,
    handleSubmit,
    initialValues,
    isSaving: loading,
    isUpdate
  };
};

exports.useGuestForm = useGuestForm;
//# sourceMappingURL=useGuestForm.js.map