import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: undefined,
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    addVideoId: (state, action) => {
      state.id = action.payload;
    },
  },
});

export default videosSlice.reducer;
export const { addVideoId } = videosSlice.actions;
