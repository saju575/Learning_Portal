import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useGetVideosQuery } from "../features/videos/videosApi";
import { addVideoId } from "../features/videos/videosSlice";
import { checkLocalIdExist } from "../utils/checkLocalIdExist";

const useLoadFirstVideo = () => {
  const [videoId, setVideoId] = useState("");
  const { data, isSuccess } = useGetVideosQuery();
  const [isVideoSet, setIsVideoSet] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const localVideoInfo = localStorage.getItem("videoInfo");
    if (localVideoInfo && data) {
      const id = JSON.parse(localVideoInfo).storedVideoId;
      if (checkLocalIdExist(data, id)) {
        dispatch(addVideoId(id));
        setVideoId(id);

        setIsVideoSet(true);
      } else if (isSuccess && data.length > 0) {
        localStorage.setItem(
          "videoInfo",
          JSON.stringify({
            storedVideoId: data[0].id,
          })
        );
        dispatch(addVideoId(data[0].id));
        setVideoId(data[0].id);
        setIsVideoSet(true);
      }
    } else if (isSuccess && data.length > 0) {
      localStorage.setItem(
        "videoInfo",
        JSON.stringify({
          storedVideoId: data[0].id,
        })
      );
      dispatch(addVideoId(data[0].id));
      setVideoId(data[0].id);
      setIsVideoSet(true);
    }
  }, [isSuccess, data, dispatch]);
  return [isVideoSet, videoId];
};

export default useLoadFirstVideo;
