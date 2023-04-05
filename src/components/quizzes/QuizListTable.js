import React from "react";
import { useSelector } from "react-redux";
import { useGetAllQuizesQuery } from "../../features/admin/quizes/quizesApi";
import Error from "../ui/Error";
import QuizDeleteModal from "../ui/modal/QuizDeleteModal";
import QuizUpdateModal from "../ui/modal/QuizUpdateModal";
import QuizListTableRow from "./QuizListTableRow";

const QuizListTable = () => {
  const { data: quizes, isLoading, isError, error } = useGetAllQuizesQuery();
  const { showUpdateModal, showDeleteModal } = useSelector(
    (state) => state.adminQuiz
  );
  //decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && quizes?.length === 0) {
    content = <div>No Quiz found</div>;
  } else if (!isLoading && !isError && quizes?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Question</th>
            <th className="table-th">Video</th>
            <th className="table-th justify-center">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {quizes.map((q) => (
            <QuizListTableRow key={q.id} quiz={q} />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="element-with-scrollbar overflow-x-auto mt-4">
      {content}
      {showUpdateModal && <QuizUpdateModal />}
      {showDeleteModal && <QuizDeleteModal />}
    </div>
  );
};

export default QuizListTable;
