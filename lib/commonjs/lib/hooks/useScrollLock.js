"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useScrollLock = void 0;

var _react = require("react");

/**
 * A [React Hook]{@link https://reactjs.org/docs/hooks-intro.html} that sets
 * an attribute on the document element indicating that scrolling should be
 * locked. This is performed with a layout effect (before paint).
 *
 * @kind function
 *
 * @param {Boolean} locked Whether scrolling should be locked.
 */
const useScrollLock = locked => {
  (0, _react.useLayoutEffect)(() => {
    document.documentElement.dataset.scrollLock = locked || '';
  }, [locked]);
};

exports.useScrollLock = useScrollLock;
//# sourceMappingURL=useScrollLock.js.map