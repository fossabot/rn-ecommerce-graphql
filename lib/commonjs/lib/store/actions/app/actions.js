"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

const prefix = 'APP';
const actionTypes = ['TOGGLE_DRAWER', 'SET_ONLINE', 'SET_OFFLINE', 'TOGGLE_SEARCH', 'EXECUTE_SEARCH', 'MARK_ERROR_HANDLED', 'SET_PAGE_LOADING'];

var _default = (0, _reduxActions.createActions)(...actionTypes, {
  prefix
});

exports.default = _default;
//# sourceMappingURL=actions.js.map