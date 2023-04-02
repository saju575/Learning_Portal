import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentId: undefined,
  showAddModal: false,
  showUpdateModal: false,
  showDeleteModal: false,
  assignment: undefined,
  showWarningModal: false,
};

const assignmentsSlice = createSlice({
  name: "authAssignments",
  initialState,
  reducers: {
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
    setShowUpdateModal: (state, action) => {
      state.showUpdateModal = action.payload;
    },
    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    addAssignment: (state, action) => {
      state.assignment = action.payload;
    },
    addAssignmentId: (state, action) => {
      state.assignmentId = action.payload;
    },
    deleteAssignmentId: (state) => {
      state.assignmentId = undefined;
    },
    setShowWarrningModal: (state, action) => {
      state.showWarningModal = action.payload;
    },
  },
});
export default assignmentsSlice.reducer;
export const {
  setShowAddModal,
  setShowUpdateModal,
  setShowDeleteModal,
  addAssignment,
  addAssignmentId,
  deleteAssignmentId,
  setShowWarrningModal,
} = assignmentsSlice.actions;
