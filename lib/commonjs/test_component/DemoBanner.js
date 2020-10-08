"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function DemoBanner(props) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      flex: 1,
      backgroundColor: '#d2f5e3',
      paddingTop: 7,
      paddingBottom: 7,
      paddingLeft: 10,
      paddingRight: 10,
      alignContent: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 22
    }
  }, "Demo"));
}

var _default = DemoBanner;
exports.default = _default;
//# sourceMappingURL=DemoBanner.js.map