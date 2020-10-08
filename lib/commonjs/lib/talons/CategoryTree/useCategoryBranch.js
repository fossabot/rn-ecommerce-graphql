"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCategoryBranch = void 0;

var _react = require("react");

/**
 * Returns props necessary to render a CategoryBranch component.
 *
 * @param {object} props
 * @param {object} props.category - category data
 * @param {string} props.category.id - category id
 * @param {boolean} props.category.include_in_menu - whether to show category
 * @param {function} props.setCategoryId - callback that updates categoryId
 * @return {{ exclude: boolean, handleClick: function }}
 */
const useCategoryBranch = props => {
  const {
    category,
    setCategoryId
  } = props;
  const {
    id,
    include_in_menu
  } = category; // `include_in_menu` is undefined when Magento <= 2.3.1

  const exclude = include_in_menu === 0;
  const handleClick = (0, _react.useCallback)(() => {
    setCategoryId(id);
  }, [id, setCategoryId]);
  return {
    exclude,
    handleClick
  };
};

exports.useCategoryBranch = useCategoryBranch;
//# sourceMappingURL=useCategoryBranch.js.map