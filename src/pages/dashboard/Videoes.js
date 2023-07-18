import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminNavbar from "../../components/navbar/AdminNavbar";
import Title from "../../components/ui/Title";
import AddVideoModal from "../../components/ui/modal/AddVideoModal";
import VideosListTable from "../../components/videos/VideosListTable";
import { setShowAddModal } from "../../features/admin/videos/videoSlice";

const Videoes = () => {
  const { showAddModal: showModal } = useSelector((state) => state.adminVideo);
  const dispatch = useDispatch();
  return (
    <>
      <Title titleName={"Videos"} isAdmin />
      <AdminNavbar />
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-full px-5 lg:px-20">
          <div className="px-3 py-20 bg-opacity-10">
            <div className="w-full flex">
              <button
                onClick={() => dispatch(setShowAddModal(true))}
                className="btn ml-auto"
              >
                Add Video
              </button>
            </div>
            {/* video table  */}
            <VideosListTable />
          </div>
        </div>
      </section>
      {showModal && <AddVideoModal />}
    </>
  );
};

export default Videoes;
