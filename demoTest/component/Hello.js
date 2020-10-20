import React from 'react';
import { Text, View } from 'react-native';

function Hello(props) {
  return (
    <View>
      <Text testID={'hello'}>Hello</Text>
      <Text>Konnichiwa</Text>
    </View>
  );
}

export { Hello };
