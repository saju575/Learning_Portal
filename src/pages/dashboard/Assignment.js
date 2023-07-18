import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AssignmentList from "../../components/assignment/AssignmentList";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Title from "../../components/ui/Title";
import AddAssignmentModal from "../../components/ui/modal/AddAssignmentModal";
import AssignmentAddWarningModal from "../../components/ui/modal/AssignmentAddWarningModal";
import {
  setShowAddModal,
  setShowWarrningModal,
} from "../../features/admin/assignments/assignmentsSlice";
import useGetVideoTitleOption from "../../hooks/useGetVideoTitleOption";

const Assignment = () => {
  const { showAddModal, showWarningModal } = useSelector(
    (state) => state.adminAssignment
  );
  const { restVideos: videoList } = useGetVideoTitleOption();
  const dispatch = useDispatch();
  return (
    <>
      <Title titleName={"Assignment"} isAdmin />
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={() => {
                  if (videoList.length === 0) {
                    dispatch(setShowWarrningModal(true));
                  } else {
                    dispatch(setShowAddModal(true));
                  }
                }}
                className="btn ml-auto"
              >
                Add Assignment
              </button>
            </div>
            {/* assignment list */}
            <AssignmentList />
          </div>
        </div>
      </section>
      {showAddModal && <AddAssignmentModal />}
      {showWarningModal && <AssignmentAddWarningModal />}
    </>
  );
};

export default Assignment;
