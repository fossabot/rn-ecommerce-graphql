"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEmptyMiniCart = void 0;

var _react = require("react");

const useEmptyMiniCart = props => {
  const {
    closeDrawer
  } = props;
  const handleClick = (0, _react.useCallback)(() => {
    closeDrawer();
  }, [closeDrawer]);
  return {
    handleClick
  };
};

exports.useEmptyMiniCart = useEmptyMiniCart;
//# sourceMappingURL=useEmptyMiniCart.js.map