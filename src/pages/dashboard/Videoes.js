import React from "react";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import VideosListTable from "../../components/videos/VideosListTable";

const Videoes = () => {
  return (
    <>
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button className="btn ml-auto">Add Video</button>
            </div>
            {/* video table  */}
            <VideosListTable />
          </div>
        </div>
      </section>
    </>
  );
};

export default Videoes;
