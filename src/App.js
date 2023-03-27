import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import Assignment from "./pages/dashboard/Assignment";
import Quizzes from "./pages/dashboard/Quizzes";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Quizzes />
    </BrowserRouter>
  );
}

export default App;
