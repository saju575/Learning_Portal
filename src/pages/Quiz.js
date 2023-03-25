import React from "react";
import QuizHeader from "../components/quiz/QuizHeader";
import QuizList from "../components/quiz/QuizList";

const Quiz = () => {
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-7xl px-5 lg:px-0">
        {/* video title depend on this qiuz */}
        <QuizHeader />

        {/* quiz list */}
        <QuizList />

        {/* quiz submit button */}
        <button class="px-4 py-2 rounded-full bg-cyan block ml-auto mt-8 hover:opacity-90 active:opacity-100 active:scale-95 ">
          Submit
        </button>
      </div>
    </section>
  );
};

export default Quiz;
