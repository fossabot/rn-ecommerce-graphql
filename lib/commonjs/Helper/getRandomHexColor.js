"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomHexColor = void 0;

const getRandomHexColor = () => {
  const possibleCharacters = '0123456789ABCDEF0';

  const getRandomChar = () => possibleCharacters[Math.floor(Math.random() * possibleCharacters.length)];

  return [...Array(6).keys()].reduce((a, b) => a + getRandomChar(), '#');
};

exports.getRandomHexColor = getRandomHexColor;
//# sourceMappingURL=getRandomHexColor.js.map