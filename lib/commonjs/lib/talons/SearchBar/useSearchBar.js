"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchBar = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _useDropdown = require("../../hooks/useDropdown");

const initialValues = {
  search_query: ''
};

const useSearchBar = () => {
  const [valid, setValid] = (0, _react.useState)(false);
  const {
    elementRef,
    expanded: isAutoCompleteOpen,
    setExpanded: setIsAutoCompleteOpen
  } = (0, _useDropdown.useDropdown)();
  const history = (0, _reactRouterDom.useHistory)();
  const {
    push
  } = history; // expand or collapse on input change

  const handleChange = (0, _react.useCallback)(value => {
    const hasValue = !!value;
    const isValid = hasValue && value.length > 2;
    setValid(isValid);
    setIsAutoCompleteOpen(hasValue);
  }, [setIsAutoCompleteOpen, setValid]); // expand on focus

  const handleFocus = (0, _react.useCallback)(() => {
    setIsAutoCompleteOpen(true);
  }, [setIsAutoCompleteOpen]); // navigate on submit

  const handleSubmit = (0, _react.useCallback)(({
    search_query
  }) => {
    if (search_query != null && search_query.trim().length > 0) {
      push("/search.html?query=".concat(search_query));
      setIsAutoCompleteOpen(false);
    }
  }, [push, setIsAutoCompleteOpen]);
  return {
    containerRef: elementRef,
    handleChange,
    handleFocus,
    handleSubmit,
    initialValues,
    isAutoCompleteOpen,
    setIsAutoCompleteOpen,
    setValid,
    valid
  };
};

exports.useSearchBar = useSearchBar;
//# sourceMappingURL=useSearchBar.js.map