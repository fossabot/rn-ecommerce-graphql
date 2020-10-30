export { AppComposite } from './lib/index.js';

export { useAppContext } from './lib/context/app';
export { useCatalogContext } from './lib/context/catalog';
export { useCartContext } from './lib/context/cart.js';
export { useUserContext } from './lib/context/user';
export { useCheckoutContext } from './lib/context/checkout';

export { default as AppContextProvider } from './lib/context/app.js';

export { default as bindActionCreators } from './lib/util/bindActionCreators.js';

//For inspecting purpose
export { store } from './lib/store/store.js';

// Temporary for testing purpose
export { fetchCartId } from './temporaryMocks/Network/fetchCartId.js';
export { fetchCartDetails } from './temporaryMocks/Network/fetchCartDetails.js';
export { addItemMutation } from './temporaryMocks/Network/addItemMutation.js';
export { removeItem } from './temporaryMocks/Network/removeItem.js';
export { updateItem } from './temporaryMocks/Network/updateItem.js';
export * from './lib/index.js';
