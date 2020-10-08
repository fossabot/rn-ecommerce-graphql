"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isIterable = obj => typeof obj[Symbol.iterator] === 'function';

function optionalIterable(props, propName, componentName) {
  const prop = props[propName];
  const type = typeof prop;

  if (prop != null && !isIterable(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `iterable`."));
  }
}

function requiredIterable(props, propName, componentName) {
  const prop = props[propName];
  const type = typeof prop;

  if (prop == null || !isIterable(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `iterable`."));
  }
}

optionalIterable.isRequired = requiredIterable;
var _default = optionalIterable;
exports.default = _default;
//# sourceMappingURL=iterable.js.map