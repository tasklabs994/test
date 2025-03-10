import React from "react";
import "./hello.css";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footer-section">
          <img src="https://blog.bouwplaatsautomatisering.nl/wp-content/uploads/2024/11/BPA-logo-e1733760109678.png" alt="Logo" className="logo" />
          <ul>
            <li>Basistraining</li>
            <li>Vervolgtraining</li>
            <li>Oplossingen</li>
            <li>Support</li>
            <li>Partners</li>
            <li>Contact</li>
            <li>Proefversie aanvragen</li>
            <li>Webshop</li>
            <li>Cookie Policy</li>
            <li>Privacystatement</li>
          </ul>
          <div className="footer-section">
            <h3>Volg BPA</h3>
            <div className="social-icons">
              {/* Social icons removed */}
            </div>
          </div>
          <div className="footer-section">
            <h3>BPA Bouwplaatsautomatisering BV</h3>
            <p>Nieuwstraat 16<br/>7687 BB Daarlerveen</p>
            <p>+31 6 317 55 331</p>
            <p>info@bouwplaatsautomatisering.nl</p>
            <p>KvK nr: 92270085</p>
          </div>
        </div>
      </footer>
      <div className="footer-bottom">
        Alle rechten voorbehouden – Bouwplaatsautomatisering 2024
      </div>
    </>
  );
}
