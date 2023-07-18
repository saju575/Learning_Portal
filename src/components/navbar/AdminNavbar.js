import { useState } from "react";
import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { adminLogedOut } from "../../features/adminAuth/adminAuthSlice";
import styles from "./Navbar.module.css";
const AdminNavbar = () => {
  const { admin } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  //handle logout function
  const handleLogout = () => {
    dispatch(adminLogedOut());
    localStorage.removeItem("adminAuth");
  };

  //handle bottom nav menu
  const handleNavMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className={`${styles.navTop} shadow-md`}>
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex items-center justify-between py-3">
          <Link to={"/admin/dashboard"}>
            <h2 className="font-2xl font-bold">Learning Portal</h2>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              className={`${
                location.pathname === `/admin/dashboard` && "font-bold"
              }  p-2 cursor-pointer`}
              to={"/admin/dashboard"}
            >
              Dashboard
            </Link>
            <h2>{admin?.name}</h2>
            <button
              onClick={handleLogout}
              className="flex gap-2 items-center px-4 py-1 rounded-full text-sm transition-all bg-red-600 hover:bg-red-700 font-medium"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <nav
        className={`${styles.navBottom} ${styles.navBottomPosition} shadow-md`}
      >
        <div
          className={`${styles.container} flex items-center justify-between py-2`}
        >
          <Link to={"/admin/dashboard"}>
            <h2 className="font-2xl font-bold">Learning Portal</h2>
          </Link>
          <div className="md:hidden">
            <FontAwesomeIcon
              onClick={handleNavMenu}
              className="cursor-pointer"
              icon={faBars}
            />
          </div>
        </div>
        <div
          className={`${
            isOpen ? styles.menuItemOpen : styles.menuItemClose
          } shadow-md`}
        >
          <div className={`${styles.container}`}>
            <div className="flex flex-col mt-8">
              <Link
                className={`${
                  location.pathname === `/admin/dashboard` && "font-bold"
                }  p-2 cursor-pointer`}
                to={"/admin/dashboard"}
              >
                Dashboard
              </Link>

              <h2 className="p-2">{admin?.name}</h2>
              <div className="p-2">
                <button
                  className="flex gap-2 border border-cyan items-center px-4 py-1 rounded-full text-sm transition-all hover:bg-cyan "
                  onClick={handleLogout}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  Logout
                </button>
              </div>
            </div>
            <div className="flex justify-end mt-8 pb-4">
              <FontAwesomeIcon
                className="text-2xl cursor-pointer"
                onClick={handleNavMenu}
                icon={faClose}
              />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
