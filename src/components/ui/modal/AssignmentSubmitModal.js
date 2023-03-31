import React, { useEffect, useState } from "react";
import styled from "./AssignmentSubmitModal.module.css";

const AssignmentSubmitModal = ({
  showModal,
  setShowModal,
  data,
  handleSubmit,
  isLoading,
  isSuccess,
}) => {
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    if (isSuccess) {
      setShowModal(false);
    }
  }, [isSuccess, setShowModal]);

  return (
    <>
      {showModal && (
        <div className={styled.modal}>
          <div className={styled.modalContent}>
            <span className={styled.close} onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h6>{data.title}</h6>
            <form
              className={styled.form}
              onSubmit={(e) => {
                handleSubmit(e, inputValue);
              }}
            >
              <div className={styled.inputGroup}>
                <label>Github Link:</label>
                <input
                  required
                  className={styled.input}
                  type="text"
                  name="githubLink"
                  placeholder="https://github.com/somthing"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
              </div>
              <div className={styled.warning}>
                Note : After submitting the assignment you can't change the link
              </div>
              <div className={styled.btndiv}>
                <button type="submit" disabled={isLoading}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AssignmentSubmitModal;
