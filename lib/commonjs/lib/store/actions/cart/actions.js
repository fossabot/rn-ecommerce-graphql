"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

const prefix = 'CART';
const actionMap = {
  ADD_ITEM: {
    REQUEST: null,
    RECEIVE: null
  },
  GET_CART: {
    REQUEST: null,
    RECEIVE: null
  },
  GET_DETAILS: {
    REQUEST: null,
    RECEIVE: null
  },
  REMOVE_ITEM: {
    REQUEST: null,
    RECEIVE: null
  },
  UPDATE_ITEM: {
    REQUEST: null,
    RECEIVE: null
  }
};
const actionTypes = ['BEGIN_EDIT_ITEM', 'END_EDIT_ITEM', 'RESET'];

var _default = (0, _reduxActions.createActions)(actionMap, ...actionTypes, {
  prefix
});

exports.default = _default;
//# sourceMappingURL=actions.js.map