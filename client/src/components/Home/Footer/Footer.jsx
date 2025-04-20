import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Add this wrapper */}
        <div className="footer-row">
          <div className="footer-column footer-logo">
            <h2>HealthCare+</h2>
            <p>Your trusted partner in online doctor consultations.</p>
          </div>

          <div className="footer-column footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">Doctors</a></li>
              <li><a href="#">Appointments</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-column footer-contact">
            <h4>Contact Us</h4>
            <p>Email: support@healthcareplus.com</p>
            <p>Phone: +91 98765 43210</p>
            <p>Location: Kolkata, India</p>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} HealthCare+. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
