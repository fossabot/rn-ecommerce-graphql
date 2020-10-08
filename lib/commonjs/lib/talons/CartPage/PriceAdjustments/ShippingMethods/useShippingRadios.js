"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useShippingRadios = void 0;

var _react = require("react");

var _informed = require("informed");

var _client = require("@apollo/client");

var _cart = require("../../../../context/cart");

/**
 * Contains logic for a component that renders a radio selector for shipping.
 * It performs effects and returns props data used for rendering that component.
 *
 * This talon performs the following effects:
 *
 * - Sets the value of the shipping method to a default value if there is no current method selected
 * - Manage the updating state of the cart while a shipping method is being applied
 *
 * @function
 *
 * @param {Object} props
 * @param {function} props.setIsCartUpdating Function for setting the updating state of the shopping cart
 * @param {String} props.selectedShippingMethod A serialized string of <carrier-code>|<method-code>, eg. usps|priority.
 * @param {Array<Object>} props.shippingMethods An array of available shipping methods
 * @param {ShippingRadiosMutations} props.mutations GraphQL mutations for a shipping radio selector component.
 *
 * @return {ShippingRadiosTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useShippingRadios } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/ShippingMethods/useShippingRadios';
 */
const useShippingRadios = props => {
  const {
    setIsCartUpdating,
    selectedShippingMethod,
    shippingMethods,
    mutations: {
      setShippingMethodMutation
    }
  } = props;
  const shippingMethodFieldApi = (0, _informed.useFieldApi)('method');
  const [setShippingMethod, {
    called: setShippingMethodCalled,
    loading: setShippingMethodLoading
  }] = (0, _client.useMutation)(setShippingMethodMutation);
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const formattedShippingMethods = shippingMethods.map(shippingMethod => ({ ...shippingMethod,
    serializedValue: "".concat(shippingMethod.carrier_code, "|").concat(shippingMethod.method_code)
  }));
  (0, _react.useEffect)(() => {
    const currentMethod = shippingMethodFieldApi.getValue();

    if (!currentMethod) {
      const defaultFirstMethod = formattedShippingMethods[0];

      if (defaultFirstMethod) {
        shippingMethodFieldApi.setValue(defaultFirstMethod.serializedValue);
      }
    }
  }, [formattedShippingMethods, selectedShippingMethod, shippingMethodFieldApi]);
  const handleShippingSelection = (0, _react.useCallback)(value => {
    const [carrierCode, methodCode] = value.split('|');
    setShippingMethod({
      variables: {
        cartId,
        shippingMethod: {
          carrier_code: carrierCode,
          method_code: methodCode
        }
      }
    });
  }, [cartId, setShippingMethod]);
  (0, _react.useEffect)(() => {
    if (setShippingMethodCalled) {
      // If a shipping mutation is in flight, tell the cart.
      setIsCartUpdating(setShippingMethodLoading);
    }
  }, [setIsCartUpdating, setShippingMethodCalled, setShippingMethodLoading]);
  return {
    formattedShippingMethods,
    handleShippingSelection
  };
};
/** JSDoc type definitions */

/**
 * GraphQL mutations for a shipping radio selector component.
 * This is a type used by the {@link useShippingRadios} talon.
 *
 * @typedef {Object} ShippingRadiosMutations
 *
 * @property {GraphQLAST} setShippingMethodMutation Mutation for setting the shipping method on a cart.
 */

/**
 * Object type returned by the {@link useShippingRadios} talon.
 * It provides data to use when rendering a radio selector for shipping methods.
 *
 * @typedef {Object} ShippingRadiosTalonProps
 *
 * @property {Object} formattedShippingMethods Shipping method data that has been formatted.
 * @property {function} handleShippingSelection Callback function for handling shipping selection form updates.
 */


exports.useShippingRadios = useShippingRadios;
//# sourceMappingURL=useShippingRadios.js.map