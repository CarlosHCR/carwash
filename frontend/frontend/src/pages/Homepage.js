import React from 'react';
import Navbar from '../components/Navbar';
import "../styles/Homepage.css"
import "../styles/styles.css"

function Homepage() {
  return (
    <div className="homePage">
      <Navbar />
      <div className="content">
        <h1 className="title">Estética e Lavação Automotiva</h1>
        <p>Bem-vindo à página inicial!</p>
      </div>
    </div>
  );
}

export default Homepage;
