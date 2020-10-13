//https://reactnavigation.org/docs/getting-started/
import 'react-native-gesture-handler';

import React from 'react';
import {AppRegistry, ScrollView} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {AppComposite} from 'simicart';

import {name as appName} from './app.json';

import App from './src/App';
import AppStateDisplay from './src/test_component/appStateDisplay.js';
import CatalogStateDisplay from './src/test_component/catalogStateDisplay.js';
import UserStateDisplay from './src/test_component/userStateDisplay.js';

const Drawer = createDrawerNavigator();

function Index(props) {
  return (
      <NavigationContainer>
        <AppComposite>
            <Drawer.Navigator>
              <Drawer.Screen name={'App'} component={AppStateDisplay}/>
              <Drawer.Screen name={'Catalog'} component={CatalogStateDisplay}/>
              <Drawer.Screen name={'User'} component={UserStateDisplay}/>
            </Drawer.Navigator>
        </AppComposite>
      </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Index);
