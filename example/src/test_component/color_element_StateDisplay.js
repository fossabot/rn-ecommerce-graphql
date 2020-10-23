import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { ScrollView, TouchableOpacity, View } from 'react-native';

export const Color_element_StateDisplay = () => (
  <ScrollView>
    <Button
      title="My Button"
      onPress={() => console.log('Something clicked me')}
    />
    <Icon
      name="sc-telegram"
      type="evilicon"
      color="#910fa4"
      size={100}
      solid={false}
      // containerStyle={{backgroundColor:'red'}}
      // reverse={true}
      reverseColor={'purple'}
    />
    <View opacity={0.9}>
      <TouchableOpacity onPress={() => console.log('pressed')}>
        <Icon
          name="ios-american-football"
          type="ionicon"
          color="#F17faF"
          size={100}
        />
      </TouchableOpacity>
    </View>
  </ScrollView>
);
