"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

const prefix = 'CHECKOUT_RECEIPT';
const actionTypes = ['SET_ORDER_INFORMATION', 'RESET'];

var _default = (0, _reduxActions.createActions)(...actionTypes, {
  prefix
});

exports.default = _default;
//# sourceMappingURL=actions.js.map