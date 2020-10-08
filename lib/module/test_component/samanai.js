import React, { useState } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppContext } from '../lib/context/app';
import ColorfulButton from '../visualComponent/ColorfulButton';
import StateDisplayer from './stateDisplayer';

function Samanai(props) {
  const [valid, setValid] = useState(true);
  const [appState, appApi] = useAppContext();
  const {
    toggleDrawer,
    closeDrawer,
    toggleSearch,
    setOnline,
    setOffline,
    setPageLoading
  } = appApi;
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(StateDisplayer, {
    data: appState,
    title: 'App'
  }), /*#__PURE__*/React.createElement(ColorfulButton, {
    title: 'TOGGLE_DRAWER',
    onPress: () => {
      toggleDrawer(valid ? 'samanai' : 'siminia');
      setValid(prevState => !prevState);
    }
  }), /*#__PURE__*/React.createElement(ColorfulButton, {
    title: 'CLOSE_DRAWER',
    onPress: () => {
      closeDrawer();
    }
  }), /*#__PURE__*/React.createElement(ColorfulButton, {
    title: 'TOGGLE_SEARCH',
    onPress: () => {
      toggleSearch();
    }
  }), /*#__PURE__*/React.createElement(ColorfulButton, {
    title: 'SET_ONLINE',
    onPress: () => {
      setOnline();
    }
  }), /*#__PURE__*/React.createElement(ColorfulButton, {
    title: 'SET_OFFLINE',
    onPress: () => {
      setOffline();
    }
  }), /*#__PURE__*/React.createElement(ColorfulButton, {
    title: 'SET_PAGE_LOADING true',
    onPress: () => {
      setPageLoading(true);
    }
  }), /*#__PURE__*/React.createElement(ColorfulButton, {
    title: 'SET_PAGE_LOADING false',
    onPress: () => {
      setPageLoading(false);
    }
  }));
}

export default Samanai;
//# sourceMappingURL=samanai.js.map