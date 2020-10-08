"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

const prefix = 'USER';
const actionTypes = ['RESET', 'SET_TOKEN', 'CLEAR_TOKEN'];
const actionMap = {
  SIGN_IN: {
    REQUEST: null,
    RECEIVE: null
  },
  GET_DETAILS: {
    REQUEST: null,
    RECEIVE: null
  },
  CREATE_ACCOUNT: {
    REQUEST: null,
    RECEIVE: null
  },
  RESET_PASSWORD: {
    REQUEST: null,
    RECEIVE: null
  }
};

var _default = (0, _reduxActions.createActions)(actionMap, ...actionTypes, {
  prefix
});

exports.default = _default;
//# sourceMappingURL=actions.js.map