"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditItem = void 0;

var _react = require("react");

var _client = require("@apollo/client");

const useEditItem = props => {
  const {
    item,
    query
  } = props;
  const [runQuery, queryResult] = (0, _client.useLazyQuery)(query);
  const {
    data,
    error,
    loading
  } = queryResult;
  const itemHasOptions = item.configurable_options && item.configurable_options.length > 0; // Run the query once on mount and again whenever the
  // item being edited changes.

  (0, _react.useEffect)(() => {
    // Only fetch item variants if it can have them.
    if (itemHasOptions) {
      runQuery({
        variables: {
          sku: item.product.sku
        }
      });
    }
  }, [item, itemHasOptions, runQuery]); // If we don't have possible options for the item just use an empty object

  const configItem = data && data.products && data.products.items[0];
  return {
    configItem,
    hasError: !!error,
    isLoading: !!loading,
    itemHasOptions
  };
};

exports.useEditItem = useEditItem;
//# sourceMappingURL=useEditItem.js.map