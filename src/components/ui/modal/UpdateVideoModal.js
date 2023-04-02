import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowUpdateModal } from "../../../features/admin/videos/videoSlice";
import { useEditVideoMutation } from "../../../features/admin/videos/videosApi";
import { formatNumberToShorter } from "../../../utils/formateNumberToShorter";
import { unformatNumber } from "../../../utils/unformatNumber";
import style from "./UpdateVideoModal.module.css";
const UpdateVideoModal = () => {
  const { video: data, showUpdateModal: showModal } = useSelector(
    (state) => state.adminVideo
  );
  const dispatch = useDispatch();
  const [editVideo, { isSuccess, isLoading }] = useEditVideoMutation();
  const [video, setVideo] = useState({
    title: data.title,
    url: data.url,
    description: data.description,
    duration: data.duration,
    views: unformatNumber(data.views),
  });
  useEffect(() => {
    if (isSuccess) {
      dispatch(setShowUpdateModal(false));
    }
  }, [isSuccess, dispatch]);
  const handleSubmit = (e) => {
    e.preventDefault();
    editVideo({
      id: data.id,
      data: {
        ...video,
        views: formatNumberToShorter(video.views),
      },
    });
  };

  return (
    <>
      {showModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <span
              onClick={() => dispatch(setShowUpdateModal(false))}
              className={style.close}
            >
              &times;
            </span>
            <h2>Update Video</h2>
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

export default UpdateVideoModal;
