"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShippingInformation = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _app = require("../../../context/app");

var _cart = require("../../../context/cart");

var _user = require("../../../context/user");

var _useShippingForm = require("../../CartPage/PriceAdjustments/ShippingMethods/useShippingForm");

const useShippingInformation = props => {
  const {
    mutations: {
      setDefaultAddressOnCartMutation
    },
    onSave,
    queries: {
      getDefaultShippingQuery,
      getShippingInformationQuery
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
  const [hasUpdate, setHasUpdate] = (0, _react.useState)(false);
  const hasLoadedData = (0, _react.useRef)(false);
  const {
    data: shippingInformationData,
    loading: getShippingInformationLoading
  } = (0, _client.useQuery)(getShippingInformationQuery, {
    skip: !cartId,
    variables: {
      cartId
    }
  });
  const {
    data: defaultShippingData,
    loading: getDefaultShippingLoading
  } = (0, _client.useQuery)(getDefaultShippingQuery, {
    skip: !isSignedIn
  });
  const [setDefaultAddressOnCart, {
    loading: setDefaultAddressLoading
  }] = (0, _client.useMutation)(setDefaultAddressOnCartMutation);
  const isLoading = getShippingInformationLoading || getDefaultShippingLoading || setDefaultAddressLoading;
  const shippingData = (0, _react.useMemo)(() => {
    let filteredData;

    if (shippingInformationData) {
      const {
        cart
      } = shippingInformationData;
      const {
        email,
        shipping_addresses: shippingAddresses
      } = cart;

      if (shippingAddresses.length) {
        const primaryAddress = { ...shippingAddresses[0]
        };

        for (const field in _useShippingForm.MOCKED_ADDRESS) {
          if (primaryAddress[field] === _useShippingForm.MOCKED_ADDRESS[field]) {
            primaryAddress[field] = '';
          }

          if (field === 'street' && primaryAddress[field][0] === _useShippingForm.MOCKED_ADDRESS[field][0]) {
            primaryAddress[field] = [''];
          }
        }

        filteredData = {
          email,
          ...primaryAddress
        };
      }
    }

    return filteredData;
  }, [shippingInformationData]); // Simple heuristic to check shipping data existed prior to this render.
  // On first submission, when we have data, we should tell the checkout page
  // so that we set the next step correctly.

  const doneEditing = !!shippingData && !!shippingData.city;
  (0, _react.useEffect)(() => {
    if (doneEditing) {
      onSave();
    }
  }, [doneEditing, onSave]);
  (0, _react.useEffect)(() => {
    let updateTimer;

    if (shippingData !== undefined) {
      if (hasLoadedData.current) {
        setHasUpdate(true);
        updateTimer = setTimeout(() => {
          setHasUpdate(false);
        }, 2000);
      } else {
        hasLoadedData.current = true;
      }
    }

    return () => {
      if (updateTimer) {
        clearTimeout(updateTimer);
      }
    };
  }, [hasLoadedData, shippingData]);
  (0, _react.useEffect)(() => {
    if (shippingInformationData && !doneEditing && cartId && defaultShippingData) {
      const {
        customer
      } = defaultShippingData;
      const {
        default_shipping: defaultAddressId
      } = customer;

      if (defaultAddressId) {
        setDefaultAddressOnCart({
          variables: {
            cartId,
            addressId: parseInt(defaultAddressId)
          }
        });
      }
    }
  }, [cartId, doneEditing, defaultShippingData, setDefaultAddressOnCart, shippingInformationData]);
  const handleEditShipping = (0, _react.useCallback)(() => {
    if (isSignedIn) {
      toggleActiveContent();
    } else {
      toggleDrawer('shippingInformation.edit');
    }
  }, [isSignedIn, toggleActiveContent, toggleDrawer]);
  return {
    doneEditing,
    handleEditShipping,
    hasUpdate,
    isLoading,
    isSignedIn,
    shippingData
  };
};

exports.useShippingInformation = useShippingInformation;
//# sourceMappingURL=useShippingInformation.js.map