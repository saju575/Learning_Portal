import React from "react";

const SingleQuiz = () => {
  return (
    <div class="quiz">
      <h4 class="question">
        Quiz 1 - What is a Debounce function in JavaScript?
      </h4>
      <form class="quizOptions">
        {/* <!-- Option 1 --> */}
        <label for="option1_q1">
          <input type="checkbox" id="option1_q1" />A function that is called
          after a certain time interval
        </label>

        {/* <!-- Option 2 --> */}
        <label for="option2_q1">
          <input type="checkbox" id="option2_q1" />A function that is called
          after a certain time interval
        </label>

        {/* <!-- Option 3 --> */}
        <label for="option3_q1">
          <input type="checkbox" id="option3_q1" />A function that is called
          after a certain time interval
        </label>

        {/* <!-- Option 4 --> */}
        <label for="option4_q1">
          <input type="checkbox" id="option4_q1" />A function that is called
          after a certain time interval
        </label>
      </form>
    </div>
  );
};

export default SingleQuiz;
