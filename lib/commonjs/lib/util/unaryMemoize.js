"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const memoize = fn => {
  const cache = new Map();
  return x => cache.has(x) ? cache.get(x) : cache.set(x, fn(x)).get(x);
};

var _default = memoize;
exports.default = _default;
//# sourceMappingURL=unaryMemoize.js.map