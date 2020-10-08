"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCartDataFromCache = void 0;

var _deleteCacheEntry = require("./deleteCacheEntry");

/**
 * Deletes all references to Cart from the apollo cache including entries that
 * start with "$" which were automatically created by Apollo InMemoryCache.
 *
 * @param {ApolloClient} client
 */
const clearCartDataFromCache = async client => {
  await (0, _deleteCacheEntry.deleteCacheEntry)(client, key => key.match(/^\$?Cart/)); // Gift Cards are cached by code so we must delete these too.

  await (0, _deleteCacheEntry.deleteCacheEntry)(client, key => key.match(/^\$?AppliedGiftCard/));
};

exports.clearCartDataFromCache = clearCartDataFromCache;
//# sourceMappingURL=clearCartDataFromCache.js.map