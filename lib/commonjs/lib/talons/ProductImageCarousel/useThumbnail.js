"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThumbnail = void 0;

var _react = require("react");

const useThumbnail = props => {
  const {
    itemIndex,
    onClickHandler
  } = props;
  const handleClick = (0, _react.useCallback)(() => {
    onClickHandler(itemIndex);
  }, [onClickHandler, itemIndex]);
  return {
    handleClick
  };
};

exports.useThumbnail = useThumbnail;
//# sourceMappingURL=useThumbnail.js.map