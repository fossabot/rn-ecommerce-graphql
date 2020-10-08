"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWishlist = void 0;

var _react = require("react");

const useWishlist = () => {
  const [isOpen, setIsOpen] = (0, _react.useState)(true);

  const handleContentToggle = () => {
    setIsOpen(currentValue => !currentValue);
  };

  const handleActionMenuClick = (0, _react.useCallback)(() => {
    console.log('To be handled by PWA-632');
  }, []);
  return {
    handleActionMenuClick,
    handleContentToggle,
    isOpen
  };
};

exports.useWishlist = useWishlist;
//# sourceMappingURL=useWishlist.js.map