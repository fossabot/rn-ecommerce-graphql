"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePaymentMethods = void 0;

var _client = require("@apollo/client");

var _informed = require("informed");

var _cart = require("../../../context/cart");

const usePaymentMethods = props => {
  const {
    queries
  } = props;
  const {
    getPaymentMethodsQuery
  } = queries;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const {
    data,
    loading
  } = (0, _client.useQuery)(getPaymentMethodsQuery, {
    skip: !cartId,
    variables: {
      cartId
    }
  });
  const {
    value: currentSelectedPaymentMethod
  } = (0, _informed.useFieldState)('selectedPaymentMethod');
  const availablePaymentMethods = data && data.cart.available_payment_methods || [];
  const initialSelectedMethod = availablePaymentMethods.length && availablePaymentMethods[0].code || null;
  return {
    availablePaymentMethods,
    currentSelectedPaymentMethod,
    initialSelectedMethod,
    isLoading: loading
  };
};

exports.usePaymentMethods = usePaymentMethods;
//# sourceMappingURL=usePaymentMethods.js.map