import React from "react";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Error from "../ui/Error";
import VideoLoader from "../ui/VideoLoader";
import Video from "./Video";

const VideoList = () => {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  //decide what to rander
  let content = null;
  if (isLoading) {
    content = (
      <>
        <div>Loadding...</div>
      </>
    );
  } else if (!isLoading && isError) {
    content = <Error message={error.data} />;
  } else if (!isLoading && !isError && videos.length === 0) {
    content = <Error message={"No video found"} />;
  } else if (!isLoading && !isError && videos.length > 0) {
    content = videos.map((video) => <Video key={video.id} video={video} />);
  }
  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto bg-secondary p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
      {content}
    </div>
  );
};

export default VideoList;
