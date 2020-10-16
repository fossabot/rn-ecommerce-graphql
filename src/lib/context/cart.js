import React, {createContext, useContext, useEffect, useMemo} from 'react';
import {connect} from 'react-redux';

import actions from '../store/actions/cart/actions';
import * as asyncActions from '../store/actions/cart/asyncActions';
import bindActionCreators from '../util/bindActionCreators';

import {fetchCartId} from '../../temporaryMocks/Network/fetchCartId.js';
import {fetchCartDetails} from '../../temporaryMocks/Network/fetchCartDetails.js';

const CartContext = createContext();

const isCartEmpty = (cart): boolean =>
    !cart || !cart.details.items || cart.details.items.length === 0;

const getTotalQuantity = (items: Array<>): number =>
    items.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0);

const CartContextProvider = props => {
    const {actions, asyncActions, cartState, children} = props;

    //  defaults value
    const derivedDetails = useMemo(() => {
        if (isCartEmpty(cartState)) {
            return {
                currencyCode: 'USD',
                numItems: 0,
                subtotal: 0,
            };
        } else {
            return {
                currencyCode: cartState.details.prices.grand_total.currency,
                numItems: getTotalQuantity(cartState.details.items),
                subtotal: cartState.details.prices.grand_total.value,
            };
        }
    }, [cartState]);

    const derivedCartState = {
        ...cartState,
        isEmpty: isCartEmpty(cartState),
        derivedDetails,
    };

    const cartApi = useMemo(
        () => ({
            actions,
            ...asyncActions,
        }),
        [actions, asyncActions],
    );

    //note: if you want to see what actions are available, use Object.entries().
    // Not JSON.stringify()
    const contextValue = useMemo(() => [derivedCartState, cartApi], [
        cartApi,
        derivedCartState,
    ]);


    // mocking fetch. Wait for network
    const fetchCartId = fetchCartId;
    const fetchCartDetails = fetchCartDetails;

    // useEffect(() => {
    //
    //     //initializes the cart if there isn't one
    //     cartApi.getCartDetails({
    //         fetchCartId,
    //         fetchCartDetails
    //     });
    // }, [cartApi, fetchCartDetails, fetchCartId]);

    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    );
};

const mapStateToProps = ({cart}) => ({cartState: cart});

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(actions, dispatch),
    asyncActions: bindActionCreators(asyncActions, dispatch),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(CartContextProvider);

export const useCartContext = () => useContext(CartContext);


