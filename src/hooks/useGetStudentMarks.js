import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetAssignmentMarksQuery } from "../features/assignment/assignmentApi";
import { addStudents } from "../features/leaderboard/leaderboardSlice";
import { useGetQuizMarksQuery } from "../features/quiz/quizApi";

const useGetStudentMarks = () => {
  const { data: quizMarks, isSuccess: quizMarkSuccess } =
    useGetQuizMarksQuery();
  const { data: assignmentMarks, isSuccess: assignmentMarkSuccess } =
    useGetAssignmentMarksQuery();
  // undefined, { refetchOnMountOrArgChange: true }
  const dispatch = useDispatch();
  const { leaderboard, isLoading, isSuccess } = useSelector(
    (state) => state.leaderboard
  );
  useEffect(() => {
    if (
      quizMarkSuccess &&
      assignmentMarkSuccess &&
      quizMarks &&
      assignmentMarks
    ) {
      dispatch(
        addStudents({
          quizMarks,
          assignmentMarks,
        })
      );
    }
  }, [
    quizMarkSuccess,
    assignmentMarkSuccess,
    assignmentMarks,
    quizMarks,
    dispatch,
  ]);
  return { leaderboard, isLoading, isSuccess };
};

export default useGetStudentMarks;
