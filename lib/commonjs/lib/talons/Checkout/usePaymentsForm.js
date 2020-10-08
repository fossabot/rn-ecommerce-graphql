"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePaymentsForm = void 0;

var _react = require("react");

var _isObjectEmpty = _interopRequireDefault(require("../../util/isObjectEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_FORM_VALUES = {
  addresses_same: true
};
/**
 * Returns props necessary to render a PaymentsForm component.
 *
 * @param {Object} props.initialValues initial values from state
 */

const usePaymentsForm = props => {
  const {
    initialValues
  } = props;
  const [isSubmitting, setIsSubmitting] = (0, _react.useState)(false);
  const handleSubmit = (0, _react.useCallback)(() => {
    setIsSubmitting(true);
  }, [setIsSubmitting]);
  let initialFormValues;

  if ((0, _isObjectEmpty.default)(initialValues)) {
    initialFormValues = DEFAULT_FORM_VALUES;
  } else {
    if (initialValues.sameAsShippingAddress) {
      // If the addresses are the same, don't populate any fields
      // other than the checkbox with an initial value.
      initialFormValues = {
        addresses_same: true
      };
    } else {
      // The addresses are not the same, populate the other fields.
      initialFormValues = {
        addresses_same: false,
        ...initialValues
      };
      delete initialFormValues.sameAsShippingAddress;
    }
  }

  return {
    handleSubmit,
    initialValues: initialFormValues,
    isSubmitting,
    setIsSubmitting
  };
};

exports.usePaymentsForm = usePaymentsForm;
//# sourceMappingURL=usePaymentsForm.js.map