import React from "react";
import style from "./DeleteConfirmModal.module.css";

const DeleteConfirmModal = ({
  showModal,
  setShowModal,
  setConfirm,
  loading,
}) => {
  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => {
                setShowModal(false);
              }}
              className={style.close}
            >
              &times;
            </span>
            <h2>Are you want to delete this?</h2>

            <div className={style.btnDiv}>
              <button
                onClick={() => {
                  setConfirm(true);
                }}
                disabled={loading}
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

export default DeleteConfirmModal;
