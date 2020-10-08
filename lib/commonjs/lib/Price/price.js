"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = require("prop-types");

var _intlPatches = _interopRequireDefault(require("../util/intlPatches"));

var _reactIntl = require("react-intl");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * The **Price** component is used anywhere a price needs to be displayed.
 *
 * Formatting of prices and currency symbol selection is handled entirely by the ECMAScript Internationalization API available in modern browsers.
 *
 * A [polyfill][] is required for any JavaScript runtime that does not have [Intl.NumberFormat.prototype.formatToParts][].
 *
 * [polyfill]: https://www.npmjs.com/package/intl
 * [Intl.NumberFormat.prototype.formatToParts]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat/formatToParts
 */
const Price = props => {
  const {
    locale
  } = (0, _reactIntl.useIntl)();
  const {
    value,
    currencyCode,
    classes
  } = props; // If the optional locale prop is not provided or is undefined,
  // the runtime's default locale is used in the Intl.NumberFormat() constructor.

  const parts = _intlPatches.default.toParts.call(new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode
  }), value);

  const children = parts.map((part, i) => {
    const partClass = classes[part.type];
    const key = "".concat(i, "-").concat(part.value);
    return /*#__PURE__*/_react.default.createElement("span", {
      key: key,
      className: partClass
    }, part.value);
  });
  return /*#__PURE__*/_react.default.createElement(_react.Fragment, null, children);
};

Price.propTypes = {
  /**
   * Class names to use when styling this component
   */
  classes: (0, _propTypes.shape)({
    currency: _propTypes.string,
    integer: _propTypes.string,
    decimal: _propTypes.string,
    fraction: _propTypes.string
  }),

  /**
   * The numeric price
   */
  value: _propTypes.number.isRequired,

  /**
   * A string with any of the currency code supported by Intl.NumberFormat
   */
  currencyCode: _propTypes.string.isRequired
};
Price.defaultProps = {
  classes: {}
};
var _default = Price;
exports.default = _default;
//# sourceMappingURL=price.js.map