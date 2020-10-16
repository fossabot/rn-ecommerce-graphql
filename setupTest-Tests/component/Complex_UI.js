import { Button, Text, View } from 'react-native';
import React from 'react';

export const Complex_UI = () => {
  const doSomething = () => {
    console.log(`Did something`);
  };

  return (
    <View>
      <Text testID={'text'}> Hello </Text>
      <Button
        testID={'button'}
        title={'Click me sempai'}
        onPress={doSomething}
      />
    </View>
  );
};
