import React from 'react';
import { Button, View } from 'react-native';
import { getRandomHexColor } from '../Helper/getRandomHexColor';

function ColorfulButton(props) {
  const color = getRandomHexColor();
  return (
    <View style={{ marginTop: 7, marginBottom: 7 }}>
      <Button color={color} {...props} />
    </View>
  );
}

export default ColorfulButton;
