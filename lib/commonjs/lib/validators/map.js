"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

const isMap = obj => obj instanceof Map;

function optionalMap(props, propName, componentName) {
  const prop = props[propName];
  const type = typeof prop;

  if (prop != null && !isMap(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `Map`."));
  }
}

function requiredMap(props, propName, componentName) {
  const prop = props[propName];
  const type = typeof prop;

  if (prop == null || !isMap(prop)) {
    return new Error("Invalid prop `".concat(propName, "` of type `").concat(type, "` supplied to `").concat(componentName, "`, expected `Map`."));
  }
}

optionalMap.isRequired = requiredMap;
var _default = optionalMap;
exports.default = _default;
//# sourceMappingURL=map.js.map