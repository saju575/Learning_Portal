import { useEffect, useState } from "react";
import { useGetQuizMarksQuery } from "../features/quiz/quizApi";

export function useCheckQuizGiven(studentId, videoId) {
  const { data: allMarks, isSuccess } = useGetQuizMarksQuery();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (isSuccess && allMarks) {
      const r = allMarks.some(
        // eslint-disable-next-line eqeqeq
        (item) => item.student_id === studentId && item.video_id == videoId
      );
      setChecked(r);
    }
  }, [isSuccess, studentId, allMarks, videoId]);
  return checked;
}
