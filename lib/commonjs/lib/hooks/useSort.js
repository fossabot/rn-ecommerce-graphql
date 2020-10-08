"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useSort = void 0;

var _react = require("react");

const defaultSort = {
  sortText: 'Best Match',
  sortId: 'sortItem.relevance',
  sortAttribute: 'relevance',
  sortDirection: 'DESC'
};
/**
 *
 * @param props
 * @returns {[{sortDirection: string, sortAttribute: string, sortText: string}, React.Dispatch<React.SetStateAction<{sortDirection: string, sortAttribute: string, sortText: string}>>]}
 */

const useSort = (props = {}) => (0, _react.useState)(() => Object.assign({}, defaultSort, props));

exports.useSort = useSort;
//# sourceMappingURL=useSort.js.map