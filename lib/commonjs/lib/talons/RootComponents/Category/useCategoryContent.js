"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCategoryContent = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _app = require("@magento/peregrine/lib/context/app");

const DRAWER_NAME = 'filter'; // TODO: This can be replaced by the value from `storeConfig when the PR,
// https://github.com/magento/graphql-ce/pull/650, is released.

const pageSize = 6;
const placeholderItems = Array.from({
  length: pageSize
}).fill(null);
/**
 * Returns props necessary to render the categoryContent component.
 *
 * @param {object} props.data - The results of a getCategory GraphQL query.
 *
 * @returns {object} result
 * @returns {number} result.categoryId - This category's ID.
 * @returns {string} result.categoryName - This category's name.
 * @returns {object} result.filters - The filters object.
 * @returns {func}   result.handleLoadFilters - A callback function to signal the user's intent to interact with the filters.
 * @returns {func}   result.handleOpenFilters - A callback function that actually opens the filter drawer.
 * @returns {object} result.items - The items in this category.
 * @returns {bool}   result.loadFilters - Whether or not the user has signalled their intent to interact with the filters.
 * @returns {string} result.pageTitle - The text to put in the browser tab for this page.
 */

const useCategoryContent = props => {
  const {
    categoryId,
    data,
    queries: {
      getProductFiltersByCategory
    }
  } = props;
  const [loadFilters, setLoadFilters] = (0, _react.useState)(false);
  const [, {
    toggleDrawer
  }] = (0, _app.useAppContext)();
  const handleLoadFilters = (0, _react.useCallback)(() => {
    setLoadFilters(true);
  }, [setLoadFilters]);
  const handleOpenFilters = (0, _react.useCallback)(() => {
    setLoadFilters(true);
    toggleDrawer(DRAWER_NAME);
  }, [setLoadFilters, toggleDrawer]);
  const [getFilters, {
    data: filterData
  }] = (0, _client.useLazyQuery)(getProductFiltersByCategory);
  (0, _react.useEffect)(() => {
    if (categoryId) {
      getFilters({
        variables: {
          categoryIdFilter: {
            eq: categoryId
          }
        }
      });
    }
  }, [categoryId, getFilters]);
  const filters = filterData ? filterData.products.aggregations : null;
  const items = data ? data.products.items : placeholderItems;
  const totalPagesFromData = data ? data.products.page_info.total_pages : null;
  const categoryName = data ? data.category.name : null;
  const categoryDescription = data ? data.category.description : null; // Note: STORE_NAME is injected by Webpack at build time.

  const pageTitle = categoryName ? "".concat(categoryName, " - ").concat(STORE_NAME) : STORE_NAME;
  return {
    categoryName,
    categoryDescription,
    filters,
    handleLoadFilters,
    handleOpenFilters,
    items,
    loadFilters,
    pageTitle,
    totalPagesFromData
  };
};

exports.useCategoryContent = useCategoryContent;
//# sourceMappingURL=useCategoryContent.js.map