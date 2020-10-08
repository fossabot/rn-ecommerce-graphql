"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBreadcrumbs = void 0;

var _react = require("react");

var _client = require("@apollo/client");

// Just incase the data is unsorted, lets sort it.
const sortCrumbs = (a, b) => a.category_level > b.category_level; // Generates the path for the category.


const getPath = (path, suffix) => {
  if (path) {
    return "/".concat(path).concat(suffix);
  } // If there is no path this is just a dead link.


  return '#';
};
/**
 * Returns props necessary to render a Breadcrumbs component.
 *
 * @param {object} props
 * @param {object} props.query - the breadcrumb query
 * @param {string} props.categoryId - the id of the category for which to generate breadcrumbs
 * @return {{
 *   currentCategory: string,
 *   currentCategoryPath: string,
 *   isLoading: boolean,
 *   normalizedData: array
 * }}
 */


const useBreadcrumbs = props => {
  const {
    categoryId,
    query
  } = props;
  const {
    data,
    loading,
    error
  } = (0, _client.useQuery)(query, {
    variables: {
      category_id: categoryId
    }
  }); // Default to .html for when the query has not yet returned.

  const categoryUrlSuffix = data && data.category.url_suffix || '.html'; // When we have breadcrumb data sort and normalize it for easy rendering.

  const normalizedData = (0, _react.useMemo)(() => {
    if (!loading && data) {
      const breadcrumbData = data.category.breadcrumbs;
      return breadcrumbData && breadcrumbData.sort(sortCrumbs).map(category => ({
        text: category.category_name,
        path: getPath(category.category_url_path, categoryUrlSuffix)
      }));
    }
  }, [categoryUrlSuffix, data, loading]);
  return {
    currentCategory: data && data.category.name || '',
    currentCategoryPath: data && "".concat(data.category.url_path).concat(categoryUrlSuffix) || '#',
    isLoading: loading,
    hasError: !!error,
    normalizedData: normalizedData || []
  };
};

exports.useBreadcrumbs = useBreadcrumbs;
//# sourceMappingURL=useBreadcrumbs.js.map