export const getRandomHexColor = () => {
  const possibleCharacters = '0123456789ABCDEF0';

  const getRandomChar = () => possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];

  return [...Array(6).keys()].reduce((a, b) => a + getRandomChar(), '#');
};
//# sourceMappingURL=getRandomHexColor.js.map