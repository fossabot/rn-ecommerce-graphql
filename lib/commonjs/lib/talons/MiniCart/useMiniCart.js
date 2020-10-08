"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMiniCart = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _client = require("@apollo/client");

var _cart = require("../../context/cart");

var _deriveErrorMessage = require("../../util/deriveErrorMessage");

/**
 *
 * @param {Function} props.setIsOpen - Function to toggle the mini cart
 * @param {DocumentNode} props.queries.miniCartQuery - Query to fetch mini cart data
 * @param {DocumentNode} props.mutations.removeItemMutation - Mutation to remove an item from cart
 *
 * @returns {
 *      closeMiniCart: Function,
 *      errorMessage: String,
 *      handleEditCart: Function,
 *      handleProceedToCheckout: Function,
 *      handleRemoveItem: Function,
 *      loading: Boolean,
 *      productList: Array<>,
 *      subTotal: Number,
 *      totalQuantity: Number
 *  }
 */
const useMiniCart = props => {
  const {
    setIsOpen,
    queries,
    mutations
  } = props;
  const {
    miniCartQuery
  } = queries;
  const {
    removeItemMutation
  } = mutations;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const history = (0, _reactRouterDom.useHistory)();
  const {
    data: miniCartData,
    loading: miniCartLoading
  } = (0, _client.useQuery)(miniCartQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      cartId
    },
    skip: !cartId
  });
  const [removeItem, {
    loading: removeItemLoading,
    called: removeItemCalled,
    error: removeItemError
  }] = (0, _client.useMutation)(removeItemMutation);
  const totalQuantity = (0, _react.useMemo)(() => {
    if (!miniCartLoading && miniCartData) {
      return miniCartData.cart.total_quantity;
    }
  }, [miniCartData, miniCartLoading]);
  const subTotal = (0, _react.useMemo)(() => {
    if (!miniCartLoading && miniCartData) {
      return miniCartData.cart.prices.subtotal_excluding_tax;
    }
  }, [miniCartData, miniCartLoading]);
  const productList = (0, _react.useMemo)(() => {
    if (!miniCartLoading && miniCartData) {
      return miniCartData.cart.items;
    }
  }, [miniCartData, miniCartLoading]);
  const closeMiniCart = (0, _react.useCallback)(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const handleRemoveItem = (0, _react.useCallback)(async id => {
    try {
      await removeItem({
        variables: {
          cartId,
          itemId: id
        }
      });
    } catch (e) {// Error is logged by apollo link - no need to double log.
    }
  }, [cartId, removeItem]);
  const handleProceedToCheckout = (0, _react.useCallback)(() => {
    setIsOpen(false);
    history.push('/checkout');
  }, [history, setIsOpen]);
  const handleEditCart = (0, _react.useCallback)(() => {
    setIsOpen(false);
    history.push('/cart');
  }, [history, setIsOpen]);
  const derivedErrorMessage = (0, _react.useMemo)(() => (0, _deriveErrorMessage.deriveErrorMessage)([removeItemError]), [removeItemError]);
  return {
    closeMiniCart,
    errorMessage: derivedErrorMessage,
    handleEditCart,
    handleProceedToCheckout,
    handleRemoveItem,
    loading: miniCartLoading || removeItemCalled && removeItemLoading,
    productList,
    subTotal,
    totalQuantity
  };
};

exports.useMiniCart = useMiniCart;
//# sourceMappingURL=useMiniCart.js.map