import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setShowWarrningModal } from "../../../features/admin/assignments/assignmentsSlice";
import style from "./DeleteConfirmModal.module.css";
const AssignmentAddWarningModal = () => {
  const { showWarningModal: showModal } = useSelector(
    (state) => state.adminAssignment
  );
  const dispatch = useDispatch();
  console.log(showModal);
  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => {
                dispatch(setShowWarrningModal(false));
              }}
              className={style.close}
            >
              &times;
            </span>
            <p>
              You add assignment under all video.To add assignment add more
              video or delete any or some assigned assignment
            </p>

            <div className={style.btnDiv}>
              <button
                onClick={() => {
                  dispatch(setShowWarrningModal(false));
                }}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentAddWarningModal;
