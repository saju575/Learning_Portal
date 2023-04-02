import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  deleteVideoId,
  setShowDeleteModal,
} from "../../../features/admin/videos/videoSlice";
import { useDeleteVideoMutation } from "../../../features/admin/videos/videosApi";
import style from "./DeleteConfirmModal.module.css";

const VideoDeleteConfirmModal = () => {
  const {
    showDeleteModal: showModal,

    videoId,
  } = useSelector((state) => state.adminVideo);
  //const [confirm,setConfirm]=useState(false)
  const [deleteVideo, { isSuccess, isLoading }] = useDeleteVideoMutation();
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
                  deleteVideo(videoId);
                  dispatch(deleteVideoId());
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

export default VideoDeleteConfirmModal;
