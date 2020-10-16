import React from 'react';
import { Text, View } from 'react-native';

function DemoBanner(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#d2f5e3',
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 10,
        paddingRight: 10,
        alignContent: 'center',
      }}
    >
      <Text
        style={{
          fontSize: 22,
        }}
      >{`Demo`}</Text>
    </View>
  );
}

export default DemoBanner;
