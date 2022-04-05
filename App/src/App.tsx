import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

export interface IPresent {
  value: number;
  content: string;
}

export const PresentContext = React.createContext<IPresent[]>([]);

function App() {
  return (
    <Router>
      <Routes>
        <Route path={"login-page"} element={<div>XD</div>} />
        <Route path={"error"} element={<div>X2D</div>} />
      </Routes>
    </Router>
  );
}

export default App;
