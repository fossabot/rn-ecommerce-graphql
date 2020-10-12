import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';

function CheckStore(props) {
  const data = useSelector((state) => state);
  return (
    <View>
      <View style={{ height: 20 }} />
      <Text>_Inspector_</Text>
      <Text>{data ? JSON.stringify(data, null, 2) : `Such empty`}</Text>
      <View style={{ height: 20 }} />
    </View>
  );
}

export default CheckStore;
