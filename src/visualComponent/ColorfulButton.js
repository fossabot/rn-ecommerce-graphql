import React from 'react';
import { Button, Text, TouchableOpacity, View } from 'react-native';
import { getRandomHexColor } from '../Helper/getRandomHexColor';

function ColorfulButton(props) {
  const color = getRandomHexColor();
  return (
    <TouchableOpacity
      style={[
        {
          marginTop: 7,
          marginBottom: 7,
          backgroundColor: color,
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
          paddingRight: 5,
          height: 40,
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
