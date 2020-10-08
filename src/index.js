import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Provider} from 'react-redux';
import Samanai from './test_component/samanai';
import {demoStore} from './lib/store/x_Store';
import AppContextProvider from './lib/context/app';
import StateDisplayer from './test_component/stateDisplayer';
import DemoBanner from './test_component/DemoBanner';

export default class RootComponent extends React.Component {
  render() {
    return (
        <View style={{alignSelf: 'stretch', marginLeft: 7, marginRight: 7}}>
          <Provider store={demoStore}>
            <AppContextProvider>
              <ScrollView>
                <DemoBanner/>
                <Samanai/>
              </ScrollView>
            </AppContextProvider>
          </Provider>
        </View>
    );
  }
}
