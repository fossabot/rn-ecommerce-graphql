"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useBody = void 0;

var _react = require("react");

const useBody = props => {
  const {
    beginEditItem,
    endEditItem
  } = props;
  const [editItem, setEditItem] = (0, _react.useState)(null);
  const handleBeginEditItem = (0, _react.useCallback)(item => {
    beginEditItem();
    setEditItem(item);
  }, [beginEditItem]);
  const handleEndEditItem = (0, _react.useCallback)(() => {
    endEditItem();
    setEditItem(null);
  }, [endEditItem]);
  return {
    editItem,
    handleBeginEditItem,
    handleEndEditItem
  };
};

exports.useBody = useBody;
//# sourceMappingURL=useBody.js.map