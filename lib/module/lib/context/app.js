import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/app/actions';
import * as asyncActions from '../store/actions/app/asyncActions';
import bindActionCreators from '../util/bindActionCreators';
const AppContext = /*#__PURE__*/createContext();

const AppContextProvider = props => {
  const {
    actions,
    appState,
    asyncActions,
    children
  } = props;
  const appApi = useMemo(() => ({ ...actions,
    ...asyncActions
  }), [actions, asyncActions]);
  const contextValue = useMemo(() => [appState, appApi], [appApi, appState]);
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  app
}) => ({
  appState: app
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(AppContextProvider);
export const useAppContext = () => useContext(AppContext);
//# sourceMappingURL=app.js.map