"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.initialState = exports.name = void 0;

var _reduxActions = require("redux-actions");

var _cart = _interopRequireDefault(require("../actions/cart"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const name = 'cart';
exports.name = name;
const initialState = {
  addItemError: null,
  cartId: null,
  details: {},
  detailsError: null,
  getCartError: null,
  isLoading: false,
  isUpdatingItem: false,
  isAddingItem: false,
  removeItemError: null,
  shippingMethods: [],
  updateItemError: null
};
exports.initialState = initialState;
const reducerMap = {
  [_cart.default.getCart.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return { ...initialState,
        getCartError: payload
      };
    }

    return { ...state,
      cartId: String(payload),
      getCartError: null
    };
  },
  [_cart.default.getDetails.request]: state => {
    return { ...state,
      isLoading: true
    };
  },
  [_cart.default.getDetails.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return { ...state,
        detailsError: payload,
        isLoading: false
      };
    }

    return { ...state,
      // The only time we should spread the payload into the cart store
      // is after we've fetched cart details.
      ...payload,
      isLoading: false
    };
  },
  [_cart.default.addItem.request]: state => {
    return { ...state,
      isAddingItem: true
    };
  },
  [_cart.default.addItem.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return { ...state,
        addItemError: payload,
        isAddingItem: false
      };
    }

    return { ...state,
      isAddingItem: false
    };
  },
  [_cart.default.updateItem.request]: state => {
    return { ...state,
      isUpdatingItem: true
    };
  },
  [_cart.default.updateItem.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return { ...state,
        isUpdatingItem: false,
        updateItemError: payload
      };
    } // We don't actually have to update any items here
    // because we force a refresh from the server.


    return { ...state,
      isUpdatingItem: false
    };
  },
  [_cart.default.removeItem.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return { ...state,
        removeItemError: payload
      };
    }

    return { ...state
    };
  },
  [_cart.default.reset]: () => initialState
};

var _default = (0, _reduxActions.handleActions)(reducerMap, initialState);

exports.default = _default;
//# sourceMappingURL=cart.js.map