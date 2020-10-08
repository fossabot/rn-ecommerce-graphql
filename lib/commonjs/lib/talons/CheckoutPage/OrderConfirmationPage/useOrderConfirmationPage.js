"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOrderConfirmationPage = exports.flatten = void 0;

var _user = require("../../../context/user");

const flatten = data => {
  const {
    cart
  } = data;
  const {
    shipping_addresses
  } = cart;
  const address = shipping_addresses[0];
  const shippingMethod = "".concat(address.selected_shipping_method.carrier_title, " - ").concat(address.selected_shipping_method.method_title);
  return {
    city: address.city,
    country: address.country.label,
    email: cart.email,
    firstname: address.firstname,
    lastname: address.lastname,
    postcode: address.postcode,
    region: address.region.label,
    shippingMethod,
    street: address.street,
    totalItemQuantity: cart.total_quantity
  };
};

exports.flatten = flatten;

const useOrderConfirmationPage = props => {
  const {
    data
  } = props;
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  return {
    flatData: flatten(data),
    isSignedIn
  };
};

exports.useOrderConfirmationPage = useOrderConfirmationPage;
//# sourceMappingURL=useOrderConfirmationPage.js.map