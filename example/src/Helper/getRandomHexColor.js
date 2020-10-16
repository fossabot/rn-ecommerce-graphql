export const getRandomHexColor = (): string => {
  // rare chance of Math.random()==1.
  const possibleCharacters = '0123456789ABCDEF0';
  const getRandomChar = () =>
    possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];
  return [...Array(6).keys()].reduce((a, b) => a + getRandomChar(), '#');
};
