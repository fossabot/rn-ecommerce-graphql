import React from 'react';
import { ScrollView } from 'react-native';
import StateDisplayer from './stateDisplayer.js';
import ColorfulButton from '../visualComponent/ColorfulButton.js';

import { useCartContext } from 'simicart';
import { fetchCartId } from 'simicart';
import { fetchCartDetails } from 'simicart';
import { addItemMutation } from 'simicart';
import { removeItem } from 'simicart';
import { updateItem } from 'simicart';

function CartStateDisplay(props) {
  const [cartState, cartApi] = useCartContext();
  const {
    retrieveCartId,
    saveCartId,
    addItemToCart,
    createCart,
    getCartDetails,
    updateItemInCart,
    removeItemFromCart,
    removeCart,
    actions,
  } = cartApi;
  const { reset } = actions;

  return (
    <ScrollView>
      <StateDisplayer data={cartState} title={'Cart'} />
      {/*<Text>{JSON.stringify(Object.entries(cartApi), null, 1)}</Text>*/}
      <ColorfulButton
        title={`Get CART_ID`}
        onPress={() =>
          createCart({
            fetchCartId: fetchCartId,
          })
        }
      />

      <ColorfulButton
        title={`GET_CART_DETAIL`}
        onPress={() =>
          getCartDetails({
            fetchCartDetails: fetchCartDetails,
            fetchCartId: fetchCartId,
          })
        }
      />
      <ColorfulButton
        title={`ADD_ITEM id 7`}
        onPress={() =>
          addItemToCart({
            item: {
              id: 7,
              name: 'added product',
              media_gallery_entries: [],
              sku: 'abc',
              fetchCartId: fetchCartId,
              fetchCartDetails: fetchCartDetails,
              quantity: 2,
              parentSku: 'xyz',
            },
            fetchCartDetails: fetchCartDetails,
            fetchCartId: fetchCartId,
            addItemMutation: addItemMutation,
          })
        }
      />

      <ColorfulButton
        title={`UPDATE_ITEM id 7 quantity -> 3`}
        onPress={() =>
          updateItemInCart({
            item: {
              id: 7,
              name: 'added product',
              media_gallery_entries: [],
              sku: 'abc',
              fetchCartId: fetchCartId,
              fetchCartDetails: fetchCartDetails,
              quantity: 3,
              parentSku: 'xyz',
            },
            fetchCartDetails: fetchCartDetails,
            fetchCartId: fetchCartId,
            addItemMutation: addItemMutation,
            cartItemId: 3,
            removeItem: removeItem,
            updateItem: updateItem,
          })
        }
      />

      <ColorfulButton
        title={`remove Id 7`}
        onPress={() =>
          removeItemFromCart({
            item: {
              id: 7,
            },
            fetchCartDetails: fetchCartDetails,
            fetchCartId: fetchCartId,
            removeItem: removeItem,
          })
        }
      />

      <ColorfulButton title={`Remove Cart`} onPress={() => removeCart()} />

      <ColorfulButton title={`RESET`} onPress={() => reset()} />
    </ScrollView>
  );
}

export default CartStateDisplay;
