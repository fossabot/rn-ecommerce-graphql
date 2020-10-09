import { AppRegistry, Text } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import React from 'react';
import { Provider } from 'react-redux';
import { demoStore } from 'simicart';

function Index(props) {
  return (
    <Provider store={demoStore}>
      <App />
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Index);
