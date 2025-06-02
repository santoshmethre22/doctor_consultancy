import React from "react";
 // ✅ Correct import
import "./HeroSection.css"; // CSS file for styling

const HeroSection = () => {
 // ✅ Correct function usage
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Consult Top Doctors Anytime, Anywhere</h1>
        <p>
          Book appointments, get prescriptions, and connect with trusted
          healthcare professionals online.
        </p>
       
      </div>
      <div className="hero-image">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3209/3209780.png"
          alt="Doctor Illustration"
        />
      </div>
    </section>
  );
};

export default HeroSection;
