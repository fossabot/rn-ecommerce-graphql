"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOption = void 0;

var _react = require("react");

/**
 * Talon for Option.
 *
 * @param {number} props.attribute_id the id of the option
 * @param {string} props.label the label for the option
 * @param {function} props.onSelectionChange callback handler for when the option is clicked
 * @param {string} props.selectedValue the label of the selected option
 * @param {array} props.values an array containing possible values
 */
const useOption = props => {
  const {
    attribute_id,
    label,
    onSelectionChange,
    selectedValue,
    values
  } = props;
  const [selection, setSelection] = (0, _react.useState)(null);
  const initialSelection = (0, _react.useMemo)(() => {
    let initialSelection = {};
    const searchValue = selection || selectedValue;

    if (searchValue) {
      initialSelection = values.find(value => value.default_label === searchValue) || {};
    }

    return initialSelection;
  }, [selectedValue, selection, values]);
  const valuesMap = (0, _react.useMemo)(() => {
    return new Map(values.map(value => [value.value_index, value.store_label]));
  }, [values]);
  const selectedValueLabel = "Selected ".concat(label, ":");
  const selectedValueDescription = selection || initialSelection.default_label || 'None';
  const handleSelectionChange = (0, _react.useCallback)(selection => {
    setSelection(valuesMap.get(selection));

    if (onSelectionChange) {
      onSelectionChange(attribute_id, selection);
    }
  }, [attribute_id, onSelectionChange, valuesMap]);
  return {
    handleSelectionChange,
    initialSelection,
    selectedValueLabel,
    selectedValueDescription
  };
};

exports.useOption = useOption;
//# sourceMappingURL=useOption.js.map