"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useReceipt = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _checkout = require("@magento/peregrine/lib/context/checkout");

var _user = require("@magento/peregrine/lib/context/user");

var _app = require("@magento/peregrine/lib/context/app");

const useReceipt = props => {
  const {
    onClose
  } = props;
  const [{
    drawer
  }] = (0, _app.useAppContext)();
  const [, {
    createAccount,
    resetReceipt
  }] = (0, _checkout.useCheckoutContext)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const history = (0, _reactRouterDom.useHistory)(); // When the drawer is closed reset the state of the receipt. We use a ref
  // because drawer can change if the mask is clicked. Mask updates drawer.

  const prevDrawer = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    if (prevDrawer.current === 'cart' && drawer !== 'cart') {
      resetReceipt();
      onClose();
    }

    prevDrawer.current = drawer;
  }, [drawer, onClose, resetReceipt]);
  const handleCreateAccount = (0, _react.useCallback)(() => {
    createAccount({
      history
    });
  }, [createAccount, history]);
  const handleViewOrderDetails = (0, _react.useCallback)(() => {// TODO: Implement/connect/redirect to order details page.
  }, []);
  return {
    handleCreateAccount,
    handleViewOrderDetails,
    isSignedIn
  };
};

exports.useReceipt = useReceipt;
//# sourceMappingURL=useReceipt.js.map