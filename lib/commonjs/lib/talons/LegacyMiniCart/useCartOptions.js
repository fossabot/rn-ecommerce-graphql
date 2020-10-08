"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCartOptions = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("@magento/peregrine/lib/context/cart");

var _useAwaitQuery = require("@magento/peregrine/lib/hooks/useAwaitQuery");

var _appendOptionsToPayload = require("../../util/appendOptionsToPayload");

var _isProductConfigurable = require("../../util/isProductConfigurable");

const isItemMissingOptions = (cartItem, configItem, numSelections) => {
  // Non-configurable products can't be missing options
  if (cartItem.product_type !== 'configurable') {
    return false;
  } // Configurable products are missing options if we have fewer
  // option selections than the product has options.


  const {
    configurable_options
  } = configItem;
  const numProductOptions = configurable_options.length;
  return numSelections < numProductOptions;
};

const useCartOptions = props => {
  const {
    addConfigurableProductToCartMutation,
    addSimpleProductToCartMutation,
    cartItem,
    configItem,
    createCartMutation,
    endEditItem,
    getCartDetailsQuery,
    removeItemMutation,
    updateItemMutation
  } = props;
  const {
    configurable_options: cartItemOptions,
    product,
    quantity: qty
  } = cartItem;
  const {
    name,
    price
  } = product;
  const {
    regularPrice
  } = price;
  const {
    amount
  } = regularPrice;
  const initialQuantity = qty;
  const [, {
    updateItemInCart
  }] = (0, _cart.useCartContext)();
  const [addConfigurableProductToCart] = (0, _client.useMutation)(addConfigurableProductToCartMutation);
  const [addSimpleProductToCart] = (0, _client.useMutation)(addSimpleProductToCartMutation);
  const [fetchCartId] = (0, _client.useMutation)(createCartMutation);
  const [removeItem] = (0, _client.useMutation)(removeItemMutation);
  const [updateItem] = (0, _client.useMutation)(updateItemMutation);
  const fetchCartDetails = (0, _useAwaitQuery.useAwaitQuery)(getCartDetailsQuery);
  const initialOptionSelections = (0, _react.useMemo)(() => {
    const result = new Map();

    if (cartItemOptions) {
      cartItemOptions.forEach(cartItemOption => {
        result.set(cartItemOption.id, cartItemOption.value_id);
      });
    }

    return result;
  }, [cartItemOptions]);
  const [optionSelections, setOptionSelections] = (0, _react.useState)(initialOptionSelections);
  const [quantity, setQuantity] = (0, _react.useState)(initialQuantity);
  const handleCancel = (0, _react.useCallback)(() => {
    endEditItem();
  }, [endEditItem]);
  const handleSelectionChange = (0, _react.useCallback)((optionId, selection) => {
    // We must create a new Map here so that React knows that the value
    // of optionSelections has changed.
    const nextOptionSelections = new Map([...optionSelections]); // There's a type difference in configurable option queries between
    // cart and product, casting to number is required. Can remove
    // cast once MC-29839 is resolved.

    nextOptionSelections.set(Number(optionId), selection);
    setOptionSelections(nextOptionSelections);
  }, [optionSelections]);
  const handleUpdate = (0, _react.useCallback)(async () => {
    // configItem is the updated item with new option selections
    // cartItem is the item currently in cart
    const payload = {
      item: configItem,
      productType: configItem.__typename,
      quantity,
      cartItemId: cartItem.id
    };

    if ((0, _isProductConfigurable.isProductConfigurable)(configItem)) {
      (0, _appendOptionsToPayload.appendOptionsToPayload)(payload, optionSelections);
    } // Provide the proper addItemMutation for the product type.


    let addItemMutation;

    if (payload.productType === 'ConfigurableProduct') {
      addItemMutation = addConfigurableProductToCart;
    } else {
      addItemMutation = addSimpleProductToCart;
    }

    await updateItemInCart({ ...payload,
      addItemMutation,
      fetchCartDetails,
      fetchCartId,
      removeItem,
      updateItem
    });
    endEditItem();
  }, [configItem, quantity, cartItem.id, updateItemInCart, fetchCartDetails, fetchCartId, removeItem, updateItem, endEditItem, optionSelections, addConfigurableProductToCart, addSimpleProductToCart]);
  const handleValueChange = (0, _react.useCallback)(value => {
    // Ensure that quantity remains an int.
    setQuantity(parseInt(value));
  }, [setQuantity]);
  const isMissingOptions = isItemMissingOptions(cartItem, configItem, optionSelections.size);
  const optionsChanged = (0, _react.useMemo)(() => {
    for (const [key, val] of initialOptionSelections) {
      const testVal = optionSelections.get(key);

      if (testVal !== val) {
        return true;
      }
    }

    return false;
  }, [initialOptionSelections, optionSelections]);
  const touched = (0, _react.useMemo)(() => {
    return quantity !== initialQuantity || optionsChanged;
  }, [quantity, initialQuantity, optionsChanged]);
  return {
    itemName: name,
    itemPrice: amount.value,
    initialQuantity,
    handleCancel,
    handleSelectionChange,
    handleUpdate,
    handleValueChange,
    isUpdateDisabled: isMissingOptions || !touched
  };
};

exports.useCartOptions = useCartOptions;
//# sourceMappingURL=useCartOptions.js.map