"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isProductConfigurable = void 0;

// TODO: Move/merge with product util in peregrine?
const isProductConfigurable = product => product.__typename === 'ConfigurableProduct';

exports.isProductConfigurable = isProductConfigurable;
//# sourceMappingURL=isProductConfigurable.js.map