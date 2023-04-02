import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowAddModal } from "../../../features/admin/videos/videoSlice";
import { useAddVideoMutation } from "../../../features/admin/videos/videosApi";
import { formatNumberToShorter } from "../../../utils/formateNumberToShorter";
import style from "./UpdateVideoModal.module.css";
const AddVideoModal = () => {
  const [addVideo, { isLoading, isSuccess }] = useAddVideoMutation();
  const { showAddModal: showModal } = useSelector((state) => state.adminVideo);
  const dispatch = useDispatch();
  const [video, setVideo] = useState({
    title: "",
    url: "",
    description: "",
    duration: "",
    views: "",
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setShowAddModal(false));
    }
  }, [isSuccess, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    addVideo({
      ...video,
      views: formatNumberToShorter(video.views),
      createdAt: new Date().toISOString(),
    });
  };
  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => dispatch(setShowAddModal(false))}
              className={style.close}
            >
              &times;
            </span>
            <h2>Add Video Information</h2>
            <form className={style.form} onSubmit={handleSubmit}>
              <div className={style.inputBox}>
                <label>Video Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter video title"
                  required
                  value={video.title}
                  onChange={(e) => {
                    setVideo((draft) => {
                      return {
                        ...draft,
                        [e.target.name]: e.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className={style.inputBox}>
                <label>Video url</label>
                <input
                  type="url"
                  name="url"
                  placeholder="Enter video url"
                  required
                  value={video.url}
                  onChange={(e) => {
                    setVideo((draft) => {
                      return {
                        ...draft,
                        [e.target.name]: e.target.value,
                      };
                    });
                  }}
                />
              </div>

              <div className={style.column}>
                <div className={style.inputBox}>
                  <label>Number of views</label>
                  <input
                    name="views"
                    type="number"
                    min={0}
                    placeholder="Enter number of views"
                    required
                    value={video.views}
                    onChange={(e) => {
                      setVideo((draft) => {
                        return {
                          ...draft,
                          [e.target.name]: e.target.valueAsNumber,
                        };
                      });
                    }}
                  />
                </div>
                <div className={style.inputBox}>
                  <label>Duration</label>
                  <input
                    type="text"
                    placeholder="Enter duration"
                    required
                    name="duration"
                    value={video.duration}
                    onChange={(e) => {
                      setVideo((draft) => {
                        return {
                          ...draft,
                          [e.target.name]: e.target.value,
                        };
                      });
                    }}
                  />
                </div>
              </div>

              <div className={style.inputBox}>
                <label>Description</label>
                <textarea
                  rows={5}
                  name="description"
                  placeholder="Enter video description"
                  required
                  value={video.description}
                  onChange={(e) => {
                    setVideo((draft) => {
                      return {
                        ...draft,
                        [e.target.name]: e.target.value,
                      };
                    });
                  }}
                ></textarea>
                {/* <input type="text" placeholder="Enter street address" required /> */}
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

export default AddVideoModal;
