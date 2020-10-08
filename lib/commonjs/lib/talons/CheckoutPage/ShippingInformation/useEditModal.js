"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditModal = void 0;

var _app = require("../../../context/app");

const useEditModal = () => {
  const [{
    drawer
  }, {
    closeDrawer
  }] = (0, _app.useAppContext)();
  const isOpen = drawer === 'shippingInformation.edit';
  return {
    handleClose: closeDrawer,
    isOpen
  };
};

exports.useEditModal = useEditModal;
//# sourceMappingURL=useEditModal.js.map