import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar/Navbar.jsx"; // Assuming Navbar is inside the components folder
import Footer from "./Footer/Footer.jsx"; // Assuming Footer is inside the components folder
import "./Home.css"; 

import HeroSection from "./Hero/HeroSection.jsx";



const HomePage = () => {
  return (
    <div className="home-container">
      {/* Include Navbar */}
      <Navbar />
      
     {/* // Hero Section */}
       {/* <section className="hero">
        <div className="hero-content">
          <h1>Welcome to MyApp</h1>
          <p>Your reliable platform for seamless doctor consultations and health management.</p> */}
          {/* <div className="cta-buttons">
            <Link to="/signup" className="cta-button">Get Started</Link>
            <Link to="/login" className="cta-button">Log In</Link>
          </div> */}
        {/* </div>
      </section>  */}

      <HeroSection />

      {/* Features Section */}
      <section className="features">
        <h2>Our Key Features</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Consult Doctors</h3>
            <p>Consult with experienced doctors remotely from the comfort of your home.</p>
          </div>
          <div className="feature-card">
            <h3>Manage Health</h3>
            <p>Track your health progress and manage medical records efficiently.</p>
          </div>
          <div className="feature-card">
            <h3>Appointment Booking</h3>
            <p>Book appointments with your preferred doctors easily through the app.</p>
          </div>
        </div>
      </section>

      {/* Include Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
