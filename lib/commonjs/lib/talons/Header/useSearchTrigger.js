"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchTrigger = void 0;

var _react = require("react");

const useSearchTrigger = props => {
  const {
    onClick
  } = props;
  const handleClick = (0, _react.useCallback)(() => {
    onClick();
  }, [onClick]);
  return {
    handleClick
  };
};

exports.useSearchTrigger = useSearchTrigger;
//# sourceMappingURL=useSearchTrigger.js.map