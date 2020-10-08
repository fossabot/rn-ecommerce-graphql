"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNavigationHeader = void 0;

var _react = require("react");

/**
 * The useNavigationHeader talon complements the NavigationHeader component.
 *
 * @param {Object}      props
 * @param {Boolean}     props.isTopLevel - Whether or not the user is seeing the top-most level in the view tree.
 * @param {Function}    props.onBack - A function to call when the user clicks the "back" button.
 * @param {String}      props.view - The current view in the navigation view tree.
 *
 * @returns {Object}    result
 * @returns {Function}  result.handleBack - A callback function to attach to the back button.
 * @returns {Boolean}   result.isTopLevelMenu - Whether the current view is the top-most in the view tree.
 */
const useNavigationHeader = props => {
  const {
    isTopLevel,
    onBack,
    view
  } = props;
  const isTopLevelMenu = isTopLevel && view === 'MENU';
  const handleBack = (0, _react.useCallback)(() => {
    onBack();
  }, [onBack]);
  return {
    handleBack,
    isTopLevelMenu
  };
};

exports.useNavigationHeader = useNavigationHeader;
//# sourceMappingURL=useNavigationHeader.js.map