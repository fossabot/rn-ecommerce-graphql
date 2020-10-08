"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCommunicationsPage = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _user = require("../../context/user");

const useCommunicationsPage = props => {
  const {
    afterSubmit,
    mutations: {
      setNewsletterSubscriptionMutation
    },
    queries: {
      getCustomerSubscriptionQuery
    }
  } = props;
  const [{
    isSignedIn
  }] = (0, _user.useUserContext)();
  const {
    data: subscriptionData,
    error: subscriptionDataError
  } = (0, _client.useQuery)(getCustomerSubscriptionQuery, {
    skip: !isSignedIn
  });
  const initialValues = (0, _react.useMemo)(() => {
    if (subscriptionData) {
      return {
        isSubscribed: subscriptionData.customer.is_subscribed
      };
    }
  }, [subscriptionData]);
  const [setNewsletterSubscription, {
    error: setNewsletterSubscriptionError,
    loading: isSubmitting
  }] = (0, _client.useMutation)(setNewsletterSubscriptionMutation);
  const handleSubmit = (0, _react.useCallback)(async formValues => {
    try {
      await setNewsletterSubscription({
        variables: formValues
      });
    } catch {
      // we have an onError link that logs errors, and FormError already renders this error, so just return
      // to avoid triggering the success callback
      return;
    }

    if (afterSubmit) {
      afterSubmit();
    }
  }, [setNewsletterSubscription, afterSubmit]);
  return {
    formErrors: [setNewsletterSubscriptionError, subscriptionDataError],
    initialValues,
    handleSubmit,
    isDisabled: isSubmitting,
    isSignedIn
  };
};

exports.useCommunicationsPage = useCommunicationsPage;
//# sourceMappingURL=useCommunicationsPage.js.map