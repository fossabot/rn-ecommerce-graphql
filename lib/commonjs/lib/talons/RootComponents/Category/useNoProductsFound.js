"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNoProductsFound = void 0;

var _react = require("react");

var _catalog = require("../../../context/catalog");

const NUM_CATEGORIES_TO_SHOW = 3; // The default category does not have a parentId.

const isNonDefaultCategory = category => Boolean(category.parentId);
/**
 * Returns props necessary to render a NoProductsFound component.
 *
 * @param {object} props
 * @param {number} props.categoryId - The ID of the category that has no products.
 *
 * @returns {object}
 * @param {array} recommendedCategories - A list of categories for the UI to recommend.
 */


const useNoProductsFound = props => {
  const {
    categoryId
  } = props;
  const [{
    categories
  }] = (0, _catalog.useCatalogContext)();
  const recommendedCategories = (0, _react.useMemo)(() => {
    // We know this category is empty, don't recommend it.
    const isNotSameCategory = category => category.id !== categoryId;

    const filteredCategories = Object.values(categories).filter(isNonDefaultCategory).filter(isNotSameCategory);
    const numCategories = filteredCategories.length;
    let categoriesToRecommend;

    if (numCategories <= NUM_CATEGORIES_TO_SHOW) {
      // Not enough categories to randomize, just take them all.
      categoriesToRecommend = filteredCategories;
    } else {
      // We have more categories than we want to show.
      // Randomly select a subset of them.
      const maxStartIndex = numCategories - NUM_CATEGORIES_TO_SHOW + 1;
      const startIndex = Math.floor(Math.random() * maxStartIndex);
      const endIndex = startIndex + NUM_CATEGORIES_TO_SHOW;
      categoriesToRecommend = filteredCategories.slice(startIndex, endIndex);
    }

    return categoriesToRecommend;
  }, [categoryId, categories]);
  return {
    recommendedCategories
  };
};

exports.useNoProductsFound = useNoProductsFound;
//# sourceMappingURL=useNoProductsFound.js.map