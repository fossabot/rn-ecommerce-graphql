"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSuggestions = void 0;

var _react = require("react");

/**
 * Returns props necessary to render a Suggestions component.
 *
 * @param {Object} props
 * @param {Object} props.filters - filters applied to the search
 * @param {Object} props.items - product data from search results
 * @param {Function} props.setVisible - callback to set `visible` state
 * @param {Boolean} props.visible - whether the component is visible
 */
const useSuggestions = props => {
  const {
    displayResult,
    filters,
    items,
    setVisible,
    visible
  } = props; // hide after navigating to a suggested product

  const onNavigate = (0, _react.useCallback)(() => {
    setVisible(false);
  }, [setVisible]); // avoid rendering if data is empty

  const shouldRender = !!(visible && displayResult && filters && items && items.length);
  let categories = null; // find categories, but only if the component is going to render

  if (shouldRender) {
    const categoryFilter = filters.find(({
      label
    }) => label === 'Category') || {};
    categories = categoryFilter.options || [];
  }

  return {
    categories,
    onNavigate,
    shouldRender
  };
};

exports.useSuggestions = useSuggestions;
//# sourceMappingURL=useSuggestions.js.map