"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCreateAccountPage = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

const validCreateAccountParams = ['email', 'firstName', 'lastName'];

const getCreateAccountInitialValues = search => {
  const params = new URLSearchParams(search);
  return validCreateAccountParams.reduce((values, param) => ({ ...values,
    [param]: params.get(param)
  }), {});
};
/**
 * Returns props necessary to render CreateAccountPage component.
 *
 * @returns {{
 *   handleCreateAccount: function,
 *   initialValues: object
 * }}
 */


const useCreateAccountPage = () => {
  const history = (0, _reactRouterDom.useHistory)();
  const {
    search
  } = (0, _reactRouterDom.useLocation)();
  const handleCreateAccount = (0, _react.useCallback)(() => {
    history.push('/');
  }, [history]);
  const initialValues = (0, _react.useMemo)(() => getCreateAccountInitialValues(search), [search]);
  return {
    handleCreateAccount,
    initialValues
  };
};

exports.useCreateAccountPage = useCreateAccountPage;
//# sourceMappingURL=useCreateAccountPage.js.map