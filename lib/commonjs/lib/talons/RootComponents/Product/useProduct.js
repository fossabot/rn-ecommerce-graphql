"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProduct = void 0;

var _client = require("@apollo/client");

var _react = require("react");

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that
 * controls the logic for the Product Root Component.
 *
 * @kind function
 *
 * @param {object}      props
 * @param {Function}    props.mapProduct - A function for updating products to the proper shape.
 * @param {GraphQLAST}  props.queries.getProductQuery - Fetches product using a server query
 * @param {String}      props.urlKey - The url_key of this product.
 *
 * @returns {object}    result
 * @returns {Bool}      result.error - Indicates a network error occurred.
 * @returns {Bool}      result.loading - Indicates the query is in flight.
 * @returns {Bool}      result.product - The product's details.
 */
const useProduct = props => {
  const {
    mapProduct,
    queries,
    urlKey
  } = props;
  const {
    error,
    loading,
    data
  } = (0, _client.useQuery)(queries.getProductQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      urlKey
    }
  });
  const product = (0, _react.useMemo)(() => {
    if (!data) {
      // The product isn't in the cache and we don't have a response from GraphQL yet.
      return null;
    } // Note: if a product is out of stock _and_ the backend specifies not to
    // display OOS items, the items array will be empty.
    // Only return the product that we queried for.


    const product = data.products.items.find(item => item.url_key === urlKey);

    if (!product) {
      return null;
    }

    return mapProduct(product);
  }, [data, mapProduct, urlKey]);
  return {
    error,
    loading,
    product
  };
};

exports.useProduct = useProduct;
//# sourceMappingURL=useProduct.js.map