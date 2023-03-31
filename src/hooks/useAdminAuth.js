import { useSelector } from "react-redux";

const useAdminAuth = () => {
  const auth = useSelector((state) => state.adminAuth);

  if (auth?.accessToken && auth?.admin && auth?.admin.role === "admin") {
    return true;
  } else {
    return false;
  }
};

export default useAdminAuth;
