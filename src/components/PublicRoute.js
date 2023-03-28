import { Navigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function PublicRoute({ children }) {
  const isLoggedIn = useAuth();

  // const localId = localStorage.getItem("videoInfo");

  // if (localId) {
  //   const video = JSON.parse(localId);
  //   videoId = video.storedVideoId;
  // } else {
  //   if (isSuccess) {
  //     videoId = data[0].id;
  //   }
  // }

  return !isLoggedIn ? children : <Navigate to={`/intermediate`} />;
}
