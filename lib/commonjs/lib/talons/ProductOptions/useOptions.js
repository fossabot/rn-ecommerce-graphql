"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOptions = void 0;

var _react = require("react");

const useOptions = props => {
  const {
    onSelectionChange,
    selectedValues
  } = props;
  const handleSelectionChange = (0, _react.useCallback)((optionId, selection) => {
    if (onSelectionChange) {
      onSelectionChange(optionId, selection);
    }
  }, [onSelectionChange]);
  const selectedValueMap = new Map();

  for (const {
    option_label,
    value_label
  } of selectedValues) {
    selectedValueMap.set(option_label, value_label);
  }

  return {
    handleSelectionChange,
    selectedValueMap
  };
};

exports.useOptions = useOptions;
//# sourceMappingURL=useOptions.js.map