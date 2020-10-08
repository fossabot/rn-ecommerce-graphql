"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.name = void 0;

var _reduxActions = require("redux-actions");

var _app = _interopRequireDefault(require("../actions/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const name = 'app';
exports.name = name;
const initialState = {
  drawer: null,
  hasBeenOffline: !navigator.onLine,
  isOnline: navigator.onLine,
  isPageLoading: false,
  overlay: false,
  pending: {},
  searchOpen: false
};
const reducerMap = {
  [_app.default.toggleDrawer]: (state, {
    payload
  }) => {
    return { ...state,
      drawer: payload,
      overlay: !!payload
    };
  },
  [_app.default.toggleSearch]: state => {
    return { ...state,
      searchOpen: !state.searchOpen
    };
  },
  [_app.default.setOnline]: state => {
    return { ...state,
      isOnline: true
    };
  },
  [_app.default.setOffline]: state => {
    return { ...state,
      isOnline: false,
      hasBeenOffline: true
    };
  },
  [_app.default.setPageLoading]: (state, {
    payload
  }) => {
    return { ...state,
      isPageLoading: !!payload
    };
  }
};

var _default = (0, _reduxActions.handleActions)(reducerMap, initialState);

exports.default = _default;
//# sourceMappingURL=app.js.map