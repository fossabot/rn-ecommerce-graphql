"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useWishlistPage = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _client = require("@apollo/client");

var _user = require("../../context/user");

var _useTypePolicies = require("../../hooks/useTypePolicies");

const useWishlistPage = props => {
  const {
    queries,
    types
  } = props;
  const {
    getCustomerWishlistQuery
  } = queries;
  (0, _useTypePolicies.useTypePolicies)(types);
  const history = (0, _reactRouterDom.useHistory)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const {
    data,
    error
  } = (0, _client.useQuery)(getCustomerWishlistQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !isSignedIn
  });
  const derivedWishlists = (0, _react.useMemo)(() => {
    return data && data.customer.wishlists || [];
  }, [data]);
  const errors = (0, _react.useMemo)(() => {
    return new Map([['getCustomerWishlistQuery', error]]);
  }, [error]);
  (0, _react.useEffect)(() => {
    if (!isSignedIn) {
      history.push('/');
    }
  }, [history, isSignedIn]);
  return {
    errors,
    wishlists: derivedWishlists
  };
};

exports.useWishlistPage = useWishlistPage;
//# sourceMappingURL=useWishlistPage.js.map