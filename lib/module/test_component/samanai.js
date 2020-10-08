import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppContext } from '../lib/context/app';

function Samanai(props) {
  const x = useSelector(state => state.app.somethingElse);
  const [count, setCount] = useState(0);
  const [appState, appApi] = useAppContext();
  const {
    toggleDrawer
  } = appApi;
  const chosen = appState;
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, null, chosen ? JSON.stringify(chosen, null, 2) : 'Such Empty'), /*#__PURE__*/React.createElement(Button, {
    title: 'Click me',
    onPress: () => {
      toggleDrawer(count % 2 === 0 ? 'samanai' : 'siminia');
      setCount(prevState => prevState + 1);
    }
  }));
}

export default Samanai;
//# sourceMappingURL=samanai.js.map