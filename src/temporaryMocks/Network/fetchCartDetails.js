export let cart_data = {
  data: {
    cart: {
      id: Math.round(Math.random() * 10000) + 1,
      name: 'this is a simple cart detail',
      product: [...Array(2).keys()].map((data, index) => {
        return {
          id: Math.round(Math.random() * 100) + 1,
          name: `Product No.${data}`,
          description: `A nice product`,
          quantity: Math.round(Math.random() * 10) + 1,
        };
      }),
    },
  },
};

export const fetchCartDetails = async (params: params): answer => {
  console.log('fetch cart');
  return cart_data;
};

type params = {
  variables: {} | string,
  fetchPolicy: string,
};

type answer = {
  data: {
    cart: {},
  },
};
