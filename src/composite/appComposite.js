import React from 'react';
import { Provider } from 'react-redux';
import { demoStore } from '../lib/store/x_Store.js';
import AppContextProvider from '../lib/context/app.js';
import CatalogContextProvider from '../lib/context/catalog.js';
import CartContextProvider from '../lib/context/cart.js';

function AppComposite(props) {
  return (
    <Provider store={demoStore}>
      <AppContextProvider>
        <CatalogContextProvider>
          <CartContextProvider>{props.children}</CartContextProvider>
        </CatalogContextProvider>
      </AppContextProvider>
    </Provider>
  );
}

export { AppComposite };
