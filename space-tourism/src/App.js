import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Destination from "./pages/Destination";
import Crew from "./pages/Crew";
import Technology from "./pages/Technology";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/destination" element={<Destination />} />
        <Route path="/crew" element={<Crew />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/*" element={<Home />} />
      </Routes>
    </Router>
  );
}
export default App;
