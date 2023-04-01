import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import logoImg from "../../assets/images/learningportal.svg";
import { userLogedOut } from "../../features/auth/authSlice";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useSelector((state) => state.videos);

  const dispatch = useDispatch();
  //use loacation
  const location = useLocation();

  //handle logout function
  const handleLogout = () => {
    dispatch(userLogedOut());
    localStorage.removeItem("auth");
    localStorage.removeItem("videoInfo");
  };

  return (
    <nav className="shadow-md">
      <div className="max-w-7xl px-5 lg:px-0 mx-auto flex justify-between py-3">
        <Link to="/">
          <img className="h-10" src={logoImg} alt="logo" />
        </Link>
        <div className="flex items-center gap-3">
          <Link
            to={`/course/${id}`}
            className={`${
              location.pathname === `/course/${id}` && "font-bold"
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
  );
};

export default Navbar;
