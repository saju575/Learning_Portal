import React from "react";
import { useDispatch } from "react-redux";
import { changeChecked } from "../../features/quiz/quizSlice";
import Option from "../ui/Option";

const SingleQuiz = ({ question }) => {
  const { question: title, options, id } = question;
  const dispatch = useDispatch();

  const handleAnswerChange = (e, index) => {
    dispatch(
      changeChecked({
        quizId: id,
        optionId: index,
        isChecked: e.target.checked,
      })
    );
  };
  return (
    <div className="quiz">
      <h4 className="question">{title}</h4>
      <form className="quizOptions">
        {options.map((option, index) => (
          <Option
            key={option.id}
            htmlFor={`option${option.id}_q${id}`}
            type="checkbox"
            id={`option${option.id}_q${id}`}
            title={option.option}
            value={index}
            checked={option.checked}
            onChange={(e) => {
              handleAnswerChange(e, index);
            }}
          />
        ))}
      </form>
    </div>
  );
};

export default SingleQuiz;
