"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useOrderHistoryPage = void 0;

var _react = require("react");

var _reactRouterDom = require("react-router-dom");

var _client = require("@apollo/client");

var _app = require("../../context/app");

var _user = require("../../context/user");

var _useTypePolicies = require("../../hooks/useTypePolicies");

const useOrderHistoryPage = props => {
  const {
    queries,
    types
  } = props;
  const {
    getCustomerOrdersQuery
  } = queries;
  (0, _useTypePolicies.useTypePolicies)(types);
  const [, {
    actions: {
      setPageLoading
    }
  }] = (0, _app.useAppContext)();
  const history = (0, _reactRouterDom.useHistory)();
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const {
    data,
    loading
  } = (0, _client.useQuery)(getCustomerOrdersQuery, {
    fetchPolicy: 'cache-and-network',
    skip: !isSignedIn
  });
  const isLoadingWithoutData = !data && loading;
  const isBackgroundLoading = !!data && loading;
  const orders = (0, _react.useMemo)(() => {
    if (data) {
      return data.customer.orders.items;
    }

    return [];
  }, [data]); // If the user is no longer signed in, redirect to the home page.

  (0, _react.useEffect)(() => {
    if (!isSignedIn) {
      history.push('/');
    }
  }, [history, isSignedIn]); // Update the page indicator if the GraphQL query is in flight.

  (0, _react.useEffect)(() => {
    setPageLoading(isBackgroundLoading);
  }, [isBackgroundLoading, setPageLoading]);
  return {
    isLoadingWithoutData,
    orders
  };
};

exports.useOrderHistoryPage = useOrderHistoryPage;
//# sourceMappingURL=useOrderHistoryPage.js.map