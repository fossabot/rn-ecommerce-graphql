import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import Samanai from './test_component/samanai';
import { demoStore } from './lib/store/x_Store';
import AppContextProvider from './lib/context/app';
import { reducers } from './lib/store/index';
import { configureStore } from '@reduxjs/toolkit';
import appReducer from './lib/store/reducers/app';
export default class RootComponent extends React.Component {
  render() {
    return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, null, demoStore.toString()), /*#__PURE__*/React.createElement(Provider, {
      store: demoStore
    }, /*#__PURE__*/React.createElement(AppContextProvider, {
      actions: 'abc',
      asyncActions: {}
    }, /*#__PURE__*/React.createElement(Samanai, null))));
  }

}
//# sourceMappingURL=index.js.map