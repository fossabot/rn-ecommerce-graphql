import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  counter: {
    value: 1,
  },
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter.value++;
    },
    decrement(state) {
      state.counter.value--;
    },
    increaseByAmount(state, action: PayloadAction<number>) {
      state.counter.value += action.payload;
    },
    reset(state) {
      state.counter = initialState.counter;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  reset,
} = counterSlice.actions;

export const asyncIncrease = (num: number) => async (dispatch) => {
  return dispatch(counterSlice.actions.increment());
};

export default counterSlice.reducer;
