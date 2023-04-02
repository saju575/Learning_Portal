import { useEffect, useState } from "react";
import { useGetAssignmentsQuery } from "../features/assignment/assignmentApi";
import { useGetVideosQuery } from "../features/videos/videosApi";

const useGetVideoTitleOption = () => {
  const { data: assignments, isSuccess: getAssignmentsSuccess } =
    useGetAssignmentsQuery();
  const { data: videos, isSuccess: getVideosSuccess } = useGetVideosQuery();
  const [restVideos, setRestVideos] = useState([]);

  // console.log(assignments);
  // console.log(videos);
  useEffect(() => {
    if (
      getAssignmentsSuccess &&
      getVideosSuccess &&
      (assignments.length > 0 || videos.length > 0)
    ) {
      const videoIds = assignments.map((assignment) => assignment.video_id);
      const videosNotUsedInAssignments = videos.filter(
        (video) => !videoIds.some((id) => id === video.id)
      );

      setRestVideos(videosNotUsedInAssignments);
    }
  }, [getAssignmentsSuccess, getVideosSuccess, assignments, videos]);
  //console.log(restVideos);
  return { restVideos };
};

export default useGetVideoTitleOption;
