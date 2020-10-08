"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _PlaceOrderErrors = require("./PlaceOrderErrors");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const removeGQLTag = rawMessage => rawMessage.replace(/GraphQL error:/, '');

class CheckoutError extends Error {
  constructor(gqlError, ...params) {
    super(params);

    _defineProperty(this, "hasPaymentExpired", () => {
      return this.error.graphQLErrors.some(({
        message
      }) => message.includes(_PlaceOrderErrors.PAYMENT_ERROR));
    });

    this.name = 'CheckoutError';
    this.message = removeGQLTag(gqlError.message);
    this.error = gqlError;
  }
  /**
   * TODO have similar functions if needed for
   * shipping information and shipping method
   * so when they do
   *
   * ```es6
   * if (error.isShippingInformationError()) {
   *      // Handle the error
   * } else {
   *      // Not needed, probably error for other component to handle
   * }
   * ```
   */


}

var _default = CheckoutError;
exports.default = _default;
//# sourceMappingURL=CheckoutError.js.map