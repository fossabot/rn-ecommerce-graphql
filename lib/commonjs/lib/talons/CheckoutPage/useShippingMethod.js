"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShippingMethod = exports.displayStates = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("@magento/peregrine/lib/context/cart");

var _user = require("@magento/peregrine/lib/context/user");

const displayStates = {
  DONE: 'done',
  EDITING: 'editing',
  INITIALIZING: 'initializing'
};
exports.displayStates = displayStates;

const serializeShippingMethod = method => {
  if (!method) return '';
  const {
    carrier_code,
    method_code
  } = method;
  return "".concat(carrier_code, "|").concat(method_code);
};

const deserializeShippingMethod = serializedValue => {
  return serializedValue.split('|');
}; // Sorts available shipping methods by price.


const byPrice = (a, b) => a.amount.value - b.amount.value; // Adds a serialized property to shipping method objects
// so they can be selected in the radio group.


const addSerializedProperty = shippingMethod => {
  if (!shippingMethod) return shippingMethod;
  const serializedValue = serializeShippingMethod(shippingMethod);
  return { ...shippingMethod,
    serializedValue
  };
};

const DEFAULT_SELECTED_SHIPPING_METHOD = null;
const DEFAULT_AVAILABLE_SHIPPING_METHODS = [];

const useShippingMethod = props => {
  const {
    onSave,
    mutations: {
      setShippingMethod
    },
    queries: {
      getSelectedAndAvailableShippingMethods
    },
    setPageIsUpdating
  } = props;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  /*
   *  Apollo Hooks.
   */

  const [setShippingMethodCall, {
    error: setShippingMethodError,
    loading: isSettingShippingMethod
  }] = (0, _client.useMutation)(setShippingMethod);
  const {
    data,
    loading: isLoadingShippingMethods
  } = (0, _client.useQuery)(getSelectedAndAvailableShippingMethods, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !cartId,
    variables: {
      cartId
    }
  });
  /*
   *  State / Derived state.
   */

  const [isUpdateMode, setIsUpdateMode] = (0, _react.useState)(false);
  const hasData = data && data.cart.shipping_addresses.length && data.cart.shipping_addresses[0].selected_shipping_method;
  const derivedPrimaryShippingAddress = data && data.cart.shipping_addresses && data.cart.shipping_addresses.length ? data.cart.shipping_addresses[0] : null;
  const derivedSelectedShippingMethod = derivedPrimaryShippingAddress ? addSerializedProperty(derivedPrimaryShippingAddress.selected_shipping_method) : DEFAULT_SELECTED_SHIPPING_METHOD;
  const derivedShippingMethods = (0, _react.useMemo)(() => {
    if (!derivedPrimaryShippingAddress) return DEFAULT_AVAILABLE_SHIPPING_METHODS; // Shape the list of available shipping methods.
    // Sort them by price and add a serialized property to each.

    const rawShippingMethods = derivedPrimaryShippingAddress.available_shipping_methods;
    const shippingMethodsByPrice = [...rawShippingMethods].sort(byPrice);
    const result = shippingMethodsByPrice.map(addSerializedProperty);
    return result;
  }, [derivedPrimaryShippingAddress]); // Determine the component's display state.

  const isBackgroundAutoSelecting = isSignedIn && !derivedSelectedShippingMethod && Boolean(derivedShippingMethods.length);
  const displayState = derivedSelectedShippingMethod ? displayStates.DONE : isLoadingShippingMethods || isSettingShippingMethod && isBackgroundAutoSelecting ? displayStates.INITIALIZING : displayStates.EDITING;
  /*
   *  Callbacks.
   */

  const handleSubmit = (0, _react.useCallback)(async value => {
    const [carrierCode, methodCode] = deserializeShippingMethod(value.shipping_method);
    setPageIsUpdating(true);

    try {
      await setShippingMethodCall({
        variables: {
          cartId,
          shippingMethod: {
            carrier_code: carrierCode,
            method_code: methodCode
          }
        }
      });
    } catch {
      return;
    } finally {
      setPageIsUpdating(false);
    }

    setIsUpdateMode(false);
  }, [cartId, setIsUpdateMode, setPageIsUpdating, setShippingMethodCall]);
  const handleCancelUpdate = (0, _react.useCallback)(() => {
    setIsUpdateMode(false);
  }, []);
  const showUpdateMode = (0, _react.useCallback)(() => {
    setIsUpdateMode(true);
  }, []);
  /*
   *  Effects.
   */
  // When we have data we should tell the checkout page
  // so that it can set the step correctly.

  (0, _react.useEffect)(() => {
    if (hasData) {
      onSave();
    }
  }, [hasData, onSave]); // If an authenticated user does not have a preferred shipping method,
  // auto-select the least expensive one for them.

  (0, _react.useEffect)(() => {
    if (!data) return;
    if (!cartId) return;
    if (!isSignedIn) return;

    if (!derivedSelectedShippingMethod) {
      // The shipping methods are sorted by price.
      const leastExpensiveShippingMethod = derivedShippingMethods[0];

      if (leastExpensiveShippingMethod) {
        const {
          carrier_code,
          method_code
        } = leastExpensiveShippingMethod;
        setShippingMethodCall({
          variables: {
            cartId,
            shippingMethod: {
              carrier_code,
              method_code
            }
          }
        });
      }
    }
  }, [cartId, data, derivedSelectedShippingMethod, derivedShippingMethods, isSignedIn, setShippingMethodCall]);
  const errors = (0, _react.useMemo)(() => new Map([['setShippingMethod', setShippingMethodError]]), [setShippingMethodError]);
  return {
    displayState,
    errors,
    handleCancelUpdate,
    handleSubmit,
    isLoading: isLoadingShippingMethods,
    isUpdateMode,
    selectedShippingMethod: derivedSelectedShippingMethod,
    shippingMethods: derivedShippingMethods,
    showUpdateMode
  };
};

exports.useShippingMethod = useShippingMethod;
//# sourceMappingURL=useShippingMethod.js.map