"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.name = void 0;

var _reduxActions = require("redux-actions");

var _checkout = _interopRequireDefault(require("../actions/checkout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const name = 'checkout';
exports.name = name;
const initialState = {
  availableShippingMethods: [],
  billingAddress: null,
  billingAddressError: null,
  isSubmitting: false,
  orderError: null,
  paymentMethodError: null,
  paymentCode: '',
  paymentData: null,
  receipt: {
    order: {}
  },
  shippingAddress: {},
  shippingAddressError: null,
  shippingMethod: '',
  shippingMethodError: null,
  shippingTitle: ''
};
const reducerMap = {
  [_checkout.default.begin]: (state, {
    payload
  }) => {
    return { ...state,
      ...payload
    };
  },
  [_checkout.default.billingAddress.submit]: state => ({ ...state,
    billingAddressError: null,
    isSubmitting: true
  }),
  [_checkout.default.billingAddress.accept]: (state, {
    payload
  }) => {
    // Billing address can either be an object with address props OR
    // an object with a single prop, `sameAsShippingAddress`, so we need
    // to do some special handling to make sure the store reflects that.
    const newState = { ...state,
      isSubmitting: false
    };

    if (payload.sameAsShippingAddress) {
      newState.billingAddress = { ...payload
      };
    } else if (!payload.sameAsShippingAddress) {
      newState.billingAddress = { ...payload,
        street: [...payload.street]
      };
    }

    return newState;
  },
  [_checkout.default.billingAddress.reject]: (state, {
    payload
  }) => {
    return { ...state,
      billingAddressError: payload,
      isSubmitting: false
    };
  },
  [_checkout.default.getShippingMethods.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return state;
    }

    return { ...state,
      availableShippingMethods: payload.map(method => ({ ...method,
        code: method.carrier_code,
        title: method.carrier_title
      }))
    };
  },
  [_checkout.default.shippingAddress.submit]: state => ({ ...state,
    isSubmitting: true,
    shippingAddressError: null
  }),
  [_checkout.default.shippingAddress.accept]: (state, {
    payload
  }) => {
    return { ...state,
      isSubmitting: false,
      shippingAddress: { ...state.shippingAddress,
        ...payload,
        street: [...payload.street]
      }
    };
  },
  [_checkout.default.shippingAddress.reject]: (state, {
    payload
  }) => {
    return { ...state,
      isSubmitting: false,
      shippingAddressError: payload
    };
  },
  [_checkout.default.paymentMethod.submit]: state => ({ ...state,
    isSubmitting: true,
    paymentMethodError: null
  }),
  [_checkout.default.paymentMethod.accept]: (state, {
    payload
  }) => {
    return { ...state,
      isSubmitting: false,
      paymentCode: payload.code,
      paymentData: payload.data
    };
  },
  [_checkout.default.paymentMethod.reject]: (state, {
    payload
  }) => {
    return { ...state,
      isSubmitting: false,
      paymentMethodError: payload
    };
  },
  [_checkout.default.receipt.setOrder]: (state, {
    payload
  }) => ({ ...state,
    receipt: {
      order: payload
    }
  }),
  [_checkout.default.receipt.reset]: state => ({ ...state,
    receipt: { ...initialState.receipt
    }
  }),
  [_checkout.default.shippingMethod.submit]: state => ({ ...state,
    isSubmitting: true,
    shippingMethodError: null
  }),
  [_checkout.default.shippingMethod.accept]: (state, {
    payload
  }) => {
    return { ...state,
      isSubmitting: false,
      shippingMethod: payload.carrier_code,
      shippingTitle: payload.carrier_title
    };
  },
  [_checkout.default.shippingMethod.reject]: (state, {
    payload
  }) => {
    return { ...state,
      isSubmitting: false,
      shippingMethodError: payload
    };
  },
  [_checkout.default.order.submit]: state => ({ ...state,
    isSubmitting: true,
    orderError: null
  }),
  [_checkout.default.order.accept]: state => ({ ...state,
    isSubmitting: false
  }),
  [_checkout.default.order.reject]: (state, {
    payload
  }) => {
    return { ...state,
      isSubmitting: false,
      orderError: payload
    };
  },
  [_checkout.default.reset]: () => initialState
};

var _default = (0, _reduxActions.handleActions)(reducerMap, initialState);

exports.default = _default;
//# sourceMappingURL=checkout.js.map