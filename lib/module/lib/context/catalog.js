import React, { createContext, useContext, useMemo } from 'react';
import { connect } from 'react-redux';
import actions from '../store/actions/catalog/actions';
import * as asyncActions from '../store/actions/catalog/asyncActions';
import bindActionCreators from '../util/bindActionCreators';
const CatalogContext = /*#__PURE__*/createContext();

const CatalogContextProvider = props => {
  const {
    actions,
    asyncActions,
    catalogState,
    children
  } = props;
  const catalogApi = useMemo(() => ({ ...actions,
    ...asyncActions
  }), [actions, asyncActions]);
  const contextValue = useMemo(() => [catalogState, catalogApi], [catalogApi, catalogState]);
  return /*#__PURE__*/React.createElement(CatalogContext.Provider, {
    value: contextValue
  }, children);
};

const mapStateToProps = ({
  catalog
}) => ({
  catalogState: catalog
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch),
  asyncActions: bindActionCreators(asyncActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CatalogContextProvider);
export const useCatalogContext = () => useContext(CatalogContext);
//# sourceMappingURL=catalog.js.map