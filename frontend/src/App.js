import React from "react";
import HomePage from "./pages/Homepage";
import UserForm from "./pages/RegisterUser";
import RegisterServicePage from "./pages/RegisterService";
import ReportsService from "./pages/ReportsService";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register-service" element={<RegisterServicePage />} />
        <Route path="/reports-service" element={<ReportsService />} />
        <Route path="/register-user" element={<UserForm />} />
      </Routes>
    </Router>
  );
}

export default App;
