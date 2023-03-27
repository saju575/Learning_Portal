import React from "react";
import Player from "../components/course/Player";
import VideoDescription from "../components/course/VideoDescription";
import VideoList from "../components/course/VideoList";

const Course = () => {
  return (
    <section className="py-6 bg-primary">
      <div className="mx-auto max-w-7xl px-5 lg:px-0">
        <div className="grid grid-cols-3 gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {/* Player section */}
            <Player />
            {/* video description */}
            <VideoDescription />
          </div>

          {/* All videos List section */}
          <VideoList />
        </div>
      </div>
    </section>
  );
};

export default Course;