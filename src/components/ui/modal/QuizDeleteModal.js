import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDeleteQuizMutation } from "../../../features/admin/quizes/quizesApi";
import {
  deleteQuizId,
  setShowDeleteModal,
} from "../../../features/admin/quizes/quizesSlice";
import style from "./DeleteConfirmModal.module.css";

const QuizDeleteModal = () => {
  const { showDeleteModal: showModal, quizId } = useSelector(
    (state) => state.adminQuiz
  );
  //const [confirm,setConfirm]=useState(false)
  const [deleteQuiz, { isLoading, isSuccess }] = useDeleteQuizMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setShowDeleteModal(false));
      dispatch(deleteQuizId());
    }
  }, [isSuccess, dispatch]);

  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => {
                dispatch(deleteQuizId());
                dispatch(setShowDeleteModal(false));
              }}
              className={style.close}
            >
              &times;
            </span>
            <h2>Are you want to delete this?</h2>

            <div className={style.btnDiv}>
              <button
                onClick={() => {
                  deleteQuiz(quizId);
                  dispatch(deleteQuizId());
                }}
                disabled={isLoading}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizDeleteModal;
