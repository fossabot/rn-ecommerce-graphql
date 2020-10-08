"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSuggestedCategory = void 0;

var _react = require("react");

var _helpers = require("../FilterModal/helpers");

// TODO: derive from store config when available
const getLocation = (searchValue, categoryId, label) => {
  // start with the current uri
  const uri = new URL('/search.html', window.location); // update the query params

  uri.searchParams.set('query', searchValue);
  uri.searchParams.set('category_id[filter]', "".concat(label).concat(_helpers.DELIMITER).concat(categoryId));
  const {
    pathname,
    search
  } = uri; // return only the pieces React Router wants

  return {
    pathname,
    search
  };
};
/**
 * Return props necessary to render a SuggestedCategory component.
 *
 * @param {Object} props
 * @param {String} props.categoryId - category
 * @param {Function} props.onNavigate - callback to fire on link click
 * @param {String} props.searchValue - search term
 */


const useSuggestedCategory = props => {
  const {
    categoryId,
    label,
    onNavigate,
    searchValue
  } = props;
  const destination = getLocation(searchValue, categoryId, label);
  const handleClick = (0, _react.useCallback)(() => {
    if (typeof onNavigate === 'function') {
      onNavigate();
    }
  }, [onNavigate]);
  return {
    destination,
    handleClick
  };
};

exports.useSuggestedCategory = useSuggestedCategory;
//# sourceMappingURL=useSuggestedCategory.js.map