"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _redux = require("redux");

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _log = _interopRequireDefault(require("../middleware/log"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const middleware = [_reduxThunk.default];

if (process.env.NODE_ENV !== 'production') {
  middleware.push(_log.default);
}

var _default = (0, _redux.applyMiddleware)(...middleware);

exports.default = _default;
//# sourceMappingURL=middleware.js.map