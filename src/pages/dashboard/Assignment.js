import React from "react";
import AssignmentList from "../../components/assignment/AssignmentList";
import AdminNavbar from "../../components/navbar/AdminNavbar";

const Assignment = () => {
  return (
    <>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button className="btn ml-auto">Add Assignment</button>
            </div>
            {/* assignment list */}
            <AssignmentList />
          </div>
        </div>
      </section>
    </>
  );
};

export default Assignment;
