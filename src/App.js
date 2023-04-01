import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoadFirstVideo from "./components/LoadFirstVideo";

import PrivateQuiz from "./components/PrivateQuiz";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Wrapper from "./components/Wrapper";
import PrivateAdminRoute from "./components/adminWrapper/PrivateAdminRoute";
import PublicAdminRoute from "./components/adminWrapper/PublicAdminRoute";
import useAdminAuthCheck from "./hooks/useAdminAuthCheck";
import useAuthCheck from "./hooks/useAuthCheck";
import Course from "./pages/Course";
import Leaderboard from "./pages/Leaderboard";
import Quiz from "./pages/Quiz";
import StudentLogin from "./pages/StudentLogin";
import StudentRegistration from "./pages/StudentRegistration";
import AdminLogin from "./pages/dashboard/AdminLogin";
import Assignment from "./pages/dashboard/Assignment";
import AssignmentMark from "./pages/dashboard/AssignmentMark";
import Dashboard from "./pages/dashboard/Dashboard";
import Quizzes from "./pages/dashboard/Quizzes";
import Videoes from "./pages/dashboard/Videoes";

function App() {
  const authChecked = useAuthCheck();
  const adminAuthCheck = useAdminAuthCheck();
  const { accessToQuizPage } = useSelector((state) => state.quiz);
  return !authChecked || !adminAuthCheck ? (
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
        <Route
          path="/admin"
          element={
            <PublicAdminRoute>
              <AdminLogin />
            </PublicAdminRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicRoute>
              <StudentRegistration />
            </PublicRoute>
          }
        />
        <Route
          path="/intermediate"
          element={
            <PrivateRoute>
              <LoadFirstVideo />
            </PrivateRoute>
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
        {/* <PrivateQuiz
          path={"/quiz/:quizId"}
          component={<Quiz />}
          isAuthenticated={accessToQuizPage}
        /> */}
        <Route
          path="/quiz/:quizId"
          element={
            <PrivateQuiz isAuthenticated={accessToQuizPage}>
              <Quiz />
            </PrivateQuiz>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <PrivateAdminRoute>
              <Dashboard />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/videosList"
          element={
            <PrivateAdminRoute>
              <Videoes />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assigmentsList"
          element={
            <PrivateAdminRoute>
              <Assignment />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/assignmentsMarksList"
          element={
            <PrivateAdminRoute>
              <AssignmentMark />
            </PrivateAdminRoute>
          }
        />
        <Route
          path="/admin/quizzesList"
          element={
            <PrivateAdminRoute>
              <Quizzes />
            </PrivateAdminRoute>
          }
        />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
