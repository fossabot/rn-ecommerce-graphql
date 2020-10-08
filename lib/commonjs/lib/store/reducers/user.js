"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.name = void 0;

var _reduxActions = require("redux-actions");

var _index = require("../../index");

var _user = _interopRequireDefault(require("../actions/user"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  BrowserPersistence
} = _index.Util;
const storage = new BrowserPersistence();
const name = 'user';
exports.name = name;

const isSignedIn = () => !!storage.getItem('signin_token');

const initialState = {
  currentUser: {
    email: '',
    firstname: '',
    lastname: ''
  },
  getDetailsError: null,
  isGettingDetails: false,
  isResettingPassword: false,
  isSignedIn: isSignedIn(),
  resetPasswordError: null,
  token: storage.getItem('signin_token')
};
const reducerMap = {
  [_user.default.setToken]: (state, {
    payload
  }) => {
    return { ...state,
      isSignedIn: true,
      token: payload
    };
  },
  [_user.default.clearToken]: state => {
    return { ...state,
      isSignedIn: false,
      token: null
    };
  },
  [_user.default.getDetails.request]: state => {
    return { ...state,
      getDetailsError: null,
      isGettingDetails: true
    };
  },
  [_user.default.getDetails.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return { ...state,
        getDetailsError: payload,
        isGettingDetails: false
      };
    }

    return { ...state,
      currentUser: payload,
      getDetailsError: null,
      isGettingDetails: false
    };
  },
  [_user.default.resetPassword.request]: state => ({ ...state,
    isResettingPassword: true
  }),
  // TODO: handle the reset password response from the API.
  [_user.default.resetPassword.receive]: (state, {
    payload,
    error
  }) => {
    if (error) {
      return { ...state,
        isResettingPassword: false,
        resetPasswordError: payload
      };
    }

    return { ...state,
      isResettingPassword: false,
      resetPasswordError: null
    };
  },
  [_user.default.reset]: () => {
    return { ...initialState,
      isSignedIn: false,
      token: null
    };
  }
};

var _default = (0, _reduxActions.handleActions)(reducerMap, initialState);

exports.default = _default;
//# sourceMappingURL=user.js.map