import React from 'react';
import { Text, View } from 'react-native';
import { getRandomHexColor } from '../Helper/getRandomHexColor';

function StateDisplayer(props) {
  return (
    <View style={{ marginTop: 4 }}>
      <Text>----</Text>
      <Text style={{ fontSize: 17 }}>{`${props.title || 'State'}`}</Text>
      <Text style={{ fontSize: 17 }}>
        {JSON.stringify(props.data, null, 2)}
      </Text>
      {/*<View*/}
      {/*  style={{*/}
      {/*    backgroundColor: getRandomHexColor(),*/}
      {/*    height: 30,*/}
      {/*    marginTop: 5,*/}
      {/*  }}*/}
      {/*/>*/}
      <Text>------------------------------</Text>
    </View>
  );
}

export default StateDisplayer;
