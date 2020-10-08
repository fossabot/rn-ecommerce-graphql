"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollTopOnChange = void 0;

var _react = require("react");

/**
 * A hook that scrolls to the top of the page when the watched argument changes.
 *
 * @param {any} watched item to observe for changes to run the scroll effect
 */
const useScrollTopOnChange = watched => {
  (0, _react.useEffect)(() => {
    window.scrollTo({
      behavior: 'smooth',
      left: 0,
      top: 0
    });
  }, [watched]);
};

exports.useScrollTopOnChange = useScrollTopOnChange;
//# sourceMappingURL=useScrollTopOnChange.js.map