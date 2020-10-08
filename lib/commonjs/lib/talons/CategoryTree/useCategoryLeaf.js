"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCategoryLeaf = void 0;

var _react = require("react");

/**
 * Returns props necessary to render a CategoryLeaf component.
 *
 * @param {object} props
 * @param {function} props.onNavigate - callback to fire on link click
 * @return {{ handleClick: function }}
 */
const useCategoryLeaf = props => {
  const {
    onNavigate
  } = props;
  const handleClick = (0, _react.useCallback)(() => {
    onNavigate();
  }, [onNavigate]);
  return {
    handleClick
  };
};

exports.useCategoryLeaf = useCategoryLeaf;
//# sourceMappingURL=useCategoryLeaf.js.map