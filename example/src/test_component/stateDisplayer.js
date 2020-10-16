import React from 'react';
import { Text, View } from 'react-native';

function StateDisplayer(props) {
  return (
    <View style={{ marginTop: 4 }}>
      <Text>----</Text>
      <Text style={{ fontSize: 17 }}>{`${props.title || 'State'}`}</Text>
      <Text style={{ fontSize: 17 }}>
        {JSON.stringify(props.data, null, 2)}
      </Text>
      <Text>------------------------------</Text>
    </View>
  );
}

export default StateDisplayer;
