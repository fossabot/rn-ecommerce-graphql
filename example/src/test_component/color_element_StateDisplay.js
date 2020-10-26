import React, { useContext, useState } from 'react';
import { Button, Icon, ThemeContext, CheckBox } from 'react-native-elements';
import { ScrollView, TouchableOpacity, View } from 'react-native';

const Color_element_StateDisplay = (props) => {
  const { theme } = useContext(ThemeContext);

  return (
    <ScrollView>
      <View opacity={0.9}>
        <TouchableOpacity
          onPress={() => {
            console.log('pressed');
          }}
        >
          <Icon name="ios-american-football" type="ionicon" size={100} />
        </TouchableOpacity>
      </View>

      <Button title={'Click me'} onPress={() => {}} />
    </ScrollView>
  );
};

export { Color_element_StateDisplay };
