"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSearchParam = exports.getSearchParam = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

const getSearchParam = (parameter = '', location = window.location) => {
  const params = new URLSearchParams(location.search);
  return params.get(parameter) || '';
};
/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that gets
 * a search parameter from a URL and calls a provided setter function with
 * the corresponding value.
 *
 * @kind function
 *
 * @param {Object} props An object containing the parameter and setter function.
 * @param {String} props.parameter The parameter to search for
 * @param {Function} props.setValue A setter function that is passed the parameter value found in the URL
 */


exports.getSearchParam = getSearchParam;

const useSearchParam = props => {
  const location = (0, _reactRouterDom.useLocation)();
  const {
    parameter,
    setValue
  } = props;
  const value = getSearchParam(parameter, location);
  (0, _react.useEffect)(() => {
    setValue(value);
  }, [setValue, value]);
};

exports.useSearchParam = useSearchParam;
//# sourceMappingURL=useSearchParam.js.map