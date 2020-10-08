"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

const prefix = 'CHECKOUT';
const actionTypes = ['BEGIN', 'EDIT', 'RESET']; // classify action creators by domain
// e.g., `actions.order.submit` => CHECKOUT/ORDER/SUBMIT
// a `null` value corresponds to the default creator function

const actionMap = {
  BILLING_ADDRESS: {
    SUBMIT: null,
    ACCEPT: null,
    REJECT: null
  },
  SHIPPING_ADDRESS: {
    SUBMIT: null,
    ACCEPT: null,
    REJECT: null
  },
  PAYMENT_METHOD: {
    SUBMIT: null,
    ACCEPT: null,
    REJECT: null
  },
  GET_SHIPPING_METHODS: {
    REQUEST: null,
    RECEIVE: null
  },
  RECEIPT: {
    SET_ORDER: null,
    RESET: null
  },
  SHIPPING_METHOD: {
    SUBMIT: null,
    ACCEPT: null,
    REJECT: null
  },
  ORDER: {
    SUBMIT: null,
    ACCEPT: null,
    REJECT: null
  }
};

var _default = (0, _reduxActions.createActions)(actionMap, ...actionTypes, {
  prefix
});

exports.default = _default;
//# sourceMappingURL=actions.js.map