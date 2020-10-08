"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNavigationTrigger = void 0;

var _react = require("react");

var _app = require("@magento/peregrine/lib/context/app");

const useNavigationTrigger = () => {
  const [, {
    toggleDrawer
  }] = (0, _app.useAppContext)();
  const handleOpenNavigation = (0, _react.useCallback)(() => {
    toggleDrawer('nav');
  }, [toggleDrawer]);
  return {
    handleOpenNavigation
  };
};

exports.useNavigationTrigger = useNavigationTrigger;
//# sourceMappingURL=useNavigationTrigger.js.map