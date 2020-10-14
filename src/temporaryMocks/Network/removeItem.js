import { cart_data } from './fetchCartDetails.js';

export const removeItem = (params: {
  variables: {
    cartId: cartId,
    itemId: string,
  },
}) => {
  // cart_data.data.cart.product =
  //     cart_data.data.cart.product.filter(
  //         x => x.id !== params.variables.itemId,
  //     );
  console.log('remove item');
  console.log(params);

  const new_cart_data = Object.assign({}, cart_data);
  new_cart_data.data.cart.product = new_cart_data.data.cart.product.filter(
    (x) => x.id !== params.variables.itemId
  );
  cart_data = new_cart_data;
};
