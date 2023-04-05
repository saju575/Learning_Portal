import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quizId: undefined,
  showAddModal: false,
  showUpdateModal: false,
  showDeleteModal: false,
  quiz: undefined,
};

const quizesSlice = createSlice({
  name: "authQuizes",
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
    addQuiz: (state, action) => {
      state.quiz = action.payload;
    },
    addQuizId: (state, action) => {
      state.quizId = action.payload;
    },
    deleteQuizId: (state) => {
      state.quizId = undefined;
    },
  },
});
export default quizesSlice.reducer;
export const {
  setShowAddModal,
  setShowUpdateModal,
  setShowDeleteModal,
  addQuiz,
  addQuizId,
  deleteQuizId,
} = quizesSlice.actions;
