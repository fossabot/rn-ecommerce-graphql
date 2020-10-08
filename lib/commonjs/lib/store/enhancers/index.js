"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

// import errorHandler from './errorHandler';
// import middleware from './middleware';
// import composeEnhancers from '../../util/composeEnhancers';
// const enhancer = composeEnhancers(middleware, errorHandler);
const enhancer = _redux.compose;
var _default = enhancer;
exports.default = _default;
//# sourceMappingURL=index.js.map