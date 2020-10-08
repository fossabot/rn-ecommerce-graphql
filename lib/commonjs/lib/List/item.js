"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _fromRenderProp = _interopRequireDefault(require("../util/fromRenderProp"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * The **Item** Component is reponsible for rendering each item in list
 *
 * @typedef Item
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns{React.Element} A React component for rendering each item in list.
 */
const Item = props => {
  const {
    classes,
    hasFocus,
    isSelected,
    item,
    itemIndex,
    render,
    setFocus,
    uniqueId: key,
    updateSelectedKeys,
    ...restProps
  } = props;
  const children = typeof item === 'string' ? item : null;
  const onClick = (0, _react.useCallback)(() => updateSelectedKeys(key), [key, updateSelectedKeys]);
  const onFocus = (0, _react.useCallback)(() => setFocus(key), [key, setFocus]);
  const customProps = {
    classes,
    hasFocus,
    isSelected,
    item,
    itemIndex,
    onClick,
    onFocus
  };
  const Root = (0, _react.useMemo)(() => (0, _fromRenderProp.default)(render, Object.keys(customProps)), [render, customProps]);
  return /*#__PURE__*/_react.default.createElement(Root, _extends({
    className: classes.root
  }, customProps, restProps), children);
};
/**
 * props for {@link Item}
 *
 * @typedef props
 *
 * @property {Object} classes css classes prop for Item
 * @property {string} classes.root css classes for Item root container
 * @property {bool} hasFocus Does the item have focus
 * @property {bool} isSelected Is the item currently selected
 * @property {any} item item data
 * @property {number} itemIndex index of item
 * @property {func | string} render A render prop for the list item. A tagname string, such as `"div"`, is also valid
 * @property {func} setFocus A callback for setting focus
 * @property {number | string} uniqueId unique Id given for the item
 * @property {func} updateSelectedKeys A callback for updating selected items
 */


Item.propTypes = {
  classes: (0, _propTypes.shape)({
    root: _propTypes.string
  }),
  hasFocus: _propTypes.bool,
  isSelected: _propTypes.bool,
  item: _propTypes.any.isRequired,
  itemIndex: _propTypes.number.isRequired,
  render: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.string]).isRequired,
  setFocus: _propTypes.func,
  uniqueId: (0, _propTypes.oneOfType)([_propTypes.number, _propTypes.string]).isRequired,
  updateSelectedKeys: _propTypes.func.isRequired
};
/**
 * default props for {@link Item}
 *
 * @typedef @defaultProps
 */

Item.defaultProps = {
  classes: {},
  hasFocus: false,
  isSelected: false,
  render: 'div'
};
var _default = Item;
exports.default = _default;
//# sourceMappingURL=item.js.map