"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useAccountChip = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _user = require("@magento/peregrine/lib/context/user");

/**
 * The useAccountChip talon supports the AccountChip component.
 *
 * @param {GraphQLAST} props.queries.getCustomerDetailsQuery
 *
 * @returns {Object} talonProps
 * @returns {Object} talonProps.currentUser - Details about the currently signed-in user.
 * @returns {Bool}   talonProps.isLoadingUserName - Indicates when we know there is a
 *  user signed in, but we don't yet have their name.
 * @returns {Bool}   talonProps.isUserSignedIn - Indicates whether we have a signed-in user.
 */
const useAccountChip = props => {
  const {
    queries: {
      getCustomerDetailsQuery
    }
  } = props;
  const [{
    isSignedIn: isUserSignedIn
  }] = (0, _user.useUserContext)();
  const {
    data
  } = (0, _client.useQuery)(getCustomerDetailsQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !isUserSignedIn
  });
  const currentUser = (0, _react.useMemo)(() => {
    return data && data.customer || null;
  }, [data]);
  return {
    currentUser,
    isLoadingUserName: isUserSignedIn && !currentUser,
    isUserSignedIn
  };
};

exports.useAccountChip = useAccountChip;
//# sourceMappingURL=useAccountChip.js.map