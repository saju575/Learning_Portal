import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentMark: undefined,
};

const assignmentMarksSlice = createSlice({
  name: "adminAssignmentMark",
  initialState,
  reducers: {
    addAssignmentMark: (state, action) => {
      state.assignmentMark = action.payload;
    },
    removeAssignmentMark: (state) => {
      state.assignmentMark = undefined;
    },
  },
});
export default assignmentMarksSlice.reducer;
export const { addAssignmentMark, removeAssignmentMark } =
  assignmentMarksSlice.actions;
