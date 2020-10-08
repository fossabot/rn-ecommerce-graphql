"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useResetForm = void 0;

var _react = require("react");

var _informed = require("informed");

/**
 * This hook takes a callback 'onClick' prop and
 * returns another callback function that calls form.reset
 * before invoking the onClick prop function.
 *
 * @param {object}      props
 * @param {function}    props.onClick
 *
 * @returns {object}    result
 * @returns {function}  result.handleClick
 */
const useResetForm = props => {
  const {
    onClick
  } = props;
  const formApi = (0, _informed.useFormApi)();
  const handleClick = (0, _react.useCallback)(() => {
    formApi.reset();
    onClick();
  }, [formApi, onClick]);
  return {
    handleClick
  };
};

exports.useResetForm = useResetForm;
//# sourceMappingURL=useResetForm.js.map