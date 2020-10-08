"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCategoryList = void 0;

var _react = require("react");

var _client = require("@apollo/client");

/**
 * Returns props necessary to render a CategoryList component.
 *
 * @param {object} props
 * @param {object} props.query - category data
 * @param {string} props.id - category id
 * @return {{ childCategories: array, error: object }}
 */
const useCategoryList = props => {
  const {
    query,
    id
  } = props;
  const [runQuery, queryResponse] = (0, _client.useLazyQuery)(query);
  const {
    loading,
    error,
    data
  } = queryResponse; // Run the query immediately and every time id changes.

  (0, _react.useEffect)(() => {
    runQuery({
      variables: {
        id
      }
    });
  }, [id, runQuery]);
  return {
    childCategories: data && data.category && data.category.children || null,
    error,
    loading
  };
};

exports.useCategoryList = useCategoryList;
//# sourceMappingURL=useCategoryList.js.map