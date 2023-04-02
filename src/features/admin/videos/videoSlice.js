import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoId: undefined,
  video: undefined,
  showUpdateModal: false,
  showDeleteModal: false,
  showAddModal: false,
  deleteLoading: false,
};

const videoSlice = createSlice({
  name: "adminVideos",
  initialState,
  reducers: {
    addVideoId: (state, action) => {
      state.videoId = action.payload;
    },
    deleteVideoId: (state, action) => {
      state.videoId = undefined;
    },
    addVideoInfo: (state, action) => {
      state.video = action.payload;
    },
    setShowAddModal: (state, action) => {
      state.showAddModal = action.payload;
    },
    setShowUpdateModal: (state, action) => {
      state.showUpdateModal = action.payload;
    },
    setShowDeleteModal: (state, action) => {
      state.showDeleteModal = action.payload;
    },
    setDeleteLoading: (state, action) => {
      state.deleteLoading = action.payload;
    },
  },
});
export default videoSlice.reducer;
export const {
  addVideoInfo,
  setShowAddModal,
  setShowUpdateModal,
  setDeleteLoading,
  setShowDeleteModal,
  addVideoId,
  deleteVideoId,
} = videoSlice.actions;
