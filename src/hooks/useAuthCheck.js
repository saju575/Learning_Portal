import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLogedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const localAuth = localStorage.getItem("auth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.user && auth?.user.role === "student") {
        dispatch(
          userLogedIn({
            accessToken: auth.accessToken,
            user: auth.user,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);
  return authChecked;
}
