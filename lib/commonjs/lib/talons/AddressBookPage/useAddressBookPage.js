"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddressBookPage = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _client = require("@apollo/client");

var _app = require("@magento/peregrine/lib/context/app");

var _user = require("@magento/peregrine/lib/context/user");

/**
 *  A talon to support the functionality of the Address Book page.
 *
 *  @param {Object} props
 *  @param {Object} props.queries - GraphQL queries to be run by the talon.
 *
 *
 *  @returns {Object}   talonProps
 *  @returns {Object}   talonProps.data - The user's address book data.
 *  @returns {Boolean}  talonProps.isLoading - Indicates whether the user's
 *      address book data is loading.
 */
const useAddressBookPage = props => {
  const {
    queries: {
      getCustomerAddressesQuery
    }
  } = props;
  const [, {
    actions: {
      setPageLoading
    }
  }] = (0, _app.useAppContext)();
  const history = (0, _reactRouterDom.useHistory)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const {
    data: customerAddressesData,
    loading
  } = (0, _client.useQuery)(getCustomerAddressesQuery, {
    skip: !isSignedIn
  }); // If the user is no longer signed in, redirect to the home page.

  (0, _react.useEffect)(() => {
    if (!isSignedIn) {
      history.push('/');
    }
  }, [history, isSignedIn]); // Update the page indicator if the GraphQL query is in flight.

  (0, _react.useEffect)(() => {
    setPageLoading(loading);
  }, [loading, setPageLoading]);
  const handleAddAddress = (0, _react.useCallback)(() => {
    alert('TODO!');
  }, []);
  const customerAddresses = customerAddressesData && customerAddressesData.customer && customerAddressesData.customer.addresses || [];
  return {
    customerAddresses,
    handleAddAddress
  };
};

exports.useAddressBookPage = useAddressBookPage;
//# sourceMappingURL=useAddressBookPage.js.map