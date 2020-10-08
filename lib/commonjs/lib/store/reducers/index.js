"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _app = _interopRequireDefault(require("./app"));

var _catalog = _interopRequireDefault(require("./catalog"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cart from './cart';
// import checkout from './checkout';
// import user from './user';
const reducers = {
  app: _app.default,
  // cart,
  catalog: _catalog.default // checkout,
  // user

};
var _default = reducers;
exports.default = _default;
//# sourceMappingURL=index.js.map