"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.filterProps = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// memoization cache
const cache = new Map();

const filterProps = (props = {}, exclusions = []) => Object.entries(props).reduce((r, [k, v]) => {
  if (!exclusions.includes(k)) {
    r[k] = v;
  }

  return r;
}, {});

exports.filterProps = filterProps;

const fromRenderProp = (elementType, customProps = []) => {
  const isComposite = typeof elementType === 'function'; // if `elementType` is a function, it's already a component

  if (isComposite) {
    return elementType;
  } // sort and de-dupe `customProps`


  const uniqueCustomProps = Array.from(new Set([...customProps].sort())); // hash arguments for memoization

  const key = "".concat(elementType, "//").concat(uniqueCustomProps.join(',')); // only create a new component if not cached
  // otherwise React will unmount on every render

  if (!cache.has(key)) {
    // create an SFC that renders a node of type `elementType`
    // and filter any props that shouldn't be written to the DOM
    const Component = props => /*#__PURE__*/_react.default.createElement(elementType, filterProps(props, uniqueCustomProps));

    Component.displayName = "fromRenderProp(".concat(elementType, ")");
    cache.set(key, Component);
  }

  return cache.get(key);
};

var _default = fromRenderProp;
exports.default = _default;
//# sourceMappingURL=fromRenderProp.js.map