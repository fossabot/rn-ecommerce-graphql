"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCartTrigger = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _reactRouterDom = require("react-router-dom");

var _cart = require("@magento/peregrine/lib/context/cart");

var _useDropdown = require("@magento/peregrine/lib/hooks/useDropdown");

/**
 * Routes to hide the mini cart on.
 */
const DENIED_MINI_CART_ROUTES = ['/checkout'];
/**
 *
 * @param {DocumentNode} props.queries.getItemCountQuery query to get the total cart items count
 *
 * @returns {
 *      itemCount: Number,
 *      miniCartIsOpen: Boolean,
 *      handleLinkClick: Function,
 *      handleTriggerClick: Function,
 *      miniCartRef: Function,
 *      hideCartTrigger: Function,
 *      setMiniCartIsOpen: Function
 *  }
 */

const useCartTrigger = props => {
  const {
    queries: {
      getItemCountQuery
    }
  } = props;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const {
    elementRef: miniCartRef,
    expanded: miniCartIsOpen,
    setExpanded: setMiniCartIsOpen
  } = (0, _useDropdown.useDropdown)();
  const history = (0, _reactRouterDom.useHistory)();
  const {
    data
  } = (0, _client.useQuery)(getItemCountQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    variables: {
      cartId
    },
    skip: !cartId
  });
  const itemCount = data ? data.cart.total_quantity : 0;
  const hideCartTrigger = DENIED_MINI_CART_ROUTES.includes(history.location.pathname);
  const handleTriggerClick = (0, _react.useCallback)(() => {
    // Open the mini cart.
    setMiniCartIsOpen(true);
  }, [setMiniCartIsOpen]);
  const handleLinkClick = (0, _react.useCallback)(() => {
    // Send the user to the cart page.
    history.push('/cart');
  }, [history]);
  return {
    handleLinkClick,
    handleTriggerClick,
    itemCount,
    miniCartIsOpen,
    miniCartRef,
    hideCartTrigger,
    setMiniCartIsOpen
  };
};

exports.useCartTrigger = useCartTrigger;
//# sourceMappingURL=useCartTrigger.js.map