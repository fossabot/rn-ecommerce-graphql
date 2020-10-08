import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/checkout/actions';
import * as asyncActions from '../store/actions/checkout/asyncActions';
import bindActionCreators from '../util/bindActionCreators';
const CheckoutContext = /*#__PURE__*/createContext();

const CheckoutContextProvider = props => {
  const {
    actions,
    asyncActions,
    checkoutState,
    children
  } = props;
  const checkoutApi = useMemo(() => ({
    actions,
    ...asyncActions
  }), [actions, asyncActions]);
  const contextValue = useMemo(() => [checkoutState, checkoutApi], [checkoutApi, checkoutState]);
  return /*#__PURE__*/React.createElement(CheckoutContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  checkout
}) => ({
  checkoutState: checkout
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutContextProvider);
export const useCheckoutContext = () => useContext(CheckoutContext);
//# sourceMappingURL=checkout.js.map