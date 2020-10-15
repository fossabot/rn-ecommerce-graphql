import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store/store.js';
import AppContextProvider from '../lib/context/app.js';
import CatalogContextProvider from '../lib/context/catalog.js';
import CartContextProvider from '../lib/context/cart.js';
import UserContextProvider from '../lib/context/user.js';
import CheckoutContextProvider from '../lib/context/checkout.js';

function AppComposite(props) {
  return (
    <Provider store={store}>
      <AppContextProvider>
        <CatalogContextProvider>
          <CartContextProvider>
            <UserContextProvider>
              <CheckoutContextProvider>
                {props.children}
              </CheckoutContextProvider>
            </UserContextProvider>
          </CartContextProvider>
        </CatalogContextProvider>
      </AppContextProvider>
    </Provider>
  );
}

export { AppComposite };
