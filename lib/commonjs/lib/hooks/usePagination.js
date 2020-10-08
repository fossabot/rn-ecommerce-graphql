"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePagination = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _useSearchParam = require("./useSearchParam");

/**
 * Sets a query parameter in history.
 *
 * @private
 */
const setQueryParam = ({
  history,
  location,
  parameter,
  replace,
  value
}) => {
  const {
    search
  } = location;
  const queryParams = new URLSearchParams(search);
  queryParams.set(parameter, value);
  const destination = {
    search: queryParams.toString()
  };

  if (replace) {
    history.replace(destination);
  } else {
    history.push(destination);
  }
};

const defaultInitialPage = 1;
/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that provides
 * pagination logic.
 *
 * Use this hook to implement components that need to navigate through paged
 * data.
 *
 * @kind function
 *
 * @param {Object} config An object containing configuration values
 *
 * @param {String} config.namespace='' The namespace to append to config.parameter in the query. For example: ?namespace_parameter=value
 * @param {String} config.parameter='page' The name of the query parameter to use for page
 * @param {Number} config.initialPage The initial current page value
 * @param {Number} config.initialTotalPages=1 The total pages expected to be usable by this hook
 *
 * @return {Object[]} An array with two entries containing the following content: [ {@link PaginationState}, {@link API} ]
 */

const usePagination = (props = {}) => {
  const {
    namespace = '',
    parameter = 'page',
    initialTotalPages = 1
  } = props;
  const history = (0, _reactRouterDom.useHistory)();
  const location = (0, _reactRouterDom.useLocation)();
  const [totalPages, setTotalPages] = (0, _react.useState)(initialTotalPages);
  const searchParam = namespace ? "".concat(namespace, "_").concat(parameter) : parameter;
  const initialPage = props.initialPage || defaultInitialPage;
  const currentPage = parseInt((0, _useSearchParam.getSearchParam)(searchParam, location)); // use the location to hold state

  const setCurrentPage = (0, _react.useCallback)((page, replace = false) => {
    // Update the query parameter.
    setQueryParam({
      history,
      location,
      parameter: searchParam,
      replace,
      value: page
    });
  }, [history, location, searchParam]); // ensure the location contains a page number

  (0, _react.useEffect)(() => {
    if (!currentPage) {
      setCurrentPage(initialPage, true);
    }
  }, [currentPage, initialPage, setCurrentPage]);
  /**
   * The current pagination state
   *
   * @typedef PaginationState
   *
   * @kind Object
   *
   * @property {Number} currentPage The current page number
   * @property {Number} totalPages The total number of pages
   */

  const paginationState = {
    currentPage: currentPage || initialPage,
    totalPages
  };
  /**
   * The API object used for modifying the PaginationState.
   *
   * @typedef API
   *
   * @kind Object
   */

  /**
   * Set the current page
   *
   * @function API.setCurrentPage
   *
   * @param {Number} page The number to assign to the current page
   */

  /**
   * Set the total number of pages
   *
   * @function API.setTotalPages
   *
   * @param {Number} total The number to set the amount of pages available
   */

  const api = (0, _react.useMemo)(() => ({
    setCurrentPage,
    setTotalPages
  }), [setCurrentPage, setTotalPages]);
  return [paginationState, api];
};

exports.usePagination = usePagination;
//# sourceMappingURL=usePagination.js.map