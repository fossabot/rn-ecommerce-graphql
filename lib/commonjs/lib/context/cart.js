"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCartContext = exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _client = require("@apollo/client");

var _graphqlTag = _interopRequireDefault(require("graphql-tag"));

var _useAwaitQuery = require("../hooks/useAwaitQuery");

var _actions = _interopRequireDefault(require("../store/actions/cart/actions"));

var asyncActions = _interopRequireWildcard(require("../store/actions/cart/asyncActions"));

var _bindActionCreators = _interopRequireDefault(require("../util/bindActionCreators"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject2() {
  const data = _taggedTemplateLiteral(["\n    query checkUserIsAuthed($cartId: String!) {\n        cart(cart_id: $cartId) {\n            # The purpose of this query is to check that the user is authorized\n            # to query on the current cart. Just fetch \"id\" to keep it small.\n            id\n        }\n    }\n"]);

  _templateObject2 = function () {
    return data;
  };

  return data;
}

function _templateObject() {
  const data = _taggedTemplateLiteral(["\n    mutation createCart {\n        cartId: createEmptyCart\n    }\n"]);

  _templateObject = function () {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const CartContext = /*#__PURE__*/(0, _react.createContext)();

const isCartEmpty = cart => !cart || !cart.details.items || cart.details.items.length === 0;

const getTotalQuantity = items => items.reduce((total, item) => total + item.quantity, 0);

const CartContextProvider = props => {
  const {
    actions,
    asyncActions,
    cartState,
    children
  } = props; // Make deeply nested details easier to retrieve and provide empty defaults

  const derivedDetails = (0, _react.useMemo)(() => {
    if (isCartEmpty(cartState)) {
      return {
        currencyCode: 'USD',
        numItems: 0,
        subtotal: 0
      };
    } else {
      return {
        currencyCode: cartState.details.prices.grand_total.currency,
        numItems: getTotalQuantity(cartState.details.items),
        subtotal: cartState.details.prices.grand_total.value
      };
    }
  }, [cartState]);
  const derivedCartState = { ...cartState,
    isEmpty: isCartEmpty(cartState),
    derivedDetails
  };
  const cartApi = (0, _react.useMemo)(() => ({
    actions,
    ...asyncActions
  }), [actions, asyncActions]);
  const contextValue = (0, _react.useMemo)(() => [derivedCartState, cartApi], [cartApi, derivedCartState]);
  const apolloClient = (0, _client.useApolloClient)();
  const [fetchCartId] = (0, _client.useMutation)(CREATE_CART_MUTATION);
  const fetchCartDetails = (0, _useAwaitQuery.useAwaitQuery)(CART_DETAILS_QUERY);
  (0, _react.useEffect)(() => {
    // cartApi.getCartDetails initializes the cart if there isn't one. Also, we pass
    // apolloClient to wipe the store in event of auth token expiry which
    // will only happen if the user refreshes.
    cartApi.getCartDetails({
      apolloClient,
      fetchCartId,
      fetchCartDetails
    });
  }, [apolloClient, cartApi, fetchCartDetails, fetchCartId]);
  return /*#__PURE__*/_react.default.createElement(CartContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  cart
}) => ({
  cartState: cart
});

const mapDispatchToProps = dispatch => ({
  actions: (0, _bindActionCreators.default)(_actions.default, dispatch),
  asyncActions: (0, _bindActionCreators.default)(asyncActions, dispatch)
});

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(CartContextProvider);

exports.default = _default;

const useCartContext = () => (0, _react.useContext)(CartContext);
/**
 * We normally do not keep GQL queries in Peregrine. All components should pass
 * queries to talons/hooks. This is an exception to the rule because it would
 * be unecessarily complex to pass these queries to the context provider.
 */


exports.useCartContext = useCartContext;
const CREATE_CART_MUTATION = (0, _graphqlTag.default)(_templateObject());
const CART_DETAILS_QUERY = (0, _graphqlTag.default)(_templateObject2());
//# sourceMappingURL=cart.js.map