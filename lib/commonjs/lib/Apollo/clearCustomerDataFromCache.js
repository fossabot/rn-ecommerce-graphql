"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearCustomerDataFromCache = void 0;

var _deleteCacheEntry = require("./deleteCacheEntry");

/**
 * Deletes all references to Customer from the apollo cache including entries
 * that start with "$" which were automatically created by Apollo InMemoryCache.
 * By coincidence this rule additionally clears CustomerAddress entries, but
 * we'll need to keep this in mind by adding additional patterns as MyAccount
 * features are completed.
 *
 * @param {ApolloClient} client
 */
const clearCustomerDataFromCache = async client => {
  await (0, _deleteCacheEntry.deleteCacheEntry)(client, key => key.match(/^\$?Customer/));
};

exports.clearCustomerDataFromCache = clearCustomerDataFromCache;
//# sourceMappingURL=clearCustomerDataFromCache.js.map