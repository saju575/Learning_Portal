import React from "react";
import Player from "../components/course/Player";
import VideoDescription from "../components/course/VideoDescription";
import VideoList from "../components/course/VideoList";

const Course = () => {
  return (
    <section class="py-6 bg-primary">
      <div class="mx-auto max-w-7xl px-5 lg:px-0">
        <div class="grid grid-cols-3 gap-2 lg:gap-8">
          <div class="col-span-full w-full space-y-8 lg:col-span-2">
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
