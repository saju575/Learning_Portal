import React from "react";
import { useDispatch } from "react-redux";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import QuizListTable from "../../components/quizzes/QuizListTable";
import Title from "../../components/ui/Title";
import QuizAddModal from "../../components/ui/modal/QuizAddModal";
import { setShowAddModal } from "../../features/admin/quizes/quizesSlice";

const Quizzes = () => {
  const dispatch = useDispatch();
  return (
    <>
      <Title titleName={"Quizzes"} isAdmin />
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={() => {
                  dispatch(setShowAddModal(true));
                }}
                className="btn ml-auto"
              >
                Add Quiz
              </button>
            </div>

            {/* quiz list table */}
            <QuizListTable />
          </div>
        </div>
      </section>
      <QuizAddModal />
    </>
  );
};

export default Quizzes;
