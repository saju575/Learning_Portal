import React from "react";
import styled from "./AssignmentSubmitModal.module.css";

const AssignmentLinkShowModal = ({
  showModal,
  setShowModal,
  data,
  handleSubmit,
  isLoading,
  isSuccess,
}) => {
  return (
    <>
      {showModal && (
        <div className={styled.modal}>
          <div className={styled.modalContent}>
            <span className={styled.close} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h6>{data.title}</h6>
            <h2>
              আপনি এসাইনমেন্ট এ যা <span>জমা দিয়েছেন</span>
            </h2>
            <p>রিপোসিটরি লিঙ্ক</p>
            <hr />
            <p>{data?.repo_link}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentLinkShowModal;
