import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetVideosQuery } from "../features/videos/videosApi";
import { addVideoId } from "../features/videos/videosSlice";
import { checkLocalIdExist } from "../utils/checkLocalIdExist";

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { data: videos, isSuccess } = useGetVideosQuery();

  useEffect(() => {
    if (isSuccess && videos) {
      if (checkLocalIdExist(videos, Number(videoId))) {
        dispatch(addVideoId(videoId));
      } else {
        dispatch(addVideoId(videos[0].id));
      }
    }
  }, [videoId, dispatch, isSuccess, videos]);

  return isSuccess && videos ? children : null;
};

export default Wrapper;
