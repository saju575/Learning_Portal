import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAddAssignmentMutation } from "../../../features/admin/assignments/assignmentsApi";
import { setShowAddModal } from "../../../features/admin/assignments/assignmentsSlice";
import useGetVideoTitleOption from "../../../hooks/useGetVideoTitleOption";
import style from "./AddAssignmentModal.module.css";

const AddAssignmentModal = () => {
  const { restVideos: videoList } = useGetVideoTitleOption();
  const { showAddModal: showModal } = useSelector(
    (state) => state.adminAssignment
  );
  const [addAssignment, { isSuccess, isLoading }] = useAddAssignmentMutation();
  const dispatch = useDispatch();

  //local state to handle form

  const [input, setInput] = useState({
    title: "",
    totalMark: "",
    videoId: "",
  });

  useEffect(() => {
    if (isSuccess) {
      setInput({ title: "", totalMark: "", videoId: "" });
      dispatch(setShowAddModal(false));
    }
  }, [dispatch, isSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // eslint-disable-next-line eqeqeq
    const video = videoList?.find((v) => v.id == input.videoId);
    const obj = {
      title: input.title,
      totalMark: input.totalMark,
      video_id: video.id,
      video_title: video.title,
    };
    addAssignment({ ...obj });
  };
  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => {
                dispatch(setShowAddModal(false));
              }}
              className={style.close}
            >
              &times;
            </span>
            <h2>Add Assignment According to Video Title</h2>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.inputBox}>
                <label>Assignment Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Assignment title"
                  required
                  value={input.title}
                  onChange={(e) =>
                    setInput((prv) => ({ ...prv, title: e.target.value }))
                  }
                />
              </div>

              <div className={style.column}>
                <div className={style.inputBox}>
                  <label>Available Video Title List</label>
                  <div className={style.selectBox}>
                    <select
                      required
                      value={input.videoId}
                      onChange={(e) => {
                        setInput((prv) => ({
                          ...prv,
                          videoId: e.target.value,
                        }));
                      }}
                    >
                      <option value={""} hidden>
                        Select video title
                      </option>
                      {videoList.length > 0 &&
                        videoList.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.title}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className={style.inputBox}>
                  <label>Total Marks</label>
                  <input
                    name="views"
                    type="number"
                    min={1}
                    placeholder="Enter total marks"
                    required
                    value={input.totalMark}
                    onChange={(e) => {
                      setInput((prv) => ({
                        ...prv,
                        totalMark: e.target.valueAsNumber,
                      }));
                    }}
                  />
                </div>
              </div>

              <div className={style.btnDiv}>
                <button disabled={isLoading}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddAssignmentModal;
