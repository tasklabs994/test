import React from "react";
import "./hello.css";

export default function Header() {
  return (
    <header>
      <div className="header-container">
        <img className="logo" src="https://blog.bouwplaatsautomatisering.nl/wp-content/uploads/2024/11/BPA-logo-e1733760109678.png" alt="Logo" />
        <nav>
          <a href="/">Home</a>
          <a href="#">Oplossingen</a>
          <a href="#">Support</a>
          <a href="#">Contact</a>
          <a href="#">Webshop</a>
        </nav>
        <button className="cta-button">Proefversie Aanvragen</button>
      </div>
    </header>
  );
}
