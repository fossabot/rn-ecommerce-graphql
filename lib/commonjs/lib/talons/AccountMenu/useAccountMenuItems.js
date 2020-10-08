"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccountMenuItems = void 0;

var _react = require("react");

/**
 * @param {Object}      props
 * @param {Function}    props.onSignOut - A function to call when sign out occurs.
 *
 * @returns {Object}    result
 * @returns {Function}  result.handleSignOut - The function to handle sign out actions.
 */
const useAccountMenuItems = props => {
  const {
    onSignOut
  } = props;
  const handleSignOut = (0, _react.useCallback)(() => {
    onSignOut();
  }, [onSignOut]);
  const MENU_ITEMS = [{
    name: 'Order History',
    id: 'accountMenu.orderHistoryLink',
    url: '/order-history'
  }, {
    name: 'Store Credit & Gift Cards',
    id: 'accountMenu.storeCreditLink',
    url: ''
  }, {
    name: 'Favorites Lists',
    id: 'accountMenu.favoritesListsLink',
    url: '/wishlist'
  }, {
    name: 'Address Book',
    id: 'accountMenu.addressBookLink',
    url: '/address-book'
  }, {
    name: 'Saved Payments',
    id: 'accountMenu.savedPaymentsLink',
    url: '/saved-payments'
  }, {
    name: 'Communications',
    id: 'accountMenu.communicationsLink',
    url: '/communications'
  }, {
    name: 'Account Information',
    id: 'accountMenu.accountInfoLink',
    url: '/account-information'
  }];
  return {
    handleSignOut,
    menuItems: MENU_ITEMS
  };
};

exports.useAccountMenuItems = useAccountMenuItems;
//# sourceMappingURL=useAccountMenuItems.js.map