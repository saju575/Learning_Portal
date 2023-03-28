import React from "react";
import { useParams } from "react-router-dom";
import Player from "../components/course/Player";
import VideoDescription from "../components/course/VideoDescription";
import VideoList from "../components/course/VideoList";
import Navbar from "../components/navbar/Navbar";
import Error from "../components/ui/Error";
import { useGetVideoQuery } from "../features/videos/videosApi";

const Course = () => {
  const { videoId } = useParams();

  const { data: video, isLoading, isError, error } = useGetVideoQuery(videoId);
  let content = null;
  if (isLoading) {
    content = (
      <>
        {/* <PlayerLoader /> */}
        {/* <DescriptionLoader /> */}
        <div>Loadding...</div>
      </>
    );
  } else if (!isLoading && isError) {
    content = <Error message={error.data} />;
  } else if (!isLoading && !isError && video?.id) {
    content = (
      <>
        <Player link={video.url} title={video.title} />
        <VideoDescription video={video} />
      </>
    );
  }
  return (
    <>
      <Navbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <div className="grid grid-cols-3 gap-2 lg:gap-8">
            <div className="col-span-full w-full space-y-8 lg:col-span-2">
              {/* Player section */}
              {/* <Player /> */}
              {/* video description */}
              {/* <VideoDescription /> */}
              {content}
            </div>

            {/* All videos List section */}
            <VideoList />
          </div>
        </div>
      </section>
    </>
  );
};

export default Course;
