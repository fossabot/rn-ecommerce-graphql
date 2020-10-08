function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { PAYMENT_ERROR } from './PlaceOrderErrors';

const removeGQLTag = rawMessage => rawMessage.replace(/GraphQL error:/, '');

class CheckoutError extends Error {
  constructor(gqlError, ...params) {
    super(params);

    _defineProperty(this, "hasPaymentExpired", () => {
      return this.error.graphQLErrors.some(({
        message
      }) => message.includes(PAYMENT_ERROR));
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

export default CheckoutError;
//# sourceMappingURL=CheckoutError.js.map