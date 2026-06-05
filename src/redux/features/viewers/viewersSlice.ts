import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/**
 * Tracks the live view count returned by the API for each content item.
 * Key: "<resource>:<id>"  e.g. "blog-posts:abc123"
 * Value: number (the current view count as returned by the server)
 */
type ViewersState = {
  counts: Record<string, number>;
};

const initialState: ViewersState = {
  counts: {},
};

const viewersSlice = createSlice({
  name: "viewers",
  initialState,
  reducers: {
    setViewCount(state, action: PayloadAction<{ key: string; count: number }>) {
      state.counts[action.payload.key] = action.payload.count;
    },
  },
});

export const { setViewCount } = viewersSlice.actions;
export default viewersSlice.reducer;
