"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFormError = void 0;

var _react = require("react");

var _deriveErrorMessage = require("../../util/deriveErrorMessage");

const useFormError = props => {
  const {
    errors
  } = props;
  const derivedErrorMessage = (0, _react.useMemo)(() => (0, _deriveErrorMessage.deriveErrorMessage)(errors), [errors]);
  return {
    errorMessage: derivedErrorMessage
  };
};

exports.useFormError = useFormError;
//# sourceMappingURL=useFormError.js.map