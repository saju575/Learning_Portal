import React from "react";
import SingleQuiz from "./SingleQuiz";

const QuizList = ({ questions }) => {
  return (
    <div className="space-y-8 ">
      {questions.map((q) => (
        <SingleQuiz key={q.id} question={q} />
      ))}
    </div>
  );
};

export default QuizList;
