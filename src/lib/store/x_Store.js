import {configureStore} from '@reduxjs/toolkit';
import reducers from './reducers/index';

export const demoStore = configureStore({
  reducer: reducers,
});