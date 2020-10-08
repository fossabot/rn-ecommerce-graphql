"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NOT_FOUND = exports.INTERNAL_ERROR = void 0;

var _resolveUnknownRoute = _interopRequireDefault(require("../../Router/resolveUnknownRoute"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const INTERNAL_ERROR = 'INTERNAL_ERROR';
exports.INTERNAL_ERROR = INTERNAL_ERROR;
const NOT_FOUND = 'NOT_FOUND';
/**
 * Get the route component for a specific path
 *
 * @param apiBase
 * @param pathname
 * @param store
 * @returns {Promise<{component: *, id: *, type: *, redirectCode: *, relativeUrl: *, pathname: *}|{routeError: *, pathname: *}>}
 */

exports.NOT_FOUND = NOT_FOUND;

const getRouteComponent = async (apiBase, pathname, store) => {
  // At build time, `fetchRootComponent` is injected as a global.
  // Depending on the environment, this global will be either an
  // ES module with a `default` property, or a plain CJS module.
  const fetchRoot = 'default' in fetchRootComponent ? fetchRootComponent.default : fetchRootComponent;

  try {
    // try to resolve the route
    // if this throws, we essentially have a 500 Internal Error
    const resolvedRoute = await (0, _resolveUnknownRoute.default)({
      apiBase,
      route: pathname,
      store: store
    }); // urlResolver query returns null if a route can't be found

    if (!resolvedRoute) {
      throw new Error('404');
    }

    const {
      type,
      id,
      redirectCode,
      relative_url
    } = resolvedRoute; // if resolution and destructuring succeed but return no match
    // then we have a straightforward 404 Not Found

    if (!type || !id) {
      throw new Error('404');
    } // at this point we should have a matching RootComponent
    // if this throws, we essentially have a 500 Internal Error


    const component = await fetchRoot(type); // associate the matching RootComponent with this location

    return {
      component,
      id,
      pathname,
      type,
      redirectCode,
      relativeUrl: relative_url
    };
  } catch (e) {
    const routeError = e.message === '404' ? NOT_FOUND : INTERNAL_ERROR;
    console.error(e); // we don't have a matching RootComponent, but we've checked for one
    // so associate the appropriate error case with this location

    return {
      pathname,
      routeError
    };
  }
};

var _default = getRouteComponent;
exports.default = _default;
//# sourceMappingURL=getRouteComponent.js.map