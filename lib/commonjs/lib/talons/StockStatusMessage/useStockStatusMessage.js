"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStockStatusMessage = void 0;

var _react = require("react");

const useStockStatusMessage = props => {
  const {
    cartItems
  } = props;
  const hasOutOfStockItem = (0, _react.useMemo)(() => {
    if (cartItems) {
      const isOutOfStock = cartItems.find(cartItem => {
        const {
          product
        } = cartItem;
        const {
          stock_status: stockStatus
        } = product;
        return stockStatus === 'OUT_OF_STOCK';
      });
      return !!isOutOfStock;
    }
  }, [cartItems]);
  return {
    hasOutOfStockItem
  };
};

exports.useStockStatusMessage = useStockStatusMessage;
//# sourceMappingURL=useStockStatusMessage.js.map