import React from "react";
import { useSelector } from "react-redux";
import { useGetAssignmentsQuery } from "../../features/assignment/assignmentApi";
import Error from "../ui/Error";
import AssignmentDeleteConfirmModal from "../ui/modal/AssignmentDeleteConfirmModal";
import UpdateAssignmentModal from "../ui/modal/UpdateAssignmentModal";
import AssignmentTableRow from "./AssignmentTableRow";

const AssignmentList = () => {
  const {
    data: assignments,
    isLoading,
    isError,
    error,
  } = useGetAssignmentsQuery();
  const { showUpdateModal, showDeleteModal } = useSelector(
    (state) => state.adminAssignment
  );
  //decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && assignments?.length === 0) {
    content = <div>No assignment found</div>;
  } else if (!isLoading && !isError && assignments?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Title</th>
            <th className="table-th">Video Title</th>
            <th className="table-th">Mark</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-600/50">
          {assignments.map((a) => (
            <AssignmentTableRow key={a.id} assignment={a} />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="element-with-scrollbar overflow-x-auto mt-4">
      {content}
      {showUpdateModal && <UpdateAssignmentModal />}
      {showDeleteModal && <AssignmentDeleteConfirmModal />}
    </div>
  );
};

export default AssignmentList;
