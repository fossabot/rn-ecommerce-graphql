import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppContext } from '../lib/context/app';

function Samanai(props) {
  // const x = useSelector(state => state.app.somethingElse);

  const [count, setCount] = useState(0);

  const [appState, appApi] = useAppContext();
  const { toggleDrawer } = appApi;

  const chosen = appState;

  return (
    <View>
      <Text>{chosen ? JSON.stringify(chosen, null, 2) : 'Such Empty'}</Text>
      <Button
        title={'Click me'}
        onPress={() => {
          toggleDrawer(count % 2 === 0 ? 'samanai' : 'siminia');
          setCount((prevState) => prevState + 1);
        }}
      />
    </View>
  );
}

export default Samanai;
