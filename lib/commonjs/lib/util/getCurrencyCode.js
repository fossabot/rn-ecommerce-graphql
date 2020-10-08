"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const DEFAULT_CURRENCY_CODE = 'USD';

const getCurrencyCode = cart => {
  let result;

  try {
    result = cart.details.currency.quote_currency_code;
  } catch {
    result = DEFAULT_CURRENCY_CODE;
  }

  return result;
};

var _default = getCurrencyCode;
exports.default = _default;
//# sourceMappingURL=getCurrencyCode.js.map