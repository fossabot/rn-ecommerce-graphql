"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = require("react");

var _propTypes = require("prop-types");

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ContainerChild extends _react.Component {
  render() {
    return this.props.render();
  }

}

exports.default = ContainerChild;

_defineProperty(ContainerChild, "propTypes", {
  id: _propTypes.string.isRequired,
  render: _propTypes.func.isRequired
});
//# sourceMappingURL=containerChild.js.map