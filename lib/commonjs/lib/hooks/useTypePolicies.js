"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useTypePolicies = void 0;

var _client = require("@apollo/client");

var _react = require("react");

/**
 * @typedef {string} Type
 * @description A data type as described by your GraphQL schema.
 */

/**
 * @typedef {Object} TypePolicy
 * @description A policy object for a given type.
 * See https://www.apollographql.com/docs/react/caching/cache-configuration/#typepolicy-fields
 */

/**
 * @typedef {Object<Type,TypePolicy>} TypePolicyMap
 * @description A map of Types to type policy object.
 */

/**
 * Adds given type policies to the Apollo Client.
 *
 * @param {TypePolicyMap} typePolicies
 */
const useTypePolicies = typePolicies => {
  const apolloClient = (0, _client.useApolloClient)();
  (0, _react.useEffect)(() => {
    apolloClient.cache.policies.addTypePolicies(typePolicies);
  }, [apolloClient, typePolicies]);
};

exports.useTypePolicies = useTypePolicies;
//# sourceMappingURL=useTypePolicies.js.map