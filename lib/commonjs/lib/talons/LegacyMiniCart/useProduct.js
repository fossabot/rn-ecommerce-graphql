"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useProduct = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("@magento/peregrine/lib/context/cart");

var _useAwaitQuery = require("@magento/peregrine/lib/hooks/useAwaitQuery");

const useProduct = props => {
  const {
    beginEditItem,
    createCartMutation,
    getCartDetailsQuery,
    item,
    removeItemMutation
  } = props;
  const {
    configurable_options: options,
    product,
    quantity,
    prices
  } = item;
  const {
    price
  } = prices;
  const {
    small_image: image,
    name
  } = product;
  const [isFavorite, setIsFavorite] = (0, _react.useState)(false);
  const [isLoading, setIsLoading] = (0, _react.useState)(false);
  const [, {
    removeItemFromCart
  }] = (0, _cart.useCartContext)();
  const [fetchCartId] = (0, _client.useMutation)(createCartMutation);
  const [removeItem] = (0, _client.useMutation)(removeItemMutation);
  const fetchCartDetails = (0, _useAwaitQuery.useAwaitQuery)(getCartDetailsQuery);
  const handleFavoriteItem = (0, _react.useCallback)(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);
  const handleEditItem = (0, _react.useCallback)(() => {
    beginEditItem(item);
  }, [beginEditItem, item]);
  const handleRemoveItem = (0, _react.useCallback)(() => {
    setIsLoading(true);
    removeItemFromCart({
      item,
      fetchCartDetails,
      fetchCartId,
      removeItem
    });
  }, [fetchCartDetails, fetchCartId, item, removeItem, removeItemFromCart]);
  return {
    handleEditItem,
    handleFavoriteItem,
    handleRemoveItem,
    isFavorite,
    isLoading,
    productImage: image.url,
    productName: name,
    productOptions: options,
    productPrice: price.value,
    productQuantity: quantity
  };
};

exports.useProduct = useProduct;
//# sourceMappingURL=useProduct.js.map