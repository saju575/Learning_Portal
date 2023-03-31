import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToQuizPage: false,
  questions: undefined,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    changeAccess: (state, action) => {
      state.accessToQuizPage = action.payload;
    },
    addQuestions: (state, action) => {
      //state.questions = action.payload;
      state.questions = action.payload.map((quiz) => ({
        ...quiz,
        options: quiz.options.map((option) => ({
          ...option,
          checked: false,
        })),
      }));
    },
    changeChecked: (state, action) => {
      const { quizId, optionId, isChecked } = action.payload;
      const quiz = state.questions.find((q) => q.id === quizId);
      // const option = quiz.options.find((o) => o.id === optionId);
      quiz.options[optionId].checked = isChecked;
    },
  },
});

export default quizSlice.reducer;
export const { changeAccess, addQuestions, changeChecked } = quizSlice.actions;
