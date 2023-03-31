import { useEffect, useState } from "react";
import { useGetAssignmentMarksQuery } from "../features/assignment/assignmentApi";

const useCheckAssignmentSubmit = (studentId, assignmentId) => {
  const { data: submittedAssignment, isSuccess } = useGetAssignmentMarksQuery();
  const [checked, setChecked] = useState(false);
  const [assignmentInfo, setAssignmentInfo] = useState({});
  useEffect(() => {
    if (isSuccess && submittedAssignment) {
      const r = submittedAssignment.find(
        (item) =>
          item.student_id === studentId && item.assignment_id === assignmentId
      );
      if (r?.id) {
        setAssignmentInfo(r);
        setChecked(true);
      } else {
        setAssignmentInfo({});
        setChecked(false);
      }
    }
  }, [isSuccess, studentId, submittedAssignment, assignmentId]);
  return { checked, assignmentInfo };
};

export default useCheckAssignmentSubmit;
