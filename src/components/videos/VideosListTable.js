import React from "react";
import { useSelector } from "react-redux";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Error from "../ui/Error";
import UpdateVideoModal from "../ui/modal/UpdateVideoModal";
import VideoDeleteConfirmModal from "../ui/modal/VideoDeleteConfirmModal";
import VideosTableRow from "./VideosTableRow";

const VideosListTable = () => {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();

  const { showUpdateModal, showDeleteModal } = useSelector(
    (state) => state.adminVideo
  );

  //decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <div>No video found</div>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Video Title</th>
            <th className="table-th">Description</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">
          {videos.map((v) => (
            <VideosTableRow key={v.id} video={v} />
          ))}
        </tbody>
      </table>
    );
  }
  return (
    <div className="element-with-scrollbar overflow-x-auto mt-4">
      {content}
      {showUpdateModal && <UpdateVideoModal />}
      {showDeleteModal && <VideoDeleteConfirmModal />}
    </div>
  );
};

export default VideosListTable;
