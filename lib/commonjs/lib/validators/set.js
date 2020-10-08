"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isSet = obj => obj instanceof Set;

function optionalSet(props, propName, componentName) {
  const prop = props[propName];
  const type = typeof prop;

  if (prop != null && !isSet(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `Set`."));
  }
}

function requiredSet(props, propName, componentName) {
  const prop = props[propName];
  const type = typeof prop;

  if (prop == null || !isSet(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `Set`."));
  }
}

optionalSet.isRequired = requiredSet;
var _default = optionalSet;
exports.default = _default;
//# sourceMappingURL=set.js.map