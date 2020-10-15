import { cart_data } from './fetchCartDetails';

export const updateItem = (params: {}) => {
  console.log('update item');
  console.log(params);

  const new_cart_data = Object.assign({}, cart_data);
  new_cart_data.data.cart.product = new_cart_data.data.cart.product.map((x) => {
    if (x.id === params.variables.itemId) {
      x.id = params.variables.product.id;
      x.name = params.variables.product.name;
      x.sku = params.variables.product.sku || '';
      x.description = params.variables.product.description || 'Such Empty';
      x.quantity = params.variables.product.quantity || 1;
    }
    return x;
  });
  cart_data = new_cart_data;
};
