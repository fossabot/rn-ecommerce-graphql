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

var _stateDisplayer = _interopRequireDefault(require("./test_component/stateDisplayer"));

var _DemoBanner = _interopRequireDefault(require("./test_component/DemoBanner"));

var _Xocalova = _interopRequireDefault(require("./test_component/Xocalova"));

var _catalog = _interopRequireDefault(require("./lib/context/catalog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class RootComponent extends _react.default.Component {
  render() {
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: {
        alignSelf: 'stretch',
        marginLeft: 7,
        marginRight: 7
      }
    }, /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
      store: _x_Store.demoStore
    }, /*#__PURE__*/_react.default.createElement(_app.default, null, /*#__PURE__*/_react.default.createElement(_catalog.default, null, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, null, /*#__PURE__*/_react.default.createElement(_DemoBanner.default, null), /*#__PURE__*/_react.default.createElement(_samanai.default, null), /*#__PURE__*/_react.default.createElement(_Xocalova.default, null))))));
  }

}

exports.default = RootComponent;
//# sourceMappingURL=index.js.map