import { faBars, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";
import { userLogedOut } from "../../features/auth/authSlice";
import styles from "./Navbar.module.css";
const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.videos);
  const { videoId } = useParams();

  const dispatch = useDispatch();
  //use loacation
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  //handle logout function
  const handleLogout = () => {
    dispatch(userLogedOut());
    localStorage.removeItem("auth");
    localStorage.removeItem("videoInfo");
  };

  //handle nav menu

  const handleNavMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`${styles.navTop} shadow-md`}>
        <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between items-center py-3">
          <Link to={id ? `/course/${id}` : `/`}>
            <h2 className="text-xl font-bold">Learning Portal</h2>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={id ? `/course/${id}` : `/`}
              className={`${
                location.pathname === `/course/${videoId}` && "font-bold"
              } cursor-pointer`}
            >
              Course
            </Link>
            <Link
              to={"/leaderboard"}
              className={`${
                location.pathname === "/leaderboard" && "font-bold"
              } cursor-pointer`}
            >
              Leaderboard
            </Link>
            <h2 className="">{user?.name}</h2>
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
      </nav>
      <nav
        className={`${styles.navBottom} ${styles.navBottomPosition} shadow-md`}
      >
        <div
          className={`${styles.container} flex items-center justify-between py-2`}
        >
          <Link to={id ? `/course/${id}` : `/`}>
            <h2 className="text-xl font-bold">Learning Portal</h2>
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
                to={id ? `/course/${id}` : `/`}
                onClick={handleNavMenu}
                className={`${
                  location.pathname === `/course/${videoId}` && "font-bold"
                }  p-2 cursor-pointer`}
              >
                Course
              </Link>
              <Link
                to={"/leaderboard"}
                onClick={handleNavMenu}
                className={`${
                  location.pathname === "/leaderboard" && "font-bold"
                } p-2 cursor-pointer`}
              >
                Leaderboard
              </Link>
              <h2 className="p-2">{user?.name}</h2>
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

export default Navbar;
