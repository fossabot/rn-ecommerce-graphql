"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useItem = void 0;

var _react = require("react");

const useItem = props => {
  const {
    id,
    handleRemoveItem
  } = props;
  const [isDeleting, setIsDeleting] = (0, _react.useState)(false);
  const removeItem = (0, _react.useCallback)(() => {
    setIsDeleting(true);
    handleRemoveItem(id);
  }, [handleRemoveItem, id]);
  return {
    isDeleting,
    removeItem
  };
};

exports.useItem = useItem;
//# sourceMappingURL=useItem.js.map