import React, {useMemo} from 'react';
import {connect, Provider} from 'react-redux';
import {store} from '../store/store.js';
import reducers from "../store/reducers/index.js";

import AppContextProvider from '../context/app.js';
import CatalogContextProvider from '../context/catalog.js';
import CartContextProvider from '../context/cart.js';
import CheckoutContextProvider from "../context/checkout.js";
import UserContextProvider from "../context/user.js";
import CustomContextProvider from "../context/customContext";

import {ApolloProvider, createHttpLink,} from '@apollo/client';
import {ApolloClient} from '@apollo/client/core';
import {InMemoryCache} from '@apollo/client/cache';
import typePolicies from '../policies';
import {combineReducers, configureStore} from "@reduxjs/toolkit";

//TODO: error handling
const preInstantiatedCache = new InMemoryCache({
    typePolicies,
    // POSSIBLE_TYPES is injected into the bundle by webpack at build time.
    possibleTypes: {}
});

export const customContext = React.createContext()


function AppComposite(props) {
    const apiBase = 'https://magento24.pwa-commerce.com/Store/graphql'
    const cache = preInstantiatedCache;
    const apolloClient = new ApolloClient({
        cache,
        uri: apiBase
    });
    apolloClient.apiBase = apiBase;

    const customStore = configureStore({
        reducer: props.customReducer,
    });
    const joinStore = configureStore({
        reducer: {
            ...reducers,
            ...props.customReducer
        }

    })
    console.log('compositor')
    console.log({...props.customReducer})
    return (
        <ApolloProvider client={apolloClient}>
            <Provider store={joinStore}>
                <AppContextProvider>
                    <CatalogContextProvider>
                        <CartContextProvider>
                            <CheckoutContextProvider>
                                <UserContextProvider>
                                    <Provider store={customStore} context={customContext}>
                                        {props.children}
                                    </Provider>
                                </UserContextProvider>
                            </CheckoutContextProvider>
                        </CartContextProvider>
                    </CatalogContextProvider>
                </AppContextProvider>
            </Provider>
        </ApolloProvider>
    );
}

export {AppComposite};
