import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {useCartContext} from 'simicart';
import StateDisplayer from './stateDisplayer.js';
import ColorfulButton from '../visualComponent/ColorfulButton.js';
import {getRandomLargeNumber} from '../Helper/getRandomLargeNumber.js';

function CartStateDisplay(props) {
  const [cartState, cartApi] = useCartContext();
  const {} = cartApi;

  return (
      <ScrollView>
        <StateDisplayer data={cartState} title={'Cart'}/>

      </ScrollView>
  );
}

export default CartStateDisplay;
