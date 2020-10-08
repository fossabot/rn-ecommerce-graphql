"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _reduxActions = require("redux-actions");

const prefix = 'CATALOG';
const actionTypes = ['UPDATE_CATEGORIES'];
const actionMap = {
  SET_CURRENT_PAGE: {
    REQUEST: null,
    RECEIVE: null
  },
  SET_PREV_PAGE_TOTAL: {
    REQUEST: null,
    RECEIVE: null
  }
};

var _default = (0, _reduxActions.createActions)(actionMap, ...actionTypes, {
  prefix
});

exports.default = _default;
//# sourceMappingURL=actions.js.map