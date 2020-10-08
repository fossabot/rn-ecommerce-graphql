"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _getRandomHexColor = require("../Helper/getRandomHexColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function StateDisplayer(props) {
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: {
      marginTop: 4
    }
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "----"), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 17
    }
  }, "".concat(props.title || 'State')), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 17
    }
  }, JSON.stringify(props.data, null, 2)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, null, "------------------------------"));
}

var _default = StateDisplayer;
exports.default = _default;
//# sourceMappingURL=stateDisplayer.js.map