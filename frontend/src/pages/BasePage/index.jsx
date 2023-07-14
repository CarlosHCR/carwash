import { Outlet } from "react-router-dom";
import Navbar from "../../components/NavBar";

const BasePage = () => {
  return (
    <>
      <div>
        <Navbar />

        <Outlet />
      </div>
    </>
  );
};

export default BasePage;
