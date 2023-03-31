import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LoadFirstVideo from "./components/LoadFirstVideo";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Wrapper from "./components/Wrapper";
import useAuthCheck from "./hooks/useAuthCheck";
import Course from "./pages/Course";
import Leaderboard from "./pages/Leaderboard";
import Quiz from "./pages/Quiz";
import StudentLogin from "./pages/StudentLogin";
import StudentRegistration from "./pages/StudentRegistration";
import PrivateQuiz from "./components/PrivateQuiz";

function App() {
  const authChecked = useAuthCheck();
  const { accessToQuizPage } = useSelector((state) => state.quiz);
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
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
