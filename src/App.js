import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";

import Quiz from "./pages/Quiz";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Quiz />
    </BrowserRouter>
  );
}

export default App;
