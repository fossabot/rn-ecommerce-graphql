import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'simicart';
import { actions, toggleDrawer, closeDrawer, toggleSearch } from 'simicart';

const asyncActions = {
  toggleDrawer: toggleDrawer,
  closeDrawer: closeDrawer,
  toggleSearch: toggleSearch,
};

const AppContext = createContext();

const FakeProvider = (props) => {
  const { actions, appState, asyncActions, children } = props;

  const appApi = useMemo(
    () => ({
      ...actions,
      ...asyncActions,
    }),
    [actions, asyncActions]
  );

  const contextValue = useMemo(() => [appState, appApi], [appApi, appState]);

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

const mapStateToProps = ({ app }) => ({ appState: app });

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  asyncActions: bindActionCreators(asyncActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FakeProvider);

export const useAppContext = () => useContext(AppContext);
