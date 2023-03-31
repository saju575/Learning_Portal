import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetVideosQuery } from "../features/videos/videosApi";
import { checkLocalIdExist } from "../utils/checkLocalIdExist";

const LoadFirstVideo = () => {
  const [videoId, setVideoId] = useState("");
  const { data, isSuccess } = useGetVideosQuery();

  useEffect(() => {
    const localVideoInfo = localStorage.getItem("videoInfo");
    if (localVideoInfo && data) {
      const id = JSON.parse(localVideoInfo).storedVideoId;
      if (checkLocalIdExist(data, id)) {
        setVideoId(id);
      } else if (isSuccess && data.length > 0) {
        localStorage.setItem(
          "videoInfo",
          JSON.stringify({
            storedVideoId: data[0].id,
          })
        );

        setVideoId(data[0].id);
      }
    } else if (isSuccess && data.length > 0) {
      localStorage.setItem(
        "videoInfo",
        JSON.stringify({
          storedVideoId: data[0].id,
        })
      );

      setVideoId(data[0].id);
    }
  }, [isSuccess, data]);

  return isSuccess && videoId ? <Navigate to={`/course/${videoId}`} /> : null;
};

export default LoadFirstVideo;
