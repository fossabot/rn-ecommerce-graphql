"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAutocomplete = void 0;

var _react = require("react");

var _informed = require("informed");

var _client = require("@apollo/client");

var _lodash = _interopRequireDefault(require("lodash.debounce"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @typedef { import("graphql").DocumentNode } DocumentNode
 */

/**
 * Returns props necessary to render an Autocomplete component.
 * @param {Object} props
 * @param {DocumentNode} props.query - GraphQL query
 * @param {Boolean} props.valid - whether to run the query
 * @param {Boolean} props.visible - whether to show the element
 */
const useAutocomplete = props => {
  const {
    queries: {
      getAutocompleteResults
    },
    valid,
    visible
  } = props; // Prepare to run the queries.

  const [runSearch, productResult] = (0, _client.useLazyQuery)(getAutocompleteResults); // Get the search term from the field.

  const {
    value
  } = (0, _informed.useFieldState)('search_query'); // Create a debounced function so we only search some delay after the last
  // keypress.

  const debouncedRunQuery = (0, _react.useMemo)(() => (0, _lodash.default)(inputText => {
    runSearch({
      variables: {
        inputText
      }
    });
  }, 500), [runSearch]); // run the query once on mount, and again whenever state changes

  (0, _react.useEffect)(() => {
    if (valid && visible) {
      debouncedRunQuery(value);
    }
  }, [debouncedRunQuery, valid, value, visible]);
  const {
    data,
    error,
    loading
  } = productResult; // Handle results.

  const products = data && data.products;
  const filters = data && data.products.aggregations;
  const hasResult = products && products.items;
  const resultCount = products && products.total_count;
  const displayResult = valid && hasResult;
  let messageType = '';

  if (error) {
    messageType = 'ERROR';
  } else if (loading) {
    messageType = 'LOADING';
  } else if (!displayResult) {
    messageType = 'PROMPT';
  } else if (!resultCount) {
    messageType = 'EMPTY_RESULT';
  } else {
    messageType = 'RESULT_SUMMARY';
  }

  return {
    displayResult,
    filters,
    messageType,
    products,
    resultCount,
    value
  };
};

exports.useAutocomplete = useAutocomplete;
//# sourceMappingURL=useAutocomplete.js.map