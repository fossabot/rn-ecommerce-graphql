"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchField = void 0;

var _react = require("react");

var _informed = require("informed");

var _useSearchParam = require("@magento/peregrine/lib/hooks/useSearchParam");

/**
 * Returns props necessary to render a SearchField component.
 */
const useSearchField = props => {
  const {
    isSearchOpen
  } = props;
  const inputRef = (0, _react.useRef)();
  const {
    value
  } = (0, _informed.useFieldState)('search_query');
  const formApi = (0, _informed.useFormApi)();
  const resetForm = (0, _react.useCallback)(() => {
    formApi.reset();
  }, [formApi]); // When the search field is opened focus on the input.

  (0, _react.useEffect)(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]); // Pre-populate the search field with the search term from the URL.
  // We purposefully only ever run this effect on initial mount.

  /* eslint-disable react-hooks/exhaustive-deps */

  (0, _react.useEffect)(() => {
    const urlTerm = (0, _useSearchParam.getSearchParam)('query', location);

    if (!formApi || !urlTerm) {
      return;
    }

    formApi.setValue('search_query', urlTerm);
  }, []);
  /* eslint-enable react-hooks/exhaustive-deps */

  return {
    inputRef,
    resetForm,
    value
  };
};

exports.useSearchField = useSearchField;
//# sourceMappingURL=useSearchField.js.map