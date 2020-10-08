"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _reactRedux = require("react-redux");

var _app = require("../lib/context/app");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function Samanai(props) {
  const x = (0, _reactRedux.useSelector)(state => state.app.somethingElse);
  const [count, setCount] = (0, _react.useState)(0);
  const [appState, appApi] = (0, _app.useAppContext)();
  const {
    toggleDrawer
  } = appApi;
  const chosen = appState;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, chosen ? JSON.stringify(chosen, null, 2) : 'Such Empty'), /*#__PURE__*/_react.default.createElement(_reactNative.Button, {
    title: 'Click me',
    onPress: () => {
      toggleDrawer(count % 2 === 0 ? 'samanai' : 'siminia');
      setCount(prevState => prevState + 1);
    }
  }));
}

var _default = Samanai;
exports.default = _default;
//# sourceMappingURL=samanai.js.map