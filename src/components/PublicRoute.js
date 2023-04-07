import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useLoadFirstVideo from "../hooks/useLoadFirstVideo";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();
  const [isVideoSet, videoId] = useLoadFirstVideo();
  // console.log(videoId);

  // const localId = localStorage.getItem("videoInfo");

  // if (localId) {
  //   const video = JSON.parse(localId);
  //   videoId = video.storedVideoId;
  // } else {
  //   if (isSuccess) {
  //     videoId = data[0].id;
  //   }
  // }

  // return !isLoggedIn ? children : <Navigate to={`/intermediate`} />;
  return isVideoSet && isLoggedIn && videoId ? (
    <Navigate to={`/course/${videoId}`} />
  ) : (
    children
  );
}
