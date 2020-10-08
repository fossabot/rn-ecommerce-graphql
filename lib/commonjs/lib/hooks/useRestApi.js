"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRestApi = void 0;

var _react = require("react");

var RestApi = _interopRequireWildcard(require("../RestApi"));

var _useRestResponse = require("./useRestResponse");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const {
  request
} = RestApi.Magento2;
/**
 * Exposes an API for sending REST calls and handling their responses.
 *
 * @param {String} endpoint - A Magento 2 REST API endpoint.
 *  Ex: /rest/V1/carts/mine/estimate-shipping-methods
 */

const useRestApi = endpoint => {
  const [restResponseState, restResponseApi] = (0, _useRestResponse.useRestResponse)();
  const {
    receiveError,
    receiveResponse,
    setLoading
  } = restResponseApi; // Define a callback that sends a request
  // either as an effect or in response to user interaction.

  const sendRequest = (0, _react.useCallback)(async ({
    options
  }) => {
    // setLoading to true before making the call.
    // There is no need to setLoading to false after because
    // both receiveResponse and receiveError handle that.
    setLoading(true);

    try {
      const response = await request(endpoint, options);
      receiveResponse(response);
    } catch (error) {
      // error is of type M2ApiResponseError here.
      receiveError(error.baseMessage);
    }
  }, [endpoint, receiveError, receiveResponse, setLoading]);
  const api = (0, _react.useMemo)(() => ({ ...restResponseApi,
    sendRequest
  }), [restResponseApi, sendRequest]);
  return [restResponseState, api];
};

exports.useRestApi = useRestApi;
//# sourceMappingURL=useRestApi.js.map