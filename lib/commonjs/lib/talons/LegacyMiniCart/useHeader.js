"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useHeader = void 0;

var _react = require("react");

const useHeader = props => {
  const {
    closeDrawer
  } = props;
  const handleClick = (0, _react.useCallback)(() => {
    closeDrawer();
  }, [closeDrawer]);
  return {
    handleClick
  };
};

exports.useHeader = useHeader;
//# sourceMappingURL=useHeader.js.map