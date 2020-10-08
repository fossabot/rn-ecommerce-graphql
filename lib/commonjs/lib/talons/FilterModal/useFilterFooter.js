"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFilterFooter = void 0;

var _react = require("react");

const useFilterFooter = props => {
  const {
    hasFilters,
    isOpen
  } = props;
  const [touched, setTouched] = (0, _react.useState)();
  (0, _react.useEffect)(() => {
    if (isOpen) {
      setTouched(value => value || hasFilters);
    } else {
      setTouched(false);
    }
  }, [hasFilters, isOpen]);
  return {
    touched
  };
};

exports.useFilterFooter = useFilterFooter;
//# sourceMappingURL=useFilterFooter.js.map