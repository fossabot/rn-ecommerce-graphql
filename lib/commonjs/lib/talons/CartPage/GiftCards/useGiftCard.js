"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useGiftCard = void 0;

var _react = require("react");

/**
 * Provide logic for a single gift card component.
 *
 * @function
 *
 * @param {Object} props
 * @param {String} props.code Gift card's code
 * @param {function} props.removeGiftCard A function that removes a gift card when provided a code
 *
 * @return {GiftCardTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useGiftCard } from '@magento/peregrine/lib/talons/CartPage/GiftCards/useGiftCard';
 */
const useGiftCard = props => {
  const {
    code,
    removeGiftCard
  } = props;
  const removeGiftCardWithCode = (0, _react.useCallback)(() => {
    removeGiftCard(code);
  }, [code, removeGiftCard]);
  return {
    removeGiftCardWithCode
  };
};
/** JSDoc type definitions */

/**
 * Props data to use when rendering a single gift card component.
 * @typedef {Object} GiftCardTalonProps
 *
 * @property {function} removeGiftCardWithCode Function for removing a gift card associated with the code passed into this talon.
 */


exports.useGiftCard = useGiftCard;
//# sourceMappingURL=useGiftCard.js.map