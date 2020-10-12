import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useCartContext } from 'simicart';
import StateDisplayer from './stateDisplayer.js';
import ColorfulButton from '../visualComponent/ColorfulButton.js';
import { getRandomLargeNumber } from '../Helper/getRandomLargeNumber.js';

function CartStateDisplay(props) {
  // const [cartState, cartApi] = useCartContext();
  // const {} = cartApi;
  const data = useCartContext;

  return (
    <ScrollView>
      {/*<StateDisplayer data={cartState} title={'Cart'}/>*/}
      <Text>
        {JSON.stringify(useCartContext(), null, 2) || `Such emptiness`}
      </Text>
    </ScrollView>
  );
}

export default CartStateDisplay;
