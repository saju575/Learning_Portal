import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { adminLogin } from "../features/adminAuth/adminAuthSlice";

export default function useAdminAuthCheck() {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  useEffect(() => {
    const localAuth = localStorage.getItem("adminAuth");
    if (localAuth) {
      const auth = JSON.parse(localAuth);
      if (auth?.accessToken && auth?.admin && auth?.admin.role === "admin") {
        dispatch(
          adminLogin({
            accessToken: auth.accessToken,
            admin: auth.admin,
          })
        );
      }
    }
    setAuthChecked(true);
  }, [dispatch, setAuthChecked]);
  return authChecked;
}
