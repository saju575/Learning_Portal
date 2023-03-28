import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addVideoId } from "../features/videos/videosSlice";

const Wrapper = ({ children }) => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  useEffect(() => {
    dispatch(addVideoId(videoId));
  }, [videoId, dispatch]);

  return children;
};

export default Wrapper;
