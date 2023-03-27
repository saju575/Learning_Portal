import React from "react";
import SingleQuiz from "./SingleQuiz";

const QuizList = () => {
  return (
    <div className="space-y-8 ">
      <SingleQuiz />
      <SingleQuiz />
      <SingleQuiz />
    </div>
  );
};

export default QuizList;
