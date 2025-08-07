import { createSlice } from "@reduxjs/toolkit";

const exampleSlice = createSlice({
  name: "example",
  initialState: { count: 0 },
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const { increment, decrement } = exampleSlice.actions;
export default exampleSlice.reducer;
