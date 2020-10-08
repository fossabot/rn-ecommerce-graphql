"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useForgotPassword = void 0;

var _react = require("react");

var _client = require("@apollo/client");

/**
 * Returns props necessary to render a ForgotPassword form.
 *
 * @function
 *
 * @param {Function} props.onCancel - callback function to call when user clicks the cancel button
 * @param {RequestPasswordEmailMutations} props.mutations - GraphQL mutations for the forgot password form.
 *
 * @returns {ForgotPasswordProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useForgotPassword } from '@magento/peregrine/lib/talons/ForgotPassword/useForgotPassword.js';
 */
const useForgotPassword = props => {
  const {
    onCancel,
    mutations
  } = props;
  const [hasCompleted, setCompleted] = (0, _react.useState)(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = (0, _react.useState)(null);
  const [requestResetEmail, {
    error: requestResetEmailError,
    loading: isResettingPassword
  }] = (0, _client.useMutation)(mutations.requestPasswordResetEmailMutation);
  const handleFormSubmit = (0, _react.useCallback)(async ({
    email
  }) => {
    try {
      await requestResetEmail({
        variables: {
          email
        }
      });
      setForgotPasswordEmail(email);
      setCompleted(true);
    } catch (err) {
      setCompleted(false);
    }
  }, [requestResetEmail]);
  const handleCancel = (0, _react.useCallback)(() => {
    onCancel();
  }, [onCancel]);
  return {
    forgotPasswordEmail,
    formErrors: [requestResetEmailError],
    handleCancel,
    handleFormSubmit,
    hasCompleted,
    isResettingPassword
  };
};
/** JSDocs type definitions */

/**
 * GraphQL mutations for the forgot password form.
 * This is a type used by the {@link useForgotPassword} talon.
 *
 * @typedef {Object} RequestPasswordEmailMutations
 *
 * @property {GraphQLAST} requestPasswordResetEmailMutation mutation for requesting password reset email
 *
 * @see [forgotPassword.gql.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/ForgotPassword/forgotPassword.gql.js}
 * for the query used in Venia
 */

/**
 * Object type returned by the {@link useForgotPassword} talon.
 * It provides props data to use when rendering the forgot password form component.
 *
 * @typedef {Object} ForgotPasswordProps
 *
 * @property {String} forgotPasswordEmail email address of the user whose password reset has been requested
 * @property {Array} formErrors A list of form errors
 * @property {Function} handleCancel Callback function to handle form cancellations
 * @property {Function} handleFormSubmit Callback function to handle form submission
 * @property {Boolean} hasCompleted True if password reset mutation has completed. False otherwise
 * @property {Boolean} isResettingPassword True if password reset mutation is in progress. False otherwise
 */


exports.useForgotPassword = useForgotPassword;
//# sourceMappingURL=useForgotPassword.js.map