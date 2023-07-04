import React from "react";
import "../styles/Navbar.css";

const Navbar = () => (
  <nav>
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/register-service">Serviços</a>
      </li>
      <li>
        <a href="/reports-service">Relátorios</a>
      </li>
    </ul>
  </nav>
);

export default Navbar;
