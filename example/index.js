//https://reactnavigation.org/docs/getting-started/
import 'react-native-gesture-handler';

import React from 'react';
import { AppRegistry, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppComposite } from 'simicart';
import { ProductList } from 'simicart';

import { name as appName } from './app.json';
import { Color_element_StateDisplay } from './src/test_component/color_element_StateDisplay';

const Drawer = createDrawerNavigator();

function Index() {
  return (
    <NavigationContainer>
      <AppComposite>
        <Drawer.Navigator>
          <Drawer.Screen name={'Moving product'} component={ProductList} />
          <Drawer.Screen
            name={'Color Element'}
            component={Color_element_StateDisplay}
          />
        </Drawer.Navigator>
      </AppComposite>
    </NavigationContainer>
  );
}

AppRegistry.registerComponent(appName, () => Index);
