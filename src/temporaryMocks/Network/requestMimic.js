import { makeId } from '../../lib/util/makeRandomString';

const network_data = (num: number) =>
  [...Array(num).keys()].map((x) => {
    return {
      id: x,
      name: `name ${makeId(4)}`,
    };
  });

export const requestMimic = (url: string, params) => {
  console.log('making request');
  console.log(url);
  console.log(JSON.stringify(params, null, 2));

  return network_data(5);
};
