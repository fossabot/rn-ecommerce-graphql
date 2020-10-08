"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOrderRow = void 0;

var _react = require("react");

const useOrderRow = () => {
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const handleContentToggle = (0, _react.useCallback)(() => {
    setIsOpen(currentValue => !currentValue);
  }, []);
  return {
    isOpen,
    handleContentToggle
  };
};

exports.useOrderRow = useOrderRow;
//# sourceMappingURL=useOrderRow.js.map