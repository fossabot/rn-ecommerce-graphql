"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccountTrigger = void 0;

var _react = require("react");

var _useDropdown = require("@magento/peregrine/lib/hooks/useDropdown");

/**
 * The useAccountTrigger talon complements the AccountTrigger component.
 *
 * @returns {Object}    talonProps
 * @returns {Boolean}   talonProps.accountMenuIsOpen - Whether the menu that this trigger toggles is open or not.
 * @returns {Function}  talonProps.setAccountMenuIsOpen  - Set the value of accoutMenuIsOpen.
 * @returns {Ref}       talonProps.accountMenuRef - A React ref to the menu that this trigger toggles.
 * @returns {Ref}       talonProps.accountMenuTriggerRef - A React ref to the trigger element itself.
 * @returns {Function}  talonProps.handleTriggerClick - A function for handling when the trigger is clicked.
 */
const useAccountTrigger = () => {
  const {
    elementRef: accountMenuRef,
    expanded: accountMenuIsOpen,
    setExpanded: setAccountMenuIsOpen,
    triggerRef: accountMenuTriggerRef
  } = (0, _useDropdown.useDropdown)();
  const handleTriggerClick = (0, _react.useCallback)(() => {
    // Toggle the Account Menu.
    setAccountMenuIsOpen(isOpen => !isOpen);
  }, [setAccountMenuIsOpen]);
  return {
    accountMenuIsOpen,
    accountMenuRef,
    accountMenuTriggerRef,
    setAccountMenuIsOpen,
    handleTriggerClick
  };
};

exports.useAccountTrigger = useAccountTrigger;
//# sourceMappingURL=useAccountTrigger.js.map