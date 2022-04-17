import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppLogic from "./AppLogic";
import MainPage from "./pages/MainPage/MainPage";

function App() {
  const { checkIfRouteIsAuthenticated } = AppLogic();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path={"login-page"} element={<div>XD</div>} />
        <Route path={"error"} element={<div>X2D</div>} />
        <Route
          path={"administration"}
          element={checkIfRouteIsAuthenticated(<div>Administration</div>)}
        />
      </Routes>
    </Router>
  );
}

export default App;
