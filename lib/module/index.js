import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Provider } from 'react-redux';
import Samanai from './test_component/samanai';
import { demoStore } from './lib/store/x_Store';
import AppContextProvider from './lib/context/app';
import StateDisplayer from './test_component/stateDisplayer';
import DemoBanner from './test_component/DemoBanner';
import Xocalova from "./test_component/Xocalova";
import CatalogContextProvider from "./lib/context/catalog";
export default class RootComponent extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(View, {
      style: {
        alignSelf: 'stretch',
        marginLeft: 7,
        marginRight: 7
      }
    }, /*#__PURE__*/React.createElement(Provider, {
      store: demoStore
    }, /*#__PURE__*/React.createElement(AppContextProvider, null, /*#__PURE__*/React.createElement(CatalogContextProvider, null, /*#__PURE__*/React.createElement(ScrollView, null, /*#__PURE__*/React.createElement(DemoBanner, null), /*#__PURE__*/React.createElement(Samanai, null), /*#__PURE__*/React.createElement(Xocalova, null))))));
  }

}
//# sourceMappingURL=index.js.map