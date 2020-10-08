"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useToastContext = exports.ToastContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _withLogger = _interopRequireDefault(require("../util/withLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The current state of the toast store.
 *
 * @typedef {Object} ToastState
 *
 * @property {Map} toasts Map object associating an id to toast data
 */
const initialState = {
  toasts: new Map()
};

const reducer = (prevState = initialState, action = {}) => {
  const {
    type,
    payload
  } = action;

  switch (type) {
    case 'add':
      {
        const nextToasts = new Map(prevState.toasts);
        const prevToast = nextToasts.get(payload.id);
        const isDuplicate = !!prevToast;
        let timestamp = payload.timestamp;

        if (isDuplicate) {
          // If this is a _new_ duplicate toast we need to clear the
          // previous timeout to prevent premature removal.
          window.clearTimeout(prevToast.removalTimeoutId); // And to retain chronological order of addition, keep the
          // original timestamp.

          timestamp = prevToast.timestamp;
        }

        nextToasts.set(payload.id, { ...payload,
          timestamp,
          isDuplicate
        });
        return { ...prevState,
          toasts: nextToasts
        };
      }

    case 'remove':
      {
        const nextToasts = new Map(prevState.toasts);
        const prevToast = nextToasts.get(payload.id);

        if (prevToast) {
          window.clearTimeout(prevToast.removalTimeoutId);
        }

        nextToasts.delete(payload.id);
        return { ...prevState,
          toasts: nextToasts
        };
      }

    default:
      return prevState;
  }
};

const ToastContext = /*#__PURE__*/(0, _react.createContext)();
const wrappedReducer = (0, _withLogger.default)(reducer);
/**
 * A [context]{@link https://reactjs.org/docs/context.html} provider that
 * provides the toast state object and a dispatch function to toast
 * functionality consumers.
 *
 * @typedef ToastContextProvider
 *
 */

const ToastContextProvider = ({
  children
}) => {
  const store = (0, _react.useReducer)(wrappedReducer, initialState);
  return /*#__PURE__*/_react.default.createElement(ToastContext.Provider, {
    value: store
  }, children);
};
/**
 * A hook that provides access to the toast state and dispatch.
 * Any component using this hook _must_ be a child of a {@link ToastContextProvider}.
 *
 * @typedef useToastContext
 *
 * @return {Object[]} An array containing the state and dispatch function: [{@link ToastState}, function]
 *
 * @example
 *   const [toastState, dispatch] = useToastState();
 */


exports.ToastContextProvider = ToastContextProvider;

const useToastContext = () => (0, _react.useContext)(ToastContext);

exports.useToastContext = useToastContext;
//# sourceMappingURL=useToastContext.js.map