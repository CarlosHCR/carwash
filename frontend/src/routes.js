import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BasePage from "./pages/BasePage";
import RegisterUser from "./pages/RegisterUser";
import RegisterService from "./pages/RegisterService";


export default function AppRouter() {
  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<BasePage />}>
            <Route index element={<Home />} />
            <Route path="/register-user" element={<RegisterUser />} />
            <Route path="/register-service" element={<RegisterService />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}
