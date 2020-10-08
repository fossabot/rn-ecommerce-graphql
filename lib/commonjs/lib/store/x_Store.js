"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.demoStore = void 0;

var _toolkit = require("@reduxjs/toolkit");

var _index = _interopRequireDefault(require("./reducers/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const demoStore = (0, _toolkit.configureStore)({
  reducer: _index.default
});
exports.demoStore = demoStore;
//# sourceMappingURL=x_Store.js.map