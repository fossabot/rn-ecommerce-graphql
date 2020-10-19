import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';

export const Effect_Lifeform = () => {
  const [current_text, setCurrent_text] = useState('No useEffect');

  useEffect(() => {
    setCurrent_text('Yes useEffect 😊');
  }, []);

  return (
    <View>
      <Text testID={'text'}>{current_text}</Text>
    </View>
  );
};
