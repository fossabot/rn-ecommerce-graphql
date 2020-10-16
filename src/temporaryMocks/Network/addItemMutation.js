import { cart_data } from './fetchCartDetails.js';

export const addItemMutation = (params: {
  cartId: string,
  parentSku: string,
  product: {},
  quantity: number,
  sku: string,
}) => {
  console.log('add item');

  const obj = {};
  obj.id = params.variables.product.id;
  obj.name = params.variables.product.name;
  obj.sku = params.variables.product.sku || '';
  obj.description = params.variables.product.description || 'Such Empty';
  obj.quantity = params.variables.product.quantity || 1;
  //
  const new_cart_data = Object.assign({}, cart_data);
  new_cart_data.data.cart.product.push(obj);
  cart_data = new_cart_data;
};
