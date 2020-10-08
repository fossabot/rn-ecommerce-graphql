"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useApp = void 0;

var _react = require("react");

var _createErrorRecord = _interopRequireDefault(require("@magento/peregrine/lib/util/createErrorRecord"));

var _app = require("@magento/peregrine/lib/context/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dismissers = new WeakMap(); // Memoize dismisser funcs to reduce re-renders from func identity change.

const getErrorDismisser = (error, onDismissError) => {
  return dismissers.has(error) ? dismissers.get(error) : dismissers.set(error, () => onDismissError(error)).get(error);
};
/**
 * Talon that handles effects for App and returns props necessary for rendering
 * the app.
 *
 * @param {Function} props.handleError callback to invoke for each error
 * @param {Function} props.handleIsOffline callback to invoke when the app goes offline
 * @param {Function} props.handleIsOnline callback to invoke wen the app goes online
 * @param {Function} props.handleHTMLUpdate callback to invoke when a HTML update is available
 * @param {Function} props.markErrorHandled callback to invoke when handling an error
 * @param {Function} props.renderError an error that occurs during rendering of the app
 * @param {Function} props.unhandledErrors errors coming from the error reducer
 *
 * @returns {{
 *  hasOverlay: boolean
 *  handleCloseDrawer: function
 * }}
 */


const useApp = props => {
  const {
    handleError,
    handleIsOffline,
    handleIsOnline,
    markErrorHandled,
    renderError,
    unhandledErrors
  } = props;
  const reload = (0, _react.useCallback)(process.env.NODE_ENV === 'development' ? () => {
    console.log('Default window.location.reload() error handler not running in developer mode.');
  } : () => {
    window.location.reload();
  }, []);
  const renderErrors = (0, _react.useMemo)(() => renderError ? [(0, _createErrorRecord.default)(renderError, window, useApp, renderError.stack)] : [], [renderError]);
  const errors = renderError ? renderErrors : unhandledErrors;
  const handleDismissError = renderError ? reload : markErrorHandled; // Only add toasts for errors if the errors list changes. Since `addToast`
  // and `toasts` changes each render we cannot add it as an effect dependency
  // otherwise we infinitely loop.

  (0, _react.useEffect)(() => {
    for (const {
      error,
      id,
      loc
    } of errors) {
      handleError(error, id, loc, getErrorDismisser(error, handleDismissError));
    }
  }, [errors, handleDismissError, handleError]);
  const [appState, appApi] = (0, _app.useAppContext)();
  const {
    closeDrawer
  } = appApi;
  const {
    hasBeenOffline,
    isOnline,
    overlay
  } = appState;
  (0, _react.useEffect)(() => {
    if (hasBeenOffline) {
      if (isOnline) {
        handleIsOnline();
      } else {
        handleIsOffline();
      }
    }
  }, [handleIsOnline, handleIsOffline, hasBeenOffline, isOnline]);
  const handleCloseDrawer = (0, _react.useCallback)(() => {
    closeDrawer();
  }, [closeDrawer]);
  return {
    hasOverlay: !!overlay,
    handleCloseDrawer
  };
};

exports.useApp = useApp;
//# sourceMappingURL=useApp.js.map