"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWishlistItem = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("../../context/cart");

const useWishlistItem = props => {
  const {
    childSku,
    mutations,
    sku
  } = props;
  const {
    addWishlistItemToCartMutation
  } = mutations;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const cartItem = {
    data: {
      quantity: 1,
      sku: childSku || sku
    }
  }; // Merge in additional input variables for configurable items

  if (childSku) {
    Object.assign(cartItem, {
      parent_sku: sku,
      variant_sku: childSku
    });
  }

  const [addWishlistItemToCart, {
    error,
    loading
  }] = (0, _client.useMutation)(addWishlistItemToCartMutation, {
    variables: {
      cartId,
      cartItem
    }
  });
  const handleAddToCart = (0, _react.useCallback)(async () => {
    try {
      await addWishlistItemToCart();
    } catch {
      return;
    }
  }, [addWishlistItemToCart]);
  const handleMoreActions = (0, _react.useCallback)(() => {
    console.log('To be handled by PWA-632');
  }, []);
  return {
    handleAddToCart,
    handleMoreActions,
    hasError: !!error,
    isLoading: loading
  };
};

exports.useWishlistItem = useWishlistItem;
//# sourceMappingURL=useWishlistItem.js.map