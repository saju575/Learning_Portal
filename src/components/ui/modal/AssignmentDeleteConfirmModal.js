import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDeleteAssignmentMutation } from "../../../features/admin/assignments/assignmentsApi";
import {
  deleteAssignmentId,
  setShowDeleteModal,
} from "../../../features/admin/assignments/assignmentsSlice";
import style from "./DeleteConfirmModal.module.css";

const AssignmentDeleteConfirmModal = () => {
  const { showDeleteModal: showModal, assignmentId } = useSelector(
    (state) => state.adminAssignment
  );
  //const [confirm,setConfirm]=useState(false)
  const [deleteAssignment, { isLoading, isSuccess }] =
    useDeleteAssignmentMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setShowDeleteModal(false));
    }
  }, [isSuccess, dispatch]);

  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => {
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
                  deleteAssignment(assignmentId);
                  dispatch(deleteAssignmentId());
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

export default AssignmentDeleteConfirmModal;
