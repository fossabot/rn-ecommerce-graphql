import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store.js';
import AppContextProvider from '../context/app.js';
import CatalogContextProvider from '../context/catalog.js';
import CartContextProvider from '../context/cart.js';
import CheckoutContextProvider from "../context/checkout.js";
import UserContextProvider from "../context/user.js";
import { ApolloProvider, createHttpLink, } from '@apollo/client';
import { ApolloClient } from '@apollo/client/core';
import { InMemoryCache } from '@apollo/client/cache';
import typePolicies from '../policies';

//TODO: error handling
const preInstantiatedCache = new InMemoryCache({
    typePolicies,
    // POSSIBLE_TYPES is injected into the bundle by webpack at build time.
    possibleTypes: {}
});


function AppComposite(props) {
    const apiBase = 'https://magento24.pwa-commerce.com/Store/graphql'
    const cache = preInstantiatedCache;
    const apolloClient = new ApolloClient({
            cache,
            uri: apiBase
        });
        apolloClient.apiBase = apiBase;
    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={store}>
                <AppContextProvider>
                    <CatalogContextProvider>
                        <CartContextProvider>
                            <CheckoutContextProvider>
                                <UserContextProvider>
                                    {props.children}
                                </UserContextProvider>
                            </CheckoutContextProvider>
                        </CartContextProvider>
                    </CatalogContextProvider>
                </AppContextProvider>
            </Provider>
        </ApolloProvider>
    );
}

export { AppComposite };
