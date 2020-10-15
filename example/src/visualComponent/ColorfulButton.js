import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { getRandomHexColor } from '../Helper/getRandomHexColor';

function ColorfulButton(props) {
  const color = getRandomHexColor();
  return (
    <TouchableOpacity
      style={[
        {
          marginTop: 5,
          marginBottom: 5,
          backgroundColor: color,
          height: 50,
          borderRadius: 12,
        },
        { ...props },
      ]}
      onPress={props.onPress}
    >
      <Text
        style={{
          fontSize: 16,
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: 'auto',
          marginBottom: 'auto',
          color: 'white',
        }}
      >
        {props.title || 'Click me'}
      </Text>
    </TouchableOpacity>
  );
}

export default ColorfulButton;
