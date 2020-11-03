import React, { useContext, useState } from 'react';
import {
  Button,
  ThemeContext,
  CheckBox,
  Slider,
  Avatar,
  Badge,
} from 'react-native-elements';
import { ScrollView, TouchableOpacity, View, Platform } from 'react-native';

const Color_element_StateDisplay = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView>
      {Platform.OS === 'ios' ? <View style={{ height: 50 }} /> : null}

      <View opacity={0.9}>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
        />
      </View>

      <View
        style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center' }}
      >
        <Slider value={0.5} onValueChange={() => {}} />
      </View>
      <Avatar
        rounded
        source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}
      />
      <Badge value="99+" status="error" />

      <Button
        title={'Click me'}
        onPress={() => {
          console.log('Something clicked');
        }}
      />
    </ScrollView>
  );
};

export { Color_element_StateDisplay };
