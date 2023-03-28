import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useGetVideosQuery } from "../features/videos/videosApi";

const LoadFirstVideo = () => {
  const [videoId, setVideoId] = useState("");
  const { data, isSuccess } = useGetVideosQuery();

  useEffect(() => {
    const localVideoInfo = localStorage.getItem("videoInfo");
    if (localVideoInfo) {
      const id = JSON.parse(localVideoInfo).storedVideoId;

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
  }, [isSuccess, data]);

  return isSuccess && videoId ? <Navigate to={`/course/${videoId}`} /> : "";
};

export default LoadFirstVideo;
