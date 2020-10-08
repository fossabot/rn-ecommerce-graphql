"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _iterable = _interopRequireDefault(require("../validators/iterable"));

var _item = _interopRequireDefault(require("./item"));

var _useListState = require("./useListState");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The **Items** component is a container holding all the items
 *
 * @typedef Items
 * @kind functional component
 *
 * @param {props} props
 *
 * @returns{React.Element} A React component container for all the items in list.
 */
const Items = props => {
  const {
    getItemKey,
    initialSelection,
    items,
    onSelectionChange,
    renderItem,
    selectionModel
  } = props;
  const [state, api] = (0, _useListState.useListState)({
    getItemKey,
    initialSelection,
    onSelectionChange,
    selectionModel
  });
  const {
    cursor,
    hasFocus,
    selectedKeys
  } = state;
  const {
    removeFocus,
    setFocus,
    updateSelectedKeys
  } = api;
  const children = (0, _react.useMemo)(() => {
    return Array.from(items, (item, index) => {
      const key = getItemKey(item, index);
      return /*#__PURE__*/_react.default.createElement(_item.default, {
        hasFocus: hasFocus && cursor === key,
        isSelected: selectedKeys.has(key),
        item: item,
        itemIndex: index,
        key: key,
        onBlur: removeFocus,
        render: renderItem,
        setFocus: setFocus,
        uniqueId: key,
        updateSelectedKeys: updateSelectedKeys
      });
    });
  }, [cursor, getItemKey, hasFocus, items, removeFocus, renderItem, selectedKeys, setFocus, updateSelectedKeys]);
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, children);
};
/**
 * props for {@link Items}
 *
 * @typedef props
 *
 * @property {func} getItemKey item key value getter
 * @property {array | object} initialSelection A single or list of objects that should start off selected
 * @property {iterable} items An iterable that yields `[key, item]` pairs such as an ES2015 Map
 * @property {func} onSelectionChange A callback that fires when the selection state changes
 * @property {func | string} renderItem A render prop for the list item elements. A tagname string, such as `"div"`, is also valid
 * @property {checkbox | radio} selectionModel A string corresponding to a selection model
 */


Items.propTypes = {
  getItemKey: _propTypes.func.isRequired,
  initialSelection: (0, _propTypes.oneOfType)([_propTypes.array, _propTypes.object]),
  items: _iterable.default.isRequired,
  onSelectionChange: _propTypes.func,
  renderItem: (0, _propTypes.oneOfType)([_propTypes.func, _propTypes.string]),
  selectionModel: (0, _propTypes.oneOf)(['checkbox', 'radio'])
};
/**
 * default props for {@link Items}
 *
 * @typedef @defaultProps
 */

Items.defaultProps = {
  getItemKey: ({
    id
  }) => id,
  selectionModel: 'radio'
};
var _default = Items;
exports.default = _default;
//# sourceMappingURL=items.js.map