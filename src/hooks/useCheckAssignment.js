import { useEffect, useState } from "react";
import { useGetAssignmentsQuery } from "../features/assignment/assignmentApi";

const useCheckAssignment = (videoId) => {
  const { data: assignments, isSuccess, isLoading } = useGetAssignmentsQuery();
  const [isPresent, setPresent] = useState(false);
  const [assignment, setAssignment] = useState({});

  useEffect(() => {
    if (isSuccess && assignments.length > 0) {
      const result = assignments.find(
        (assignment) => assignment.video_id === videoId
      );

      if (result) {
        setAssignment(result);
        setPresent(true);
      } else {
        setAssignment({});
        setPresent(false);
      }
    }
  }, [isSuccess, assignments, videoId]);
  //console.log(assignments);

  return { isLoading, isPresent, assignment };
};

export default useCheckAssignment;
