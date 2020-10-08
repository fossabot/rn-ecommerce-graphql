"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWindowSize = exports.WindowSizeContextProvider = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useEventListener = require("./useEventListener");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const WindowSizeContext = /*#__PURE__*/(0, _react.createContext)();

const getSize = () => {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth
  };
};
/**
 * A hook that will return inner and outer height and width values whenever
 * the window is resized.
 *
 * @kind function
 * @private
 */


const useWindowSizeListener = () => {
  const [windowSize, setWindowSize] = (0, _react.useState)(getSize());

  const handleResize = () => {
    setWindowSize(getSize());
  };

  (0, _useEventListener.useEventListener)(window, 'resize', handleResize);
  return windowSize;
};
/**
 * This component contains a hook that listens for resize events.
 * Use this component with {@link useWindowSize} to get the value of the resized window.
 *
 * It is recommended to only create/use a single time at the top level of your app
 * @summary A React context provider.
 *
 * @kind function
 *
 * @param {Object} props - React component props
 *
 * @return {Context.Provider} A [React context provider]{@link https://reactjs.org/docs/context.html}
 *
 */


const WindowSizeContextProvider = props => {
  // This hook has side effects of adding listeners so we only want to create it
  // once and store it in context for reference by components.
  const windowSize = useWindowSizeListener();
  return /*#__PURE__*/_react.default.createElement(WindowSizeContext.Provider, {
    value: windowSize
  }, props.children);
};
/**
 * The current context value for the window size context.
 * This value updates whenever the window is resized.
 *
 * Use this inside a {@link WindowSizeContextProvider}.
 *
 * @type number
 */


exports.WindowSizeContextProvider = WindowSizeContextProvider;

const useWindowSize = () => (0, _react.useContext)(WindowSizeContext);

exports.useWindowSize = useWindowSize;
//# sourceMappingURL=useWindowSize.js.map