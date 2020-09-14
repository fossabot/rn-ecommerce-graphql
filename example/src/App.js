import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Simicart from 'simicart';

export default function App() {


  return (
    <View style={styles.container}>
      <Simicart/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
