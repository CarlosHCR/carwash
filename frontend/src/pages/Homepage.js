import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Homepage.css";
import "../styles/styles.css";

function HomePage() {
  return (
    <div className="homePage">
      <Navbar />
      <div className="content">
        <h1 className="title">Estética e Lavação Automotiva</h1>
        <p>Bem-vindo à estética e lavação automotiva Calico!</p>
      </div>
    </div>
  );
}

export default HomePage;
