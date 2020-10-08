"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeader = void 0;

var _react = require("react");

var _app = require("@magento/peregrine/lib/context/app");

var _useDropdown = require("@magento/peregrine/lib/hooks/useDropdown");

const useHeader = () => {
  const [{
    hasBeenOffline,
    isOnline,
    isPageLoading
  }] = (0, _app.useAppContext)();
  const {
    elementRef: searchRef,
    expanded: isSearchOpen,
    setExpanded: setIsSearchOpen,
    triggerRef: searchTriggerRef
  } = (0, _useDropdown.useDropdown)();
  const handleSearchTriggerClick = (0, _react.useCallback)(() => {
    // Toggle the Search input form.
    setIsSearchOpen(isOpen => !isOpen);
  }, [setIsSearchOpen]);
  return {
    handleSearchTriggerClick,
    hasBeenOffline,
    isOnline,
    isPageLoading,
    isSearchOpen,
    searchRef,
    searchTriggerRef
  };
};

exports.useHeader = useHeader;
//# sourceMappingURL=useHeader.js.map