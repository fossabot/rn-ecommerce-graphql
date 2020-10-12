export const fetchCartId = (params: fetchParams): answer => {
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
