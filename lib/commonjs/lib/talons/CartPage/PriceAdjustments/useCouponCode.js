"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useCouponCode = void 0;

var _react = require("react");

var _client = require("@apollo/client");

var _cart = require("@magento/peregrine/lib/context/cart");

/**
 * This talon contains the logic for a coupon code form component.
 * It performs effects and returns props data for rendering the component.
 *
 * This talon performs the following effects:
 *
 * - Fetch all coupons associated with the cart
 * - Manage the updating state of the cart while a coupon is being applied or removed
 *
 * @function
 *
 * @param {Object} props
 * @param {function} props.setIsCartUpdating Callback function for setting the update state for the cart.
 * @param {CouponCodeMutations} props.mutations GraphQL mutations for a cart's coupon code.
 * @param {CouponCodeQueries} props.queries GraphQL queries for a cart's coupon code.
 *
 * @return {CouponCodeTalonProps}
 *
 * @example <caption>Importing into your project</caption>
 * import { useCouponCode } from '@magento/peregrine/lib/talons/CartPage/PriceAdjustments/useCouponCode';
 */
const useCouponCode = props => {
  const {
    setIsCartUpdating,
    mutations: {
      applyCouponMutation,
      removeCouponMutation
    },
    queries: {
      getAppliedCouponsQuery
    }
  } = props;
  const [{
    cartId
  }] = (0, _cart.useCartContext)();
  const {
    data,
    error: fetchError
  } = (0, _client.useQuery)(getAppliedCouponsQuery, {
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
    skip: !cartId,
    variables: {
      cartId
    }
  });
  const [applyCoupon, {
    called: applyCouponCalled,
    error: applyError,
    loading: applyingCoupon
  }] = (0, _client.useMutation)(applyCouponMutation);
  const [removeCoupon, {
    called: removeCouponCalled,
    error: removeCouponError,
    loading: removingCoupon
  }] = (0, _client.useMutation)(removeCouponMutation);
  const handleApplyCoupon = (0, _react.useCallback)(async ({
    couponCode
  }) => {
    if (!couponCode) return;

    try {
      await applyCoupon({
        variables: {
          cartId,
          couponCode
        }
      });
    } catch (e) {// Error is logged by apollo link - no need to double log.
    }
  }, [applyCoupon, cartId]);
  const handleRemoveCoupon = (0, _react.useCallback)(async couponCode => {
    try {
      await removeCoupon({
        variables: {
          cartId,
          couponCode
        }
      });
    } catch (e) {// Error is logged by apollo link - no need to double log.
    }
  }, [cartId, removeCoupon]);
  (0, _react.useEffect)(() => {
    if (applyCouponCalled || removeCouponCalled) {
      // If a coupon mutation is in flight, tell the cart.
      setIsCartUpdating(applyingCoupon || removingCoupon);
    }
  }, [applyCouponCalled, applyingCoupon, removeCouponCalled, removingCoupon, setIsCartUpdating]); // Create a memoized error map and toggle individual errors when they change

  const errors = (0, _react.useMemo)(() => new Map([['getAppliedCouponsQuery', fetchError], ['applyCouponMutation', applyError], ['removeCouponMutation', removeCouponError]]), [applyError, fetchError, removeCouponError]);
  return {
    applyingCoupon,
    data,
    errors,
    handleApplyCoupon,
    handleRemoveCoupon,
    removingCoupon
  };
};
/** JSDocs type definitions */

/**
 * GraphQL mutations for a cart's coupon code.
 * This is a type used by the {@link useCouponCode} talon.
 *
 * @typedef {Object} CouponCodeMutations
 *
 * @property {GraphQLAST} applyCouponMutation Mutation for applying a coupon code to a cart.
 * @property {GraphQLAST} removeCouponMutation Mutation for removing a coupon code from a cart.
 *
 * @see [CouponCode.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCode.js}
 * for the queries used Venia
 */

/**
 * GraphQL queries for a cart's coupon code.
 * This is a type used by the {@link useCouponCode} talon.
 *
 * @typedef {Object} CouponCodeQueries
 *
 * @property {GraphQLAST} getAppliedCouponsQuery Query to fetch the currently applied coupons for a cart.
 *
 * @see [CouponCode.js]{@link https://github.com/magento/pwa-studio/blob/develop/packages/venia-ui/lib/components/CartPage/PriceAdjustments/CouponCode/couponCode.js}
 * for the queries used Venia
 */

/**
 * Object type returned by the {@link useCouponCode} talon.
 * It provides props data to use when rendering a coupon code component.
 *
 * @typedef {Object} CouponCodeTalonProps
 *
 * @property {boolean} applyingCoupon True if a coupon is currently being applied. False otherwise.
 * @property {Object} data Data returned from the `getAppliedCouponsQuery`.
 * @property {String} errorMessage If GraphQL error occurs, this value is set.
 * @property {Object} fetchError The error data object returned by a GraphQL query.
 * @property {function} handleApplyCoupon Function to call for handling the application of a coupon code to a cart.
 * @property {function} handleRemoveCoupon Function to call for handling the removal of a coupon code from a cart
 * @property {boolean} removingCoupon True if a coupon code is currently being removed. False otherwise.
 */


exports.useCouponCode = useCouponCode;
//# sourceMappingURL=useCouponCode.js.map