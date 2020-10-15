//something's wrong with this
// import AsyncStorage from '@react-native-community/async-storage';

import { makeId } from '../../lib/util/makeRandomString';

export default class StoragePlaceholder {
  removeItem(key: string) {
    console.log(`someone called removeItem with params: key-${key}`);
  }

  async getItem(key: string, adjust?: boolean): Promise<?string> {
    console.log(`someone called getItem with params: key-${key}`);

    if (adjust) {
      return null;
    }
    switch (key) {
      case `signin_token`:
        return `Token ${makeId(10)}`;
      case `cartId`:
        return `CartID: ${makeId(5)}`;
      case `imagesBySku`:
        return {};
      case `availableShippingMethods`:
        return [...Array(3).keys()].map((x) => `Method No.${x}`);
      case `billing_address`:
        return `Address: ${makeId(5)}`;
      case `paymentMethod`:
        return `paymentMethod: ${makeId(5)}`;
      case `shipping_address`:
        return `shipping_address: ${makeId(5)}`;
      case `shippingMethod`:
        return `shippingMethod: ${makeId(5)}`;
      default:
        return `Something ${makeId(10)}`;
    }
  }

  setItem(key: string, value: any) {
    console.log(
      `someone called setItem with params: key-${key} value-${value}`
    );
  }
}
