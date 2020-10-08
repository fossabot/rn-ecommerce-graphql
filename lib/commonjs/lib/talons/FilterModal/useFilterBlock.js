"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFilterBlock = void 0;

var _react = require("react");

const useFilterBlock = () => {
  const [isExpanded, setExpanded] = (0, _react.useState)(false);
  const handleClick = (0, _react.useCallback)(() => {
    setExpanded(value => !value);
  }, [setExpanded]);
  return {
    handleClick,
    isExpanded
  };
};

exports.useFilterBlock = useFilterBlock;
//# sourceMappingURL=useFilterBlock.js.map