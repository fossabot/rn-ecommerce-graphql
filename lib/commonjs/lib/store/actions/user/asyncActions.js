"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearToken = exports.setToken = exports.resetPassword = exports.getUserDetails = exports.signOut = void 0;

var _simplePersistence = _interopRequireDefault(require("../../../util/simplePersistence"));

var _cart = require("../cart");

var _checkout = require("../checkout");

var _actions = _interopRequireDefault(require("./actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const storage = new _simplePersistence.default();

const signOut = (payload = {}) => async function thunk(dispatch) {
  const {
    revokeToken
  } = payload;

  if (revokeToken) {
    // Send mutation to revoke token.
    try {
      await revokeToken();
    } catch (error) {
      console.error('Error Revoking Token', error);
    }
  } // Remove token from local storage and Redux.


  await dispatch(clearToken());
  await dispatch(_actions.default.reset());
  await (0, _checkout.clearCheckoutDataFromStorage)(); // Now that we're signed out, forget the old (customer) cart.
  // We don't need to create a new cart here because we're going to refresh
  // the page immediately after.

  await dispatch((0, _cart.removeCart)());
};

exports.signOut = signOut;

const getUserDetails = ({
  fetchUserDetails
}) => async function thunk(...args) {
  const [dispatch, getState] = args;
  const {
    user
  } = getState();

  if (user.isSignedIn) {
    dispatch(_actions.default.getDetails.request());

    try {
      const {
        data
      } = await fetchUserDetails();
      dispatch(_actions.default.getDetails.receive(data.customer));
    } catch (error) {
      dispatch(_actions.default.getDetails.receive(error));
    }
  }
};

exports.getUserDetails = getUserDetails;

const resetPassword = ({
  email
}) => async function thunk(...args) {
  const [dispatch] = args;
  dispatch(_actions.default.resetPassword.request()); // TODO: actually make the call to the API.
  // For now, just return a resolved promise.

  await Promise.resolve(email);
  dispatch(_actions.default.resetPassword.receive());
};

exports.resetPassword = resetPassword;

const setToken = token => async function thunk(...args) {
  const [dispatch] = args; // Store token in local storage.
  // TODO: Get correct token expire time from API

  storage.setItem('signin_token', token, 3600); // Persist in store

  dispatch(_actions.default.setToken(token));
};

exports.setToken = setToken;

const clearToken = () => async function thunk(...args) {
  const [dispatch] = args; // Clear token from local storage

  storage.removeItem('signin_token'); // Remove from store

  dispatch(_actions.default.clearToken());
};

exports.clearToken = clearToken;
//# sourceMappingURL=asyncActions.js.map