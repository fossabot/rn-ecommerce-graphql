"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _reactRedux = require("react-redux");

var _samanai = _interopRequireDefault(require("./test_component/samanai"));

var _x_Store = require("./lib/store/x_Store");

var _app = _interopRequireDefault(require("./lib/context/app"));

var _index = require("./lib/store/index");

var _toolkit = require("@reduxjs/toolkit");

var _app2 = _interopRequireDefault(require("./lib/store/reducers/app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RootComponent extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, _x_Store.demoStore.toString()), /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
      store: _x_Store.demoStore
    }, /*#__PURE__*/_react.default.createElement(_app.default, {
      actions: 'abc',
      asyncActions: {}
    }, /*#__PURE__*/_react.default.createElement(_samanai.default, null))));
  }

}

exports.default = RootComponent;
//# sourceMappingURL=index.js.map