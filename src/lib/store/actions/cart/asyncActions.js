import {signOut} from '../user';
import actions from './actions';
import StoragePlaceholder from '../../../../temporaryMocks/storage/storagePlaceholder';
import {type fetchCartId} from '../../../../temporaryMocks/Network/fetchCartId';
import {type fetchCartDetails} from '../../../../temporaryMocks/Network/fetchCartDetails';
import {type addItemMutation} from '../../../../temporaryMocks/Network/addItemMutation.js';
import {type removeItem} from '../../../../temporaryMocks/Network/removeItem.js';

//Replace with async storage
const storage = new StoragePlaceholder();


export const createCart = (payload: {
    fetchCartId: fetchCartId
}) => {

    return async function thunk(dispatch, getState) {
        const {fetchCartId} = payload;
        const {cart} = getState();

        //   if a cart already exists in the store, exit
        if (cart.cartId) {
            return;
        }

        // else get a new cart.
        dispatch(actions.getCart.request());

        //if cart in storage --> proceed
        const cartId = await retrieveCartId();
        console.log(cartId);
        if (cartId) {
            dispatch(actions.getCart.receive(cartId));
            return;
        }
        try {
            // request part , currently mocked
            const {data, errors} = await fetchCartId({
                fetchPolicy: 'no-cache',
            });

            let receivePayload;

            if (errors) {
                receivePayload = new Error(errors);
            } else {
                receivePayload = data.cartId;
                saveCartId(data.cartId);
            }

            dispatch(actions.getCart.receive(receivePayload));
        } catch (error) {
            // If we are unable to create a cart, the cart can't function, so
            // we forcibly throw so the upstream actions won't retry.
            dispatch(actions.getCart.receive(error));
            throw new Error('Unable to create cart');
        }
    };
};

export const addItemToCart = (payload: {
    item: {
        media_gallery_entries: Array<{}>,
        sku: string,
        fetchCartId: fetchCartId,
        fetchCartDetails: fetchCartDetails,
    },
    fetchCartDetails: fetchCartDetails,
    fetchCartId: fetchCartId,
    addItemMutation: addItemMutation
}) => {
    const {
        addItemMutation,
        fetchCartDetails,
        fetchCartId,
        item,
        quantity,
        parentSku,
    } = payload;

    const writingImageToCache = writeImageToCache(item);
    console.log('called addItemtocart');

    return async function thunk(dispatch, getState) {
        await writingImageToCache;

        // dispatch(actions.addItem.request(payload));
        dispatch(actions.addItem.request());

        const {cart, user} = getState();
        const {cartId} = cart;
        const {isSignedIn} = user;

        try {
            const variables = {
                cartId,
                parentSku,
                product: item,
                quantity,
                sku: item.sku,
            };

            //Change on server
            await addItemMutation({
                variables,
            });

            //change on client
            await dispatch(
                getCartDetails({
                    fetchCartId,
                    fetchCartDetails,
                }),
            );
            dispatch(actions.addItem.receive());
        } catch (error) {
            dispatch(actions.addItem.receive(error));

            const shouldRetry = !error.networkError && isInvalidCart(error);

            // retry if the cart is invalid or the cartId is missing.
            if (shouldRetry) {
                //if sign-in --> sign-out
                if (isSignedIn) {
                    await dispatch(signOut());
                } else {
                    await dispatch(removeCart());
                }

                // create  new one cart
                try {
                    await dispatch(
                        createCart({
                            fetchCartId: fetchCartId,
                        }),
                    );
                } catch (error) {
                    // If creating a cart fails, all is not lost. Return so that the
                    // user can continue to at least browse the site.
                    return;
                }

                // fetch details
                await dispatch(
                    getCartDetails({
                        fetchCartId,
                        fetchCartDetails,
                    }),
                );

                // then retry this operation
                return thunk(...arguments);
            }
        }
    };
};

/**
 * Applies changes in options/quantity to a cart item.
 *
 * @param payload.cartItemId {Number} the id of the cart item we are updating
 * @param payload.item {Object} the new configuration item if changes are selected.
 * @param payload.quantity {Number} the quantity of the item being updated
 * @param payload.productType {String} 'ConfigurableProduct' or other.
 */
export const updateItemInCart = (payload = {}) => {
    const {
        cartItemId,
        fetchCartDetails,
        fetchCartId,
        item,
        productType,
        quantity,
        removeItem,
        updateItem,
    } = payload;
    const writingImageToCache = writeImageToCache(item);

    return async function thunk(dispatch, getState) {
        await writingImageToCache;
        // dispatch(actions.updateItem.request(payload));

        const {cart, user} = getState();
        const {cartId} = cart;
        const {isSignedIn} = user;

        try {
            if (productType === 'ConfigurableProduct') {
                // You _must_ remove before adding or risk deleting the item
                // entirely if only quantity has been modified.
                await dispatch(
                    removeItemFromCart({
                        item: {
                            id: cartItemId,
                        },
                        fetchCartDetails,
                        fetchCartId,
                        removeItem,
                    }),
                );
                await dispatch(
                    addItemToCart({
                        ...payload,
                    }),
                );
            } else {
                // If the product is a simple product we can just use the
                // updateCartItems .
                await updateItem({
                    variables: {
                        cartId,
                        itemId: cartItemId,
                        quantity,
                    },
                });

                await dispatch(
                    getCartDetails({
                        fetchCartId,
                        fetchCartDetails,
                    }),
                );
            }

            dispatch(actions.updateItem.receive());
        } catch (error) {
            dispatch(actions.updateItem.receive(error));

            const shouldRetry = !error.networkError && isInvalidCart(error);
            if (shouldRetry) {
                await dispatch(removeCart());

                // then create a new one
                try {
                    await dispatch(
                        createCart({
                            fetchCartId,
                        }),
                    );
                } catch (error) {
                    return;
                }

                // and fetch details
                await dispatch(
                    getCartDetails({
                        fetchCartId,
                        fetchCartDetails,
                    }),
                );

                if (isSignedIn) {
                    // The user is signed in and we just received their cart.
                    // Retry this operation.
                    return thunk(...arguments);
                } else {
                    // The user is a guest and just received a brand new (empty) cart.
                    // Add the updated item to that cart.
                    await dispatch(
                        addItemToCart({
                            ...payload,
                        }),
                    );
                }
            }
        }
    };
};

export const removeItemFromCart = (payload: {
    item: {
        id?: string,
    },
    fetchCartId: fetchCartId,
    fetchCartDetails: fetchCartDetails,
    removeItem: removeItem

}) => {
    const {item, fetchCartDetails, fetchCartId, removeItem} = payload;

    return async function thunk(dispatch, getState) {
        // dispatch(actions.removeItem.request(payload));

        const {cart} = getState();
        const {cartId} = cart;

        try {
            await removeItem({
                variables: {
                    cartId,
                    itemId: item.id,
                },
            });

            dispatch(actions.removeItem.receive({}));
        } catch (error) {
            dispatch(actions.removeItem.receive(error));

            const shouldResetCart = !error.networkError && isInvalidCart(error);
            if (shouldResetCart) {

                await dispatch(removeCart());
                try {
                    await dispatch(
                        createCart({
                            fetchCartId,
                        }),
                    );
                } catch (error) {
                    return;
                }
            }
        }

        await dispatch(
            getCartDetails({
                fetchCartId,
                fetchCartDetails,
            }),
        );
    };
};

export const getCartDetails = (payload: {
    fetchCartDetails: fetchCartDetails,
    fetchCartId: fetchCartId,
}) => {
    const {fetchCartId, fetchCartDetails} = payload;

    return async function thunk(dispatch, getState) {
        const {cart, user} = getState();
        const {cartId} = cart;
        const {isSignedIn} = user;

        // if there isn't a cart, create one then retry this operation
        if (!cartId) {
            try {
                await dispatch(
                    createCart({
                        fetchCartId,
                    }),
                );
            } catch (error) {

                return;
            }
            return thunk(...arguments);
        }

        dispatch(actions.getDetails.request(cartId));

        try {
            const {data} = await fetchCartDetails({
                variables: {cartId},
                fetchPolicy: 'no-cache',
            });
            const {cart: details} = data;

            dispatch(actions.getDetails.receive({details}));
        } catch (error) {
            dispatch(actions.getDetails.receive(error));

            const shouldResetCart = !error.networkError && isInvalidCart(error);
            if (shouldResetCart) {
                if (isSignedIn) {
                    await dispatch(signOut());
                } else {
                    // Delete the cached ID from local storage.
                    await dispatch(removeCart());
                }

                // Create a new one
                try {
                    await dispatch(
                        createCart({
                            fetchCartId,
                        }),
                    );
                } catch (error) {
                    // If creating a cart fails, all is not lost. Return so that the
                    // user can continue to at least browse the site.
                    return;
                }

                // Retry this operation
                return thunk(...arguments);
            }
        }
    };
};

export const removeCart = () =>
    async function thunk(dispatch) {
        // Clear the cartId from local storage.
        await clearCartId();

        // Clear the cart info from the redux store.
        dispatch(actions.reset());
    };

/* helpers */
export async function retrieveCartId(): Promise<string> {
    return storage.getItem('cartId');
}

export async function saveCartId(id: string) {
    return storage.setItem('cartId', id);
}

export async function clearCartId() {
    return storage.removeItem('cartId');
}

async function retrieveImageCache() {
    return await storage.getItem('imagesBySku') || {};
}

async function saveImageCache(cache: string) {
    return storage.setItem('imagesBySku', cache);
}

//In react-native, also means saving to AsyncStorage
export async function writeImageToCache(item = {}) {
    const {media_gallery_entries: media, sku} = item;

    if (sku) {
        const image = media && (media.find(m => m.position === 1) || media[0]);

        if (image) {
            const imageCache = await retrieveImageCache();

            // if there is an image and it differs from cache
            // write to cache and save in the background
            if (imageCache[sku] !== image) {
                imageCache[sku] = image;
                saveImageCache(imageCache);

                return image;
            }
        }
    }
}

// Returns true if the cart is invalid. Waiting for network
function isInvalidCart(error) {
    return false
}


