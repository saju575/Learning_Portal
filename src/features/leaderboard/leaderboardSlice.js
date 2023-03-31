const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  leaderboard: [],
  isLoading: false,
  isSuccess: false,
};

const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    addStudents: (state, action) => {
      state.isLoading = true;
      const result = action.payload.quizMarks.reduce((acc, curr) => {
        const existingStudent = acc.find(
          (item) => item.student_id === curr.student_id
        );
        if (existingStudent) {
          existingStudent.quizMark += curr.mark;
        } else {
          const id = acc.length > 0 ? acc[acc.length - 1].id + 1 : 1;
          acc.push({
            id,
            student_id: curr.student_id,
            student_name: curr.student_name,
            quizMark: curr.mark,
            assignmentMark: 0,
          });
        }
        return acc;
      }, []);
      const finalResult = action.payload.assignmentMarks.reduce((acc, curr) => {
        const exist = acc.find((item) => item.student_id === curr.student_id);
        if (exist) {
          exist.assignmentMark += curr.mark;
        } else {
          const id = acc.length > 0 ? acc[acc.length - 1].id + 1 : 1;
          acc.push({
            id,
            student_id: curr.student_id,
            student_name: curr.student_name,
            quizMark: 0,
            assignmentMark: curr.mark,
          });
        }
        return acc;
      }, result);
      finalResult.sort(
        (a, b) =>
          b.quizMark + b.assignmentMark - (a.quizMark + a.assignmentMark)
      );
      let previousMark = -1;
      let rank = 0;

      finalResult.forEach((obj) => {
        if (obj.quizMark + obj.assignmentMark !== previousMark) {
          rank++;
          previousMark = obj.quizMark + obj.assignmentMark;
        }
        obj.rank = rank;
      });
      finalResult.sort((a, b) => a.rank - b.rank);
      state.leaderboard = finalResult;
      state.isLoading = false;
      state.isSuccess = true;
    },
  },
});

export default leaderboardSlice.reducer;

export const { addStudents } = leaderboardSlice.actions;
