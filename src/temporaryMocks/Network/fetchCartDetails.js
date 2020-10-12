export const fetchCartDetails = (params: params): answer => {
  return {
    data: {
      cart: {},
    },
  };
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
