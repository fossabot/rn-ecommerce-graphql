import React, { useState } from 'react';
import { View } from 'react-native';
import { useAppContext } from './fakeProvider.js';
import ColorfulButton from '../visualComponent/ColorfulButton';
import StateDisplayer from '../test_component/stateDisplayer.js';

function FakeAppStateDisplay(props) {
  const [valid, setValid] = useState(true);
  const [appState, appApi] = useAppContext();

  const {
    toggleDrawer,
    closeDrawer,
    toggleSearch,
    setOnline,
    setOffline,
    setPageLoading,
  } = appApi;

  return (
    <View>
      <StateDisplayer data={appState} title={'App'} />
      <ColorfulButton
        title={'TOGGLE_DRAWER'}
        onPress={() => {
          toggleDrawer(valid ? 'samanai' : 'siminia');
          setValid((prevState) => !prevState);
        }}
      />
      <ColorfulButton
        title={'CLOSE_DRAWER'}
        onPress={() => {
          closeDrawer();
        }}
      />
      <ColorfulButton
        title={'TOGGLE_SEARCH'}
        onPress={() => {
          toggleSearch();
        }}
      />
      <ColorfulButton
        title={'SET_ONLINE'}
        onPress={() => {
          setOnline();
        }}
      />
      <ColorfulButton
        title={'SET_OFFLINE'}
        onPress={() => {
          setOffline();
        }}
      />
      <ColorfulButton
        title={'SET_PAGE_LOADING true'}
        onPress={() => {
          setPageLoading(true);
        }}
      />
      <ColorfulButton
        title={'SET_PAGE_LOADING false'}
        onPress={() => {
          setPageLoading(false);
        }}
      />
    </View>
  );
}

export default FakeAppStateDisplay;
