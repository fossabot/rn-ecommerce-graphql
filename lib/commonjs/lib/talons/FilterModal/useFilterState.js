"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFilterState = void 0;

var _react = require("react");

var _withLogger = _interopRequireDefault(require("../../util/withLogger"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const init = next => next instanceof Map ? next : new Map();

const reducer = (state, action) => {
  const {
    payload,
    type
  } = action;

  switch (type) {
    case 'clear':
      {
        return init();
      }

    case 'add item':
      {
        const {
          group,
          item
        } = payload;
        const nextState = new Map(state);
        const nextSet = new Set(state.get(group));
        nextSet.add(item);
        nextState.set(group, nextSet);
        return nextState;
      }

    case 'remove item':
      {
        const {
          group,
          item
        } = payload;
        const nextState = new Map(state);
        const nextSet = new Set(state.get(group));
        nextSet.delete(item); // if removing an item leaves a group empty, delete that group

        if (nextSet.size) {
          nextState.set(group, nextSet);
        } else {
          nextState.delete(group);
        }

        return nextState;
      }

    case 'toggle item':
      {
        const {
          group,
          item
        } = payload;
        const nextState = new Map(state);
        const nextSet = new Set(state.get(group));

        if (nextSet.has(item)) {
          nextSet.delete(item);
        } else {
          nextSet.add(item);
        } // if removing an item leaves a group empty, delete that group


        if (nextSet.size) {
          nextState.set(group, nextSet);
        } else {
          nextState.delete(group);
        }

        return nextState;
      }

    case 'set items':
      {
        return init(payload);
      }
  }
};

const wrappedReducer = (0, _withLogger.default)(reducer);

const useFilterState = () => {
  const [state, dispatch] = (0, _react.useReducer)(wrappedReducer, null, init);
  const addItem = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'add item'
    });
  }, [dispatch]);
  const clear = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'clear'
    });
  }, [dispatch]);
  const removeItem = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'remove item'
    });
  }, [dispatch]);
  const setItems = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'set items'
    });
  }, [dispatch]);
  const toggleItem = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'toggle item'
    });
  }, [dispatch]);
  const api = (0, _react.useMemo)(() => ({
    addItem,
    clear,
    dispatch,
    removeItem,
    setItems,
    toggleItem
  }), [addItem, clear, dispatch, removeItem, setItems, toggleItem]);
  return [state, api];
};

exports.useFilterState = useFilterState;
//# sourceMappingURL=useFilterState.js.map