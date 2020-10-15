export { AppComposite } from './lib/index.js';
export { demoStore } from './lib/store/x_Store.js';

export { useAppContext } from './lib/context/app.js';
export { useCatalogContext } from './lib/context/catalog.js';
export { useCartContext } from './lib/context/cart.js';

export { default as AppContextProvider } from './lib/context/app.js';

export { default as bindActionCreators } from './lib/util/bindActionCreators.js';

// Temporary for testing purpose
export { default as actions } from './lib/store/actions/app/actions.js';
export * from './lib/store/actions/app/asyncActions.js';
export { fetchCartId } from './temporaryMocks/Network/fetchCartId.js';
export { fetchCartDetails } from './temporaryMocks/Network/fetchCartDetails.js';
export { addItemMutation } from './temporaryMocks/Network/addItemMutation.js';
export { removeItem } from './temporaryMocks/Network/removeItem.js';
export { updateItem } from './temporaryMocks/Network/updateItem.js';
