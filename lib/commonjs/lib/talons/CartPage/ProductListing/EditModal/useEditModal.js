"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useEditModal = void 0;

var _react = require("react");

var _app = require("../../../../context/app");

/**
 * This talon contains logic for a product edit modal used on a cart page.
 * It returns prop data for rendering an interactive modal component.
 *
 * @function
 *
 * @return {EditModalTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useEditModal } from '@magento/peregrine/lib/talons/CartPage/ProductListing/EditModal/useEditModal';
 */
const useEditModal = () => {
  const [{
    drawer
  }, {
    closeDrawer
  }] = (0, _app.useAppContext)();
  const isOpen = drawer === 'product.edit';
  const [variantPrice, setVariantPrice] = (0, _react.useState)(null);
  return {
    handleClose: closeDrawer,
    isOpen,
    setVariantPrice,
    variantPrice
  };
};
/** JSDocs type definitions */

/**
 * Object type returned by the {@link useEditModal} talon.
 * It provides props data for rendering an edit modal component.
 *
 * @typedef {Object} EditModalTalonProps
 *
 * @property {function} handleClose Callback function for handling the closing event of the modal.
 * @property {boolean} isOpen True if the modal is open. False otherwise.
 * @property {function} setVariantPrice Function for setting a product's variant price.
 * @property {Object} variantPrice The variant price for a product. See [Money object]{@link https://devdocs.magento.com/guides/v2.4/graphql/product/product-interface.html#Money}.
 */


exports.useEditModal = useEditModal;
//# sourceMappingURL=useEditModal.js.map