import { useEffect, useState } from "react";
import { useGetQuizQuery } from "../features/quiz/quizApi";

export function useQuizHaveOrNot(videoId) {
  const { data: quiz, isSuccess } = useGetQuizQuery(videoId);
  const [have, setHave] = useState(false);
  useEffect(() => {
    if (isSuccess) {
      if (quiz.length > 0) {
        setHave(true);
      } else {
        setHave(false);
      }
    }
  }, [isSuccess, quiz, videoId]);
  return have;
}
