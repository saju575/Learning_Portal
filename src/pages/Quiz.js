import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import QuizHeader from "../components/quiz/QuizHeader";
import QuizList from "../components/quiz/QuizList";
import Error from "../components/ui/Error";
import {
  useGetQuizQuery,
  useSetQuizMarksMutation,
} from "../features/quiz/quizApi";

const Quiz = () => {
  const { quizId } = useParams();
  const {
    data: questions,
    isLoading,
    isError,
    error,
  } = useGetQuizQuery(quizId);
  //post result to server
  const [setQuizMarks, { isSuccess: submitSuccess, isLoading: submitLoading }] =
    useSetQuizMarksMutation();

  const { questions: totalQuestion } = useSelector((state) => state.quiz);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  //useEffect for redirect to leaderboard page

  useEffect(() => {
    if (submitSuccess) {
      sessionStorage.removeItem("quizId");
      navigate("/leaderboard", { replace: true });
    }
  }, [submitSuccess, navigate]);
  //calculate the number of correct answers
  const isCorrectOrNot = (options) => {
    for (const i of options) {
      if (i.checked !== i.isCorrect) {
        return false;
      }
      return true;
    }
  };
  const numberOfCorrect = (tQuestion) => {
    const totalAnswer = tQuestion.reduce((accumulator, question) => {
      const isCorrect = isCorrectOrNot(question.options);
      if (isCorrect) {
        return accumulator + 1;
      }
      return accumulator;
    }, 0);
    return totalAnswer;
  };

  //submit quiz
  const handleQuizSubmit = () => {
    const correct = numberOfCorrect(totalQuestion);
    const obj = {
      student_id: user.id,
      student_name: user.name,
      video_id: quizId,
      video_title: questions[0].video_title,
      totalQuiz: questions.length,
      totalCorrect: correct,
      totalWrong: questions.length - correct,
      totalMark: questions.length * 5,
      mark: correct * 5,
    };
    setQuizMarks(obj);
  };
  //decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading..</div>;
  } else if (!isLoading && isError) {
    content = <Error message={error.data} />;
  } else if (!isLoading && !isError && questions.length > 0) {
    content = (
      <>
        <QuizHeader headerTitle={questions[0].video_title} />
        <QuizList questions={questions} />
        <button
          className="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 "
          onClick={handleQuizSubmit}
          disabled={submitLoading}
        >
          Submit
        </button>
      </>
    );
  }
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          {/* video title depend on this qiuz */}
          {/* <QuizHeader /> */}

          {/* quiz list */}
          {/* <QuizList /> */}
          {content}

          {/* quiz submit button */}
        </div>
      </section>
    </>
  );
};

export default Quiz;
