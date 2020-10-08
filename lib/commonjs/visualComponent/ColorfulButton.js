"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _getRandomHexColor = require("../Helper/getRandomHexColor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ColorfulButton(props) {
  const color = (0, _getRandomHexColor.getRandomHexColor)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.TouchableOpacity, {
    style: [{
      marginTop: 7,
      marginBottom: 7,
      backgroundColor: color,
      paddingTop: 5,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      height: 40,
      borderRadius: 12
    }, { ...props
    }],
    onPress: props.onPress
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: {
      fontSize: 16,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: 'auto',
      marginBottom: 'auto',
      color: 'white'
    }
  }, props.title || 'Click me'));
}

var _default = ColorfulButton;
exports.default = _default;
//# sourceMappingURL=ColorfulButton.js.map