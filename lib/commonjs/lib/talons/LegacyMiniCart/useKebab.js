"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useKebab = void 0;

var _react = require("react");

var _peregrine = require("@magento/peregrine");

// TODO: Compare with `useDropdown` and consolidate if possible.
const useKebab = () => {
  const kebabRef = (0, _react.useRef)(null);
  const [isOpen, setIsOpen] = (0, _react.useState)(false);
  const handleKebabClick = (0, _react.useCallback)(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);
  const handleOutsideKebabClick = (0, _react.useCallback)(event => {
    // Ensure we're truly outside of the kebab.
    if (!kebabRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);
  (0, _peregrine.useEventListener)(document, 'mousedown', handleOutsideKebabClick);
  (0, _peregrine.useEventListener)(document, 'touchend', handleOutsideKebabClick);
  return {
    handleKebabClick,
    isOpen,
    kebabRef
  };
};

exports.useKebab = useKebab;
//# sourceMappingURL=useKebab.js.map