"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useRestResponse = void 0;

var _react = require("react");

const initialState = {
  data: null,
  error: null,
  loading: false
};

const reducer = (state, {
  payload,
  type
}) => {
  switch (type) {
    case 'set data':
      {
        return { ...state,
          data: payload
        };
      }

    case 'set error':
      {
        return { ...state,
          error: payload
        };
      }

    case 'set loading':
      {
        return { ...state,
          loading: payload
        };
      }

    case 'receive error':
      {
        return {
          data: null,
          error: payload,
          loading: false
        };
      }

    case 'receive response':
      {
        return {
          data: payload,
          error: null,
          loading: false
        };
      }

    case 'reset state':
      {
        return initialState;
      }

    default:
      {
        return state;
      }
  }
};
/**
 * Exposes the current state of the REST response
 * as well as an API for updating that state.
 */


const useRestResponse = () => {
  const [state, dispatch] = (0, _react.useReducer)(reducer, initialState);
  const setData = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'set data'
    });
  }, [dispatch]);
  const setError = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'set error'
    });
  }, [dispatch]);
  const setLoading = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'set loading'
    });
  }, [dispatch]);
  const receiveError = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'receive error'
    });
  }, [dispatch]);
  const receiveResponse = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'receive response'
    });
  }, [dispatch]);
  const resetState = (0, _react.useCallback)(payload => {
    dispatch({
      payload,
      type: 'reset state'
    });
  }, [dispatch]); // This object should never change.

  const api = (0, _react.useMemo)(() => ({
    dispatch,
    receiveError,
    receiveResponse,
    resetState,
    setData,
    setError,
    setLoading
  }), [dispatch, receiveError, receiveResponse, resetState, setData, setError, setLoading]);
  return [state, api];
};

exports.useRestResponse = useRestResponse;
//# sourceMappingURL=useRestResponse.js.map