"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCmsPage = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _app = require("../../context/app");

/**
 * Retrieves data necessary to render a CMS Page
 *
 * @param {object} props
 * @param {object} props.id - CMS Page ID
 * @param {object} props.queries - Collection of GraphQL queries
 * @param {object} props.queries.getCmsPage - Query for getting a CMS Page
 * @returns {{shouldShowLoadingIndicator: *, hasContent: *, cmsPage: *, error: *}}
 */
const useCmsPage = props => {
  const {
    id,
    queries: {
      getCmsPage
    }
  } = props;
  const {
    loading,
    error,
    data
  } = (0, _client.useQuery)(getCmsPage, {
    variables: {
      id: Number(id)
    },
    fetchPolicy: 'cache-and-network'
  });
  const [, {
    actions: {
      setPageLoading
    }
  }] = (0, _app.useAppContext)(); // To prevent loading indicator from getting stuck, unset on unmount.

  (0, _react.useEffect)(() => {
    return () => {
      setPageLoading(false);
    };
  }, [setPageLoading]); // Ensure we mark the page as loading while we check the network for updates

  (0, _react.useEffect)(() => {
    setPageLoading(loading);
  }, [loading, setPageLoading]);
  const shouldShowLoadingIndicator = !data;
  const cmsPage = data ? data.cmsPage : null; // TODO: we shouldn't be validating strings to determine if the page has content or not

  const hasContent = (0, _react.useMemo)(() => {
    return cmsPage && cmsPage.content && cmsPage.content.length > 0 && !cmsPage.content.includes('CMS homepage content goes here.');
  }, [cmsPage]);
  return {
    cmsPage,
    hasContent,
    error,
    shouldShowLoadingIndicator
  };
};

exports.useCmsPage = useCmsPage;
//# sourceMappingURL=useCmsPage.js.map