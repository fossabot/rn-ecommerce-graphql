export const getRandomLargeNumber = () => {
  const num = Math.random() * Math.pow(10, 7);
  return Number.parseFloat(num).toPrecision(11);
};
