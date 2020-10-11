import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
import StateDisplayer from './stateDisplayer';
import ColorfulButton from '../visualComponent/ColorfulButton';
import {useCatalogContext} from 'simicart';
import {getRandomLargeNumber} from '../Helper/getRandomLargeNumber';

const cycleRange = 3;

const fakeOrder_1 = {
  id: 1,
  children: [],
};

const fakeOrder_2 = {
  id: 2,
  children: [
    {
      'id': 38,
      'name': 'What\'s New',
      'url_key': 'what-is-new',
      'url_path': 'what-is-new',
      'children_count': '0',
      'path': '1/2/38',
      'image': null,
      'productImagePreview': {
        'items': [],
      },
    },
    {
      'id': 20,
      'name': 'Women',
      'url_key': 'women',
      'url_path': 'women',
      'children_count': '8',
      'path': '1/2/20',
      'image': 'https://magento24.pwa-commerce.com/Store/pub/media/catalog/category/timeless_2.jpg',
      'productImagePreview': {
        'items': [],
      },
    },
  ],
};

const fakeOrder_3 = {
  id: 1,
  children: [
    {
      'id': 20,
      'name': 'Women',
      'url_key': 'women',
      'url_path': 'women',
      'children_count': '8',
      'path': '1/2/20',
      'image': 'https://magento24.pwa-commerce.com/Store/pub/media/catalog/category/timeless_2.jpg',
      'productImagePreview': {
        'items': [],
      },
    },
  ],
};

function CatalogStateDisplay(props) {
  const [count, setCount] = useState(0);
  const [catalogState, catalogApi] = useCatalogContext();
  const {updateCategories, setCurrentPage, setPrevPageTotal} = catalogApi;

  return (
      <ScrollView>
        <StateDisplayer data={catalogState} title={'Catalog'}/>
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
        <ColorfulButton
            title={'UPDATE_CATEGORIES order id_1'}
            onPress={() => {
              updateCategories(fakeOrder_1);
            }}
        />
        <ColorfulButton
            title={'UPDATE_CATEGORIES order id_2'}
            onPress={() => {
              updateCategories(fakeOrder_2);
            }}
        />
        <ColorfulButton
            title={'UPDATE_CATEGORIES order id_1'}
            onPress={() => {
              updateCategories(fakeOrder_3);
            }}
        />
      </ScrollView>
  );
}

export default CatalogStateDisplay;
