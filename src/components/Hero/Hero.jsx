// Hero.jsx
import React from "react";
import "./Hero.css";

const Hero = ({ handleNavigation }) => {
  return (
    <section id="home" className="hero-section fade-in">
      <div className="hero-wrapper">
        <img
          src="./profile.jpg"
          alt="Profile"
          className="hero-profile-pic"
        />
        <div className="hero-text-content">
          <h1 className="hero-title animate-text-gradient">
            Hi, I'm Rostislav Lokhov
          </h1>
          <p className="hero-subtitle">
            Data Scientist &amp; Computer Vision Enthusiast
          </p>
          <p className="hero-description">
            Specializing in deep learning for image processing &amp; fraud 
            detection. Scroll down to see my achievements, skills, and projects!
          </p>
          <button
            className="hero-cta-button pulse-cta"
            onClick={() => handleNavigation("achievements")}
          >
            See My Achievements
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
