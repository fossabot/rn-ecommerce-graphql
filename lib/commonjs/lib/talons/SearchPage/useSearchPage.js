"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchPage = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _reactRouterDom = require("react-router-dom");

var _app = require("@magento/peregrine/lib/context/app");

var _peregrine = require("@magento/peregrine");

var _useSearchParam = require("../../hooks/useSearchParam");

var _helpers = require("../FilterModal/helpers");

const PAGE_SIZE = 6;
/**
 * Return props necessary to render a SearchPage component.
 *
 * @param {Object} props
 * @param {String} props.query - graphql query used for executing search
 */

const useSearchPage = props => {
  const {
    queries: {
      filterIntrospection,
      getProductFiltersBySearch,
      productSearch
    }
  } = props;
  const sortProps = (0, _peregrine.useSort)();
  const [currentSort] = sortProps;
  const {
    sortAttribute,
    sortDirection
  } = currentSort; // Keep track of the sort criteria so we can tell when they change.

  const previousSort = (0, _react.useRef)(currentSort); // get the URL query parameters.

  const location = (0, _reactRouterDom.useLocation)();
  const {
    search
  } = location; // Keep track of the search terms so we can tell when they change.

  const previousSearch = (0, _react.useRef)(search); // Set up pagination.

  const [paginationValues, paginationApi] = (0, _peregrine.usePagination)();
  const {
    currentPage,
    totalPages
  } = paginationValues;
  const {
    setCurrentPage,
    setTotalPages
  } = paginationApi; // retrieve app state and action creators

  const [, appApi] = (0, _app.useAppContext)();
  const {
    toggleDrawer
  } = appApi;
  const inputText = (0, _useSearchParam.getSearchParam)('query', location);
  const searchCategory = (0, _react.useMemo)(() => {
    const inputFilters = (0, _helpers.getFiltersFromSearch)(search);

    if (inputFilters.size === 0) {
      return null;
    }

    const targetCategoriesSet = inputFilters.get('category_id');

    if (!targetCategoriesSet) {
      return null;
    } // The set looks like ["Bottoms,11", "Skirts,12"].
    // We want to return "Bottoms, Skirts", etc.


    return [...targetCategoriesSet].map(categoryPair => categoryPair.split(',')[0]).join(', ');
  }, [search]);
  const openDrawer = (0, _react.useCallback)(() => {
    toggleDrawer('filter');
  }, [toggleDrawer]); // Get "allowed" filters by intersection of schema and aggregations

  const {
    called: introspectionCalled,
    data: introspectionData,
    loading: introspectionLoading
  } = (0, _client.useQuery)(filterIntrospection); // Create a type map we can reference later to ensure we pass valid args
  // to the graphql query.
  // For example: { category_id: 'FilterEqualTypeInput', price: 'FilterRangeTypeInput' }

  const filterTypeMap = (0, _react.useMemo)(() => {
    const typeMap = new Map();

    if (introspectionData) {
      introspectionData.__type.inputFields.forEach(({
        name,
        type
      }) => {
        typeMap.set(name, type.name);
      });
    }

    return typeMap;
  }, [introspectionData]);
  const pageControl = {
    currentPage,
    setPage: setCurrentPage,
    totalPages
  };
  const [runQuery, {
    called: searchCalled,
    loading: searchLoading,
    error,
    data
  }] = (0, _client.useLazyQuery)(productSearch);
  (0, _react.useEffect)(() => {
    // Wait until we have the type map to fetch product data.
    if (!filterTypeMap.size) {
      return;
    }

    const filters = (0, _helpers.getFiltersFromSearch)(search); // Construct the filter arg object.

    const newFilters = {};
    filters.forEach((values, key) => {
      newFilters[key] = (0, _helpers.getFilterInput)(values, filterTypeMap.get(key));
    });
    runQuery({
      variables: {
        currentPage: Number(currentPage),
        filters: newFilters,
        inputText,
        pageSize: Number(PAGE_SIZE),
        sort: {
          [sortAttribute]: sortDirection
        }
      }
    });
    window.scrollTo({
      left: 0,
      top: 0,
      behavior: 'smooth'
    });
  }, [currentPage, filterTypeMap, inputText, runQuery, search, sortDirection, sortAttribute]); // Set the total number of pages whenever the data changes.

  (0, _react.useEffect)(() => {
    const totalPagesFromData = data ? data.products.page_info.total_pages : null;
    setTotalPages(totalPagesFromData);
    return () => {
      setTotalPages(null);
    };
  }, [data, setTotalPages]); // Reset the current page back to one (1) when the search string, filters
  // or sort criteria change.

  (0, _react.useEffect)(() => {
    // We don't want to compare page value.
    const prevSearch = new URLSearchParams(previousSearch.current);
    const nextSearch = new URLSearchParams(search);
    prevSearch.delete('page');
    nextSearch.delete('page');

    if (prevSearch.toString() !== nextSearch.toString() || previousSort.current.sortAttribute.toString() !== currentSort.sortAttribute.toString() || previousSort.current.sortDirection.toString() !== currentSort.sortDirection.toString()) {
      // The search term changed.
      setCurrentPage(1); // And update the ref.

      previousSearch.current = search;
      previousSort.current = currentSort;
    }
  }, [currentSort, search, setCurrentPage]); // Fetch category filters for when a user is searching in a category.

  const [getFilters, {
    data: filterData
  }] = (0, _client.useLazyQuery)(getProductFiltersBySearch);
  (0, _react.useEffect)(() => {
    if (inputText) {
      getFilters({
        variables: {
          search: inputText
        }
      });
    }
  }, [getFilters, inputText, search]); // Use static category filters when filtering by category otherwise use the
  // default (and potentially changing!) aggregations from the product query.

  const filters = filterData ? filterData.products.aggregations : null; // Avoid showing a "empty data" state between introspection and search.

  const loading = introspectionCalled && !searchCalled || searchLoading || introspectionLoading;
  return {
    data,
    error,
    filters,
    loading,
    openDrawer,
    pageControl,
    searchCategory,
    searchTerm: inputText,
    sortProps
  };
};

exports.useSearchPage = useSearchPage;
//# sourceMappingURL=useSearchPage.js.map