export const fetchCartId = (params: fetchParams): answer => {
  console.log('fetch id');
  return {
    data: {
      cartId: 'this is a cartId',
    },
  };
};

type fetchParams = {
  fetchPolicy?: string,
};

type answer = {
  data?: {
    cartId: string,
  },
  errors?: string,
};
