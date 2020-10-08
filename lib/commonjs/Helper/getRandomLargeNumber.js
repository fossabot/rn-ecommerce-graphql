"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRandomLargeNumber = void 0;

const getRandomLargeNumber = () => {
  const num = Math.random() * Math.pow(10, 7);
  return Number.parseFloat(num).toPrecision(11);
};

exports.getRandomLargeNumber = getRandomLargeNumber;
//# sourceMappingURL=getRandomLargeNumber.js.map