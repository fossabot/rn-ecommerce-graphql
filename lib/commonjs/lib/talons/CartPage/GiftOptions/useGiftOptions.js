"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _lodash = _interopRequireDefault(require("lodash.throttle"));

var _client = require("@apollo/client");

var _cart = require("@magento/peregrine/lib/context/cart");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * This talon contains the logic for a gift options component.
 * It performs effects and returns a data object containing values for rendering the component.
 *
 * This talon performs the following effects:
 *
 * - Fetch the gift options associated with the cart
 * - Update the {@link GiftOptionsTalonProps} values with the data returned by the query
 *
 * @function
 *
 * @param {Object} props
 * @param {GiftOptionsMutations} props.mutations GraphQL mutations for Gift Options
 * @param {GiftOptionsQueries} props.queries GraphQL queries for Gift Options
 *
 * @returns {GiftOptionsTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useGiftOptions } from '@magento/peregrine/lib/talons/CartPage/GiftOptions/useGiftOptions';
 */
const useGiftOptions = props => {
  const {
    queries: {
      getGiftOptionsQuery
    }
  } = props;
  /**
   * Using local state instead of awaiting data from mutation to avoid
   * weird UX issues generated due to network latency.
   */

  const [includeGiftReceipt, setIncludeGiftReceipt] = (0, _react.useState)(false);
  const [includePrintedCard, setIncludePrintedCard] = (0, _react.useState)(false);
  const [giftMessage, setGiftMessage] = (0, _react.useState)('');
  const apolloClient = (0, _client.useApolloClient)();
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const {
    data
  } = (0, _client.useQuery)(getGiftOptionsQuery, {
    skip: !cartId,
    variables: {
      cartId
    }
  });
  const updateGiftOptions = (0, _react.useCallback)(optionsToUpdate => {
    apolloClient.cache.writeQuery({
      query: getGiftOptionsQuery,
      variables: {
        cart_id: cartId
      },
      data: {
        cart: {
          __typename: 'Cart',
          id: cartId,
          include_gift_receipt: includeGiftReceipt,
          include_printed_card: includePrintedCard,
          gift_message: giftMessage,
          ...optionsToUpdate
        }
      }
    });
  }, [apolloClient.cache, cartId, getGiftOptionsQuery, giftMessage, includeGiftReceipt, includePrintedCard]);
  /**
   * @ignore
   *
   * Throttling message update. Only make 1 mutation
   * every 1 second. This is to save on bandwidth.
   *
   * More info: https://lodash.com/docs/4.17.15#throttle
   */

  const throttledMessageUpdate = (0, _react.useMemo)(() => {
    return (0, _lodash.default)((updateGiftOptions, newGiftMessage) => {
      updateGiftOptions({
        gift_message: newGiftMessage
      });
    }, 1000, {
      leading: false
    });
  }, []);
  const updateGiftMessage = (0, _react.useCallback)(e => {
    const newGiftMessage = e.target.value;
    setGiftMessage(newGiftMessage);
    throttledMessageUpdate(updateGiftOptions, newGiftMessage);
  }, [setGiftMessage, throttledMessageUpdate, updateGiftOptions]);
  const toggleIncludeGiftReceiptFlag = (0, _react.useCallback)(() => {
    setIncludeGiftReceipt(!includeGiftReceipt);
    updateGiftOptions({
      include_gift_receipt: !includeGiftReceipt
    });
  }, [updateGiftOptions, includeGiftReceipt, setIncludeGiftReceipt]);
  const toggleIncludePrintedCardFlag = (0, _react.useCallback)(() => {
    setIncludePrintedCard(!includePrintedCard);
    updateGiftOptions({
      include_printed_card: !includePrintedCard
    });
  }, [updateGiftOptions, includePrintedCard, setIncludePrintedCard]);
  /**
   * Once data is available from the query request, update
   * the respective values.
   */

  (0, _react.useEffect)(() => {
    if (data) {
      const {
        include_gift_receipt,
        include_printed_card,
        gift_message
      } = data.cart;
      setIncludeGiftReceipt(include_gift_receipt);
      setIncludePrintedCard(include_printed_card);
      setGiftMessage(gift_message);
    }
  }, [setIncludeGiftReceipt, setIncludePrintedCard, data]);
  return {
    includeGiftReceipt,
    includePrintedCard,
    giftMessage,
    toggleIncludeGiftReceiptFlag,
    toggleIncludePrintedCardFlag,
    updateGiftMessage
  };
};

var _default = useGiftOptions;
/** JSDocs type definitions */

/**
 * GraphQL mutations for Gift Options
 *
 * @typedef {Object} GiftOptionsMutations
 *
 * @property {GraphQLAST} setGiftOptionsMutation Mutation to use for setting the gift options for the cart
 *
 * @see [giftOptions.gql.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/GiftOptions/giftOptions.gql.js}
 * for the query Venia uses.
 */

/**
 * GraphQL query for Gift Options
 *
 * @typedef {Object} GiftOptionsQueries
 *
 * @property {GraphQLAST} getGiftOptionsQuery Query to get gift options data
 *
 * @see [giftOptions.gql.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/GiftOptions/giftOptions.gql.js}
 * for the query Venia uses.
 */

/**
 * Props data to use when rendering a gift options component.
 *
 * @typedef {Object} GiftOptionsTalonProps
 *
 * @property {boolean} includeGiftReceipt True if a gift receipt should be included. False otherwise.
 * @property {boolean} includePrintedCard True if a printed card should be included. False otherwise.
 * @property {String} giftMessage Message to include with a gift.
 * @property {function} toggleIncludeGiftReceiptFlag Toggles the value of the `includeGiftReceipt` value.
 * @property {function} toggleIncludePrintedCardFlag Toggles the value of the `includePrintedCard` value.
 * @property {function} updateGiftMessage Updates the gift message value.
 *
 */

exports.default = _default;
//# sourceMappingURL=useGiftOptions.js.map