import React from "react";
import Homepage from "./pages/Homepage";
import RegisterServicePage from "./pages/RegisterService";
import ReportsPage from "./pages/ReportsService";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register-service" element={<RegisterServicePage />} />
        <Route path="/reports-service" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
