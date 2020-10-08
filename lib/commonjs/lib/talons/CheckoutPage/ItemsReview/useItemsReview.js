"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useItemsReview = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("../../../context/cart");

const useItemsReview = props => {
  const [showAllItems, setShowAllItems] = (0, _react.useState)(false);
  const {
    queries: {
      getItemsInCart
    }
  } = props;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const [fetchItemsInCart, {
    data: queryData,
    error,
    loading
  }] = (0, _client.useLazyQuery)(getItemsInCart, {
    fetchPolicy: 'cache-and-network'
  }); // If static data was provided, use that instead of query data.

  const data = props.data || queryData;
  const setShowAllItemsFlag = (0, _react.useCallback)(() => setShowAllItems(true), [setShowAllItems]);
  (0, _react.useEffect)(() => {
    if (cartId && !props.data) {
      fetchItemsInCart({
        variables: {
          cartId
        }
      });
    }
  }, [cartId, fetchItemsInCart, props.data]);
  (0, _react.useEffect)(() => {
    /**
     * If there are 2 or less than 2 items in cart
     * set show all items to `true`.
     */
    if (data && data.cart && data.cart.items.length <= 2) {
      setShowAllItems(true);
    }
  }, [data]);
  const items = data ? data.cart.items : [];
  const totalQuantity = data ? +data.cart.total_quantity : 0;
  return {
    isLoading: !!loading,
    items,
    hasErrors: !!error,
    totalQuantity,
    showAllItems,
    setShowAllItems: setShowAllItemsFlag
  };
};

exports.useItemsReview = useItemsReview;
//# sourceMappingURL=useItemsReview.js.map