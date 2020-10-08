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
    return (
      <View>
        <Text>{demoStore.toString()}</Text>
        <Provider store={demoStore}>
          <AppContextProvider actions={'abc'} asyncActions={{}}>
            <Samanai />
          </AppContextProvider>
        </Provider>
      </View>
    );
  }
}
