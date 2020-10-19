import React, { useState } from 'react';
import { Button, Text, View } from 'react-native';

export const State_Lifeform = () => {
  const [data, setData] = useState(0);

  const doSomething = () => {
    setData((prev) => prev + 1);
  };

  return (
    <View>
      <Text testID={'text'}>{data}</Text>
      <Button
        testID={'button'}
        title={'Click me sempai'}
        onPress={doSomething}
      />
    </View>
  );
};
