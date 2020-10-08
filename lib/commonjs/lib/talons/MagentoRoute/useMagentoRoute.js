"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useMagentoRoute = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _client = require("@apollo/client");

var _getRouteComponent = _interopRequireDefault(require("./getRouteComponent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CODE_PERMANENT_REDIRECT = 301;
const CODE_TEMPORARY_REDIRECT = 302;
const REDIRECT_CODES = [CODE_PERMANENT_REDIRECT, CODE_TEMPORARY_REDIRECT];
const talonResponses = {
  ERROR: routeError => ({
    hasError: true,
    routeError
  }),
  LOADING: {
    isLoading: true
  },
  NOT_FOUND: {
    isNotFound: true
  },
  FOUND: (component, id, type, store) => ({
    component,
    id,
    type,
    store
  }),
  REDIRECT: relativeUrl => ({
    isRedirect: true,
    relativeUrl
  })
};

const shouldFetch = (data, store) => {
  // Should fetch if we don't have any data.
  if (!data) return true; // Should fetch again following a prior failure.

  if (data.isNotFound && navigator.onLine) {
    return true;
  } // If we have data for the route, but the stores don't match fetch the correct route


  return !!(data.id && data.store !== store);
};

const useMagentoRoute = props => {
  const {
    store
  } = props;
  const [componentMap, setComponentMap] = (0, _react.useState)(new Map());
  const {
    apiBase
  } = (0, _client.useApolloClient)();
  const history = (0, _reactRouterDom.useHistory)();
  const {
    pathname
  } = (0, _reactRouterDom.useLocation)();
  const isMountedRef = (0, _react.useRef)(false);
  const routeData = componentMap.get(pathname); // Keep track of whether we have been mounted yet.
  // Note that we are not unmounted on page transitions.

  (0, _react.useEffect)(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []); // If the entry for this pathname is a redirect, perform the redirect.

  (0, _react.useEffect)(() => {
    if (routeData && routeData.isRedirect) {
      history.replace(routeData.relativeUrl);
    }
  }, [componentMap, history, pathname, routeData]); // ask Magento for a RootComponent that matches the current pathname

  (0, _react.useEffect)(() => {
    // Avoid setting state if unmounted.
    if (!isMountedRef.current) {
      return;
    }

    if (shouldFetch(routeData, store)) {
      (0, _getRouteComponent.default)(apiBase, pathname, store).then(({
        component,
        id,
        pathname,
        redirectCode,
        relativeUrl,
        routeError,
        type
      }) => {
        // Update our Map in local state for this path.
        setComponentMap(prevMap => {
          const nextMap = new Map(prevMap);
          const nextValue = routeError ? talonResponses.ERROR(routeError) : id === -1 ? talonResponses.NOT_FOUND : REDIRECT_CODES.includes(redirectCode) ? talonResponses.REDIRECT(relativeUrl) : talonResponses.FOUND(component, id, type, store);
          return nextMap.set(pathname, nextValue);
        });
      });
    }
  }, [apiBase, componentMap, history, pathname, routeData, store]);
  return routeData || talonResponses.LOADING;
};

exports.useMagentoRoute = useMagentoRoute;
//# sourceMappingURL=useMagentoRoute.js.map