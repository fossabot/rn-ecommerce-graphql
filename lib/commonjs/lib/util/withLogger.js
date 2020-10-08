"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * Logs action type, payload, and result state to the browser console.
 * @param {*} reducer a reducing function to wrap with logging
 * @returns {Function} a wrapped reducer function
 */
const withLogger = reducer => (state, action) => {
  const result = reducer(state, action);
  console.groupCollapsed(action.type);
  console.group('payload');
  console.log(action.payload);
  console.groupEnd();
  console.group('next state');
  console.log(result);
  console.groupEnd();
  console.groupEnd();
  return result;
};

var _default = withLogger;
exports.default = _default;
//# sourceMappingURL=withLogger.js.map