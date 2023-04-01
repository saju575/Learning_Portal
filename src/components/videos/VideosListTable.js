import React from "react";
import { useGetVideosQuery } from "../../features/videos/videosApi";
import Error from "../ui/Error";
import VideosTableRow from "./VideosTableRow";

const VideosListTable = () => {
  const { data: videos, isLoading, isError, error } = useGetVideosQuery();
  //decide what to render
  let content = null;
  if (isLoading) {
    content = <div>Loading...</div>;
  } else if (!isLoading && isError) {
    content = <Error message={error?.data} />;
  } else if (!isLoading && !isError && videos?.length === 0) {
    content = <div>No video found</div>;
  } else if (!isLoading && !isError && videos?.length > 0) {
    content = videos.map((v) => <VideosTableRow key={v.id} video={v} />);
  }
  return (
    <div className="element-with-scrollbar overflow-x-auto mt-4">
      <table className="divide-y-1 text-base divide-gray-600 w-full">
        <thead>
          <tr>
            <th className="table-th">Video Title</th>
            <th className="table-th">Description</th>
            <th className="table-th">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-600/50">{content}</tbody>
      </table>
    </div>
  );
};

export default VideosListTable;
