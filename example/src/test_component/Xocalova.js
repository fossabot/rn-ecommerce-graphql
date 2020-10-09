import React, { useState } from 'react';
import { View } from 'react-native';
import StateDisplayer from './stateDisplayer';
import ColorfulButton from '../visualComponent/ColorfulButton';
import { useCatalogContext } from 'simicart';
import { getRandomLargeNumber } from '../Helper/getRandomLargeNumber';

const cycleRange = 3;

function Xocalova(props) {
  const [count, setCount] = useState(0);
  const [catalogState, catalogApi] = useCatalogContext();
  const { updateCategories, setCurrentPage, setPrevPageTotal } = catalogApi;

  return (
    <View>
      <StateDisplayer data={catalogState} title={'Catalog'} />
      <ColorfulButton
        title={'SET_CURRENT_PAGE'}
        onPress={() => {
          setCurrentPage(count);
          setCount((x) => (x % cycleRange) + 1);
        }}
      />
      <ColorfulButton
        title={'SET_PREV_PAGE_TOTAL'}
        onPress={() => {
          setPrevPageTotal(getRandomLargeNumber());
        }}
      />
    </View>
  );
}

export default Xocalova;
