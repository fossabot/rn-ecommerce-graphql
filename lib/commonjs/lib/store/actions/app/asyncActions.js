"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toggleSearch = exports.closeDrawer = exports.toggleDrawer = void 0;

var _actions = _interopRequireDefault(require("./actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const toggleDrawer = name => async (dispatch) => dispatch(_actions.default.toggleDrawer(name));

exports.toggleDrawer = toggleDrawer;

const closeDrawer = () => async (dispatch) => dispatch(_actions.default.toggleDrawer(null));
/** @deprecated */


exports.closeDrawer = closeDrawer;

const toggleSearch = () => async (dispatch) => dispatch(_actions.default.toggleSearch());

exports.toggleSearch = toggleSearch;
//# sourceMappingURL=asyncActions.js.map