"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFilterModal = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _reactRouterDom = require("react-router-dom");

var _app = require("@magento/peregrine/lib/context/app");

var _helpers = require("./helpers");

var _useFilterState = require("./useFilterState");

/**
 * Filter Modal talon.
 *
 * @returns {{
 *   filterApi: any,
 *   filterState: any,
 *   handleClose: function,
 *   isOpen: boolean
 * }}
 */
const useFilterModal = props => {
  const {
    filters,
    queries: {
      filterIntrospection
    }
  } = props;
  const [isApplying, setIsApplying] = (0, _react.useState)(false);
  const [{
    drawer
  }, {
    closeDrawer
  }] = (0, _app.useAppContext)();
  const [filterState, filterApi] = (0, _useFilterState.useFilterState)();
  const prevDrawer = (0, _react.useRef)(null);
  const isOpen = drawer === 'filter';
  const history = (0, _reactRouterDom.useHistory)();
  const {
    pathname,
    search
  } = (0, _reactRouterDom.useLocation)();
  const {
    data: introspectionData
  } = (0, _client.useQuery)(filterIntrospection);
  const inputFields = introspectionData ? introspectionData.__type.inputFields : [];
  const attributeCodes = (0, _react.useMemo)(() => filters.map(({
    attribute_code
  }) => attribute_code), [filters]); // Create a set of disabled filters.

  const DISABLED_FILTERS = (0, _react.useMemo)(() => {
    const disabled = new Set(); // Disable category filtering when not on a search page.

    if (pathname !== '/search.html') {
      disabled.add('category_id');
    }

    return disabled;
  }, [pathname]); // Get "allowed" filters by intersection of filter attribute codes and
  // schema input field types. This restricts the displayed filters to those
  // that the api will understand.

  const possibleFilters = (0, _react.useMemo)(() => {
    const nextFilters = new Set(); // perform mapping and filtering in the same cycle

    for (const {
      name
    } of inputFields) {
      const isValid = attributeCodes.includes(name);
      const isEnabled = !DISABLED_FILTERS.has(name);

      if (isValid && isEnabled) {
        nextFilters.add(name);
      }
    }

    return nextFilters;
  }, [DISABLED_FILTERS, attributeCodes, inputFields]); // iterate over filters once to set up all the collections we need

  const [filterNames, filterKeys, filterItems] = (0, _react.useMemo)(() => {
    const names = new Map();
    const keys = new Set();
    const itemsByGroup = new Map();

    for (const filter of filters) {
      const {
        options,
        label: name,
        attribute_code: group
      } = filter; // If this aggregation is not a possible filter, just back out.

      if (possibleFilters.has(group)) {
        const items = []; // add filter name

        names.set(group, name); // add filter key permutations

        keys.add("".concat(group, "[filter]")); // add items

        for (const {
          label,
          value
        } of options) {
          items.push({
            title: (0, _helpers.stripHtml)(label),
            value
          });
        }

        itemsByGroup.set(group, items);
      }
    }

    return [names, keys, itemsByGroup];
  }, [filters, possibleFilters]); // on apply, write filter state to location

  (0, _react.useEffect)(() => {
    if (isApplying) {
      const nextSearch = (0, _helpers.getSearchFromState)(search, filterKeys, filterState); // write filter state to history

      history.push({
        pathname,
        search: nextSearch
      }); // mark the operation as complete

      setIsApplying(false);
    }
  }, [filterKeys, filterState, history, isApplying, pathname, search]); // on drawer toggle, read filter state from location

  (0, _react.useEffect)(() => {
    const justOpened = prevDrawer.current === null && drawer === 'filter';
    const justClosed = prevDrawer.current === 'filter' && drawer === null;

    if (justOpened || justClosed) {
      const nextState = (0, _helpers.getStateFromSearch)(search, filterKeys, filterItems);
      filterApi.setItems(nextState);
    }

    prevDrawer.current = drawer;
  }, [drawer, filterApi, filterItems, filterKeys, search]);
  const handleApply = (0, _react.useCallback)(() => {
    setIsApplying(true);
    closeDrawer();
  }, [closeDrawer]);
  const handleClose = (0, _react.useCallback)(() => {
    closeDrawer();
  }, [closeDrawer]);
  const handleReset = (0, _react.useCallback)(() => {
    filterApi.clear();
    setIsApplying(true);
  }, [filterApi, setIsApplying]);
  return {
    filterApi,
    filterItems,
    filterKeys,
    filterNames,
    filterState,
    handleApply,
    handleClose,
    handleReset,
    isApplying,
    isOpen
  };
};

exports.useFilterModal = useFilterModal;
//# sourceMappingURL=useFilterModal.js.map