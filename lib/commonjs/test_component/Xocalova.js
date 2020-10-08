"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _stateDisplayer = _interopRequireDefault(require("./stateDisplayer"));

var _ColorfulButton = _interopRequireDefault(require("../visualComponent/ColorfulButton"));

var _catalog = require("../lib/context/catalog");

var _getRandomLargeNumber = require("../Helper/getRandomLargeNumber");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const cycleRange = 3;

function Xocalova(props) {
  const [count, setCount] = (0, _react.useState)(0);
  const [catalogState, catalogApi] = (0, _catalog.useCatalogContext)();
  const {
    updateCategories,
    setCurrentPage,
    setPrevPageTotal
  } = catalogApi;
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_stateDisplayer.default, {
    data: catalogState,
    title: 'Catalog'
  }), /*#__PURE__*/_react.default.createElement(_ColorfulButton.default, {
    title: 'SET_CURRENT_PAGE',
    onPress: () => {
      setCurrentPage(count);
      setCount(x => x % cycleRange + 1);
    }
  }), /*#__PURE__*/_react.default.createElement(_ColorfulButton.default, {
    title: 'SET_PREV_PAGE_TOTAL',
    onPress: () => {
      setPrevPageTotal((0, _getRandomLargeNumber.getRandomLargeNumber)());
    }
  }));
}

var _default = Xocalova;
exports.default = _default;
//# sourceMappingURL=Xocalova.js.map