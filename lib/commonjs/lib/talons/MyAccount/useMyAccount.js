"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMyAccount = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _app = require("@magento/peregrine/lib/context/app");

/**
 * The useMyAccount talon complements the MyAccount component.
 *
 * @param {Object}      props
 * @param {Function}    props.onSignOut - a function to call when the user signs out.
 *
 * @returns {Object}    result
 * @returns {Function}  result.handleSignOut - A callback function to attach to the sign out button.
 */
const useMyAccount = props => {
  const {
    onSignOut
  } = props;
  const [, {
    closeDrawer
  }] = (0, _app.useAppContext)();
  const location = (0, _reactRouterDom.useLocation)();
  const shouldCloseDrawer = (0, _react.useRef)(false);
  const handleSignOut = (0, _react.useCallback)(() => {
    closeDrawer();
    onSignOut();
  }, [closeDrawer, onSignOut]); // Whenever the page changes, close the drawer.

  (0, _react.useEffect)(() => {
    // The very first time MyAccount renders, this effect is fired.
    // Don't close the drawer on that occasion, but do so every time
    // location changes thereafter.
    if (shouldCloseDrawer.current) {
      closeDrawer();
    } else {
      shouldCloseDrawer.current = true;
    }
  }, [closeDrawer, location.key]);
  return {
    handleSignOut
  };
};

exports.useMyAccount = useMyAccount;
//# sourceMappingURL=useMyAccount.js.map