import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../store/store.js';
import AppContextProvider from '../context/app.js';
import CatalogContextProvider from '../context/catalog.js';
import CartContextProvider from '../context/cart.js';
import CheckoutContextProvider from "../context/checkout.js";
import UserContextProvider from "../context/user.js";
import {ThemeProvider} from "../theme/index.js";




//TODO: error handling
function AppComposite(props) {
    return (
        <Provider store={store}>
            <AppContextProvider>
                <CatalogContextProvider>
                    <CartContextProvider>
                        <CheckoutContextProvider>
                            <UserContextProvider>
                                {/*<ThemeProvider>*/}
                                    {props.children}
                                {/*</ThemeProvider>*/}
                            </UserContextProvider>
                        </CheckoutContextProvider>
                    </CartContextProvider>
                </CatalogContextProvider>
            </AppContextProvider>
        </Provider>
    );
}

export {AppComposite};
