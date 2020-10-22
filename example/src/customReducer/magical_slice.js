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
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const asyncIncrease = async (num: number) => {
  setTimeout(() => counterSlice.actions.increment(num), 2000);
};
export default counterSlice.reducer;
