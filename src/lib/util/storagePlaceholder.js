//something's wrong with this
// import AsyncStorage from '@react-native-community/async-storage';

export default class storagePlaceholder {
  removeItem(key: string) {
    console.log(`someone called removeItem with params: key-${key}`);
  }

  async getItem(key: string, adjust?: boolean): Promise<?string> {
    console.log(`someone called getItem with params: key-${key}`);
    if (adjust) {
      return null;
    }
    else {
      return `Fake value from key: ${key} ${Math.round(Math.random() * 100 + 1)}`;
    }
  }

  setItem(key: string, value: any) {
    console.log(`someone called setItem with params: key-${key} value-${value}`);
  }
}
