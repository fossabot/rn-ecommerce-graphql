"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

/** @typedef {{ [key: string]: (Function | CreatorObject) }} CreatorObject */

/**
 * Returns a function to bind action creators based on the shape of the value.
 *
 * Redux's `bindActionCreators` expects a function or an object whose values
 * are functions. Since our action creators are exported as nested objects,
 * whose values may be objects, we invoke `bindActionCreators` recursively.
 *
 * @param {Function | CreatorObject} value - Action creator(s) to be bound.
 * @return {Function} - A function compatible with `value`.
 */
const getBindFunction = value => typeof value === 'function' ? _redux.bindActionCreators : bindActionCreatorsRecursively;
/**
 * Maps an object whose values are action creators (or objects of such)
 * into an object whose values are bound action creators (or objects of such).
 *
 * A bound action creator is one wrapped into a `dispatch` call,
 * such that invoking it creates and dispatches an action.
 *
 * Note that `actions` may not be a function.
 *
 * @param {CreatorObject} actions - A nested object containing action creators.
 * @param {Function} dispatch - The `dispatch` function from a Redux store.
 * @return {CreatorObject} - A nested object containing bound action creators.
 */


const bindActionCreatorsRecursively = (actions, dispatch) => Object.entries(actions).reduce((acc, [name, value]) => {
  const bind = getBindFunction(value);
  acc[name] = bind(value, dispatch);
  return acc;
}, {});

var _default = bindActionCreatorsRecursively;
exports.default = _default;
//# sourceMappingURL=bindActionCreators.js.map