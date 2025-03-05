import { createSlice } from "@reduxjs/toolkit";

const initialState: Record<string, number> = {};

const viewsSlice = createSlice({
  name: "views",
  initialState,
  reducers: {
    incrementView: (state, action) => {
      const blogId = action.payload;
      state[blogId] = (state[blogId] || 0) + 1;
    },
  },
});

export const { incrementView } = viewsSlice.actions;
export default viewsSlice.reducer;
