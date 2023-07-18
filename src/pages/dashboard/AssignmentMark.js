import React from "react";
import AssignmentMarkTable from "../../components/assignmentMark/AssignmentMarkTable";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Error from "../../components/ui/Error";
import Title from "../../components/ui/Title";
import { useGetAssignmentMarksQuery } from "../../features/assignment/assignmentApi";

const AssignmentMark = () => {
  const {
    data: assignmentMarks,
    isLoading,
    isError,
    error,
  } = useGetAssignmentMarksQuery();

  // decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loadding...</div>;
  } else if (!isLoading && isError) {
    content = <Error message={error.data} />;
  } else if (!isLoading && !isError && assignmentMarks.length === 0) {
    content = <Error message={"There is not submitted assignment yet"} />;
  } else if (!isLoading && !isError && assignmentMarks.length > 0) {
    content = (
      <div className="px-3 py-20 bg-opacity-10">
        <ul className="assignment-status">
          <li>
            Total <span>{assignmentMarks.length}</span>
          </li>
          <li>
            Pending{" "}
            <span>
              {assignmentMarks.filter((a) => a.status === "pending").length}
            </span>
          </li>
          <li>
            Mark Sent{" "}
            <span>
              {assignmentMarks.filter((a) => a.status === "published").length}
            </span>
          </li>
        </ul>
        {/* Assignment mark table  */}
        <AssignmentMarkTable assignmentMarks={assignmentMarks} />
      </div>
    );
  }
  return (
    <>
      <Title titleName={"Assignment Marks"} isAdmin />
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">{content}</div>
      </section>
    </>
  );
};

export default AssignmentMark;
