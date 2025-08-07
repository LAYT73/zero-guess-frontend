import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ExampleState {
  count: number;
}

const initialState: ExampleState = {
  count: 0,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setCount: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});

export const { increment, decrement, setCount } = exampleSlice.actions;
export default exampleSlice.reducer;
