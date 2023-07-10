import React from "react";
import { NavDropdown } from "react-bootstrap";
import "../styles/Navbar.css";

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
        <a className="nav-link" href="/">
          Home
        </a>
      </li>
      <NavDropdown title="Usuário" id="nav-dropdown">
        <NavDropdown.Item href="/register-user">
          Registrar Usuário
        </NavDropdown.Item>
        <NavDropdown.Item href="/login">Login</NavDropdown.Item>
      </NavDropdown>
      <li className="nav-item">
        <a className="nav-link" href="/register-service">
          Serviços
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/reports-service">
          Relatórios
        </a>
      </li>
    </ul>
  </nav>
);

export default Navbar;
