import React from "react";
import "../styles/Navbar.css";

const Navbar = () => (
  <nav className="navbar">
    <ul className="navbar-ul">
      <li className="navbar-li">
        <a href="/">Home</a>
      </li>
      <li className="navbar-li">
        <a href="/register-user">Cadastrar</a>
      </li>
      <li className="navbar-li">
        <a href="/register-service">Serviços</a>
      </li>
      <li className="navbar-li">
        <a href="/reports-service">Relátorios</a>
      </li>
    </ul>
  </nav>
);

export default Navbar;
