"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTile = void 0;

var _react = require("react");

const useTile = props => {
  const {
    onClick,
    value_index
  } = props;
  const handleClick = (0, _react.useCallback)(() => {
    onClick(value_index);
  }, [value_index, onClick]);
  return {
    handleClick
  };
};

exports.useTile = useTile;
//# sourceMappingURL=useTile.js.map