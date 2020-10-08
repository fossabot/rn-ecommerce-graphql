"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _fromRenderProp = _interopRequireDefault(require("../util/fromRenderProp"));

var _iterable = _interopRequireDefault(require("../validators/iterable"));

var _items = _interopRequireDefault(require("./items"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * The **List** component maps a collection of data objects into an array of elements.
 * It also manages the selection and focus of those elements.
 *
 * @typedef List
 * @kind functional component
 *
 * @param {props} props React Component props
 *
 * @returns{React.Element} A React component that displays list data.
 */
const List = props => {
  const {
    classes,
    getItemKey,
    initialSelection,
    items,
    render,
    renderItem,
    onSelectionChange,
    selectionModel,
    ...restProps
  } = props;
  const customProps = {
    classes,
    getItemKey,
    items,
    onSelectionChange,
    selectionModel
  };
  const handleSelectionChange = (0, _react.useCallback)(selection => {
    if (onSelectionChange) {
      onSelectionChange(selection);
    }
  }, [onSelectionChange]);
  const Root = (0, _react.useMemo)(() => (0, _fromRenderProp.default)(render, Object.keys(customProps)), [render, customProps]);
  return /*#__PURE__*/_react.default.createElement(Root, _extends({
    className: classes.root
  }, customProps, restProps), /*#__PURE__*/_react.default.createElement(_items.default, {
    getItemKey: getItemKey,
    initialSelection: initialSelection,
    items: items,
    renderItem: renderItem,
    selectionModel: selectionModel,
    onSelectionChange: handleSelectionChange
  }));
};
/**
 * props for {@link List}
 *
 * @typedef props
 *
 * @property {Object} classes css classes prop for List
 * @property {string} classes.root css classes for List root container
 * @property {func} getItemKey item key value getter
 * @property {array | object} initialSelection A single or list of objects that should start off selected
 * @property {iterable} items An iterable that yields `[key, item]` pairs such as an ES2015 Map
 * @property {func | string} render A render prop for the list element. A tagname string, such as `"div"`, is also valid.
 * @property {func | string} renderItem A render prop for the list item elements. A tagname string, such as `"div"`, is also valid
 * @property {func} onSelectionChange A callback that fires when the selection state changes
 * @property {checkbox | radio} selectionModel A string corresponding to a selection model
 */


List.propTypes = {
  classes: (0, _propTypes.shape)({
    root: _propTypes.string
  }),
  getItemKey: _propTypes.func.isRequired,
  initialSelection: (0, _propTypes.oneOfType)([_propTypes.array, _propTypes.object]),
  items: _iterable.default.isRequired,
  render: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.string]).isRequired,
  renderItem: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.string]),
  onSelectionChange: _propTypes.func,
  selectionModel: (0, _propTypes.oneOf)(['checkbox', 'radio'])
};
/**
 * default props for {@link List}
 *
 * @typedef defaultProps
 */

List.defaultProps = {
  classes: {},
  getItemKey: ({
    id
  }) => id,
  items: [],
  render: 'div',
  renderItem: 'div',
  selectionModel: 'radio'
};
var _default = List;
exports.default = _default;
//# sourceMappingURL=list.js.map