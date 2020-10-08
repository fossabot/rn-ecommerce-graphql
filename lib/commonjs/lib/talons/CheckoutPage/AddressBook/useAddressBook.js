"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAddressBook = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _app = require("../../../context/app");

var _cart = require("../../../context/cart");

var _user = require("../../../context/user");

var _deriveErrorMessage = require("../../../util/deriveErrorMessage");

const useAddressBook = props => {
  const {
    mutations: {
      setCustomerAddressOnCartMutation
    },
    queries: {
      getCustomerAddressesQuery,
      getCustomerCartAddressQuery
    },
    toggleActiveContent
  } = props;
  const [, {
    toggleDrawer
  }] = (0, _app.useAppContext)();
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const addressCount = (0, _react.useRef)();
  const [activeAddress, setActiveAddress] = (0, _react.useState)();
  const [selectedAddress, setSelectedAddress] = (0, _react.useState)();
  const [setCustomerAddressOnCart, {
    error: setCustomerAddressOnCartError,
    loading: setCustomerAddressOnCartLoading
  }] = (0, _client.useMutation)(setCustomerAddressOnCartMutation);
  const {
    data: customerAddressesData,
    loading: customerAddressesLoading
  } = (0, _client.useQuery)(getCustomerAddressesQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !isSignedIn
  });
  const {
    data: customerCartAddressData,
    loading: customerCartAddressLoading
  } = (0, _client.useQuery)(getCustomerCartAddressQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !isSignedIn
  });
  const derivedErrorMessage = (0, _react.useMemo)(() => (0, _deriveErrorMessage.deriveErrorMessage)([setCustomerAddressOnCartError]), [setCustomerAddressOnCartError]);
  const isLoading = customerAddressesLoading || customerCartAddressLoading || setCustomerAddressOnCartLoading;
  const customerAddresses = customerAddressesData && customerAddressesData.customer.addresses || [];
  (0, _react.useEffect)(() => {
    if (customerAddresses.length !== addressCount.current) {
      // Auto-select newly added address when count changes
      if (addressCount.current) {
        const newestAddress = customerAddresses[customerAddresses.length - 1];
        setSelectedAddress(newestAddress.id);
      }

      addressCount.current = customerAddresses.length;
    }
  }, [customerAddresses]);
  const handleEditAddress = (0, _react.useCallback)(address => {
    setActiveAddress(address);
    toggleDrawer('shippingInformation.edit');
  }, [toggleDrawer]);
  const handleAddAddress = (0, _react.useCallback)(() => {
    handleEditAddress();
  }, [handleEditAddress]);
  const handleSelectAddress = (0, _react.useCallback)(addressId => {
    setSelectedAddress(addressId);
  }, []); // GraphQL doesn't return which customer address is selected, so perform
  // a simple search to initialize this selected address value.

  if (customerAddresses.length && customerCartAddressData && !selectedAddress) {
    const {
      customerCart
    } = customerCartAddressData;
    const {
      shipping_addresses: shippingAddresses
    } = customerCart;

    if (shippingAddresses.length) {
      const primaryCartAddress = shippingAddresses[0];
      const foundSelectedAddress = customerAddresses.find(customerAddress => customerAddress.street[0] === primaryCartAddress.street[0] && customerAddress.firstname === primaryCartAddress.firstname && customerAddress.lastname === primaryCartAddress.lastname);

      if (foundSelectedAddress) {
        setSelectedAddress(foundSelectedAddress.id);
      }
    }
  }

  const handleApplyAddress = (0, _react.useCallback)(async () => {
    try {
      await setCustomerAddressOnCart({
        variables: {
          cartId,
          addressId: selectedAddress
        }
      });
    } catch {
      return;
    }

    toggleActiveContent();
  }, [cartId, selectedAddress, setCustomerAddressOnCart, toggleActiveContent]);
  const handleCancel = (0, _react.useCallback)(() => {
    setSelectedAddress();
    toggleActiveContent();
  }, [toggleActiveContent]);
  return {
    activeAddress,
    customerAddresses,
    errorMessage: derivedErrorMessage,
    isLoading,
    handleAddAddress,
    handleApplyAddress,
    handleCancel,
    handleSelectAddress,
    handleEditAddress,
    selectedAddress
  };
};

exports.useAddressBook = useAddressBook;
//# sourceMappingURL=useAddressBook.js.map