import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoadFirstVideo from "./components/LoadFirstVideo";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Wrapper from "./components/Wrapper";
import useAuthCheck from "./hooks/useAuthCheck";
import Course from "./pages/Course";
import Leaderboard from "./pages/Leaderboard";
import StudentLogin from "./pages/StudentLogin";
import StudentRegistration from "./pages/StudentRegistration";

function App() {
  const authChecked = useAuthCheck();
  return !authChecked ? (
    <div>Checking authentication.....</div>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute>
              <StudentLogin />
            </PublicRoute>
          }
        />
        <Route path="/intermediate" element={<LoadFirstVideo />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <StudentRegistration />
            </PublicRoute>
          }
        />
        <Route
          path="/course/:videoId"
          element={
            <PrivateRoute>
              <Wrapper>
                <Course />
              </Wrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
