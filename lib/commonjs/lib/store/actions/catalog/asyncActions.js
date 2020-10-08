"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setPrevPageTotal = exports.setCurrentPage = void 0;

var _actions = _interopRequireDefault(require("./actions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const setCurrentPage = payload => async function thunk(dispatch) {
  dispatch(_actions.default.setCurrentPage.receive(payload));
};

exports.setCurrentPage = setCurrentPage;

const setPrevPageTotal = payload => async function thunk(dispatch) {
  dispatch(_actions.default.setPrevPageTotal.receive(payload));
};

exports.setPrevPageTotal = setPrevPageTotal;
//# sourceMappingURL=asyncActions.js.map