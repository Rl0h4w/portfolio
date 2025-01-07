import React from "react";
import { Filter } from "lucide-react";
import "./Navigation.css";

const Navigation = ({
  isMenuOpen,
  setIsMenuOpen,
  scrollProgress,
  activeSection,
  handleNavigation,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50">
      {/* Progress Bar at the top */}
      <div className="relative w-full h-1 bg-gray-700/30">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Nav Container */}
      <div className="nav-container fade-in">
        {/* Brand / Logo */}
        <div className="nav-logo animate-text-gradient">MyPortfolio</div>

        {/* Toggle Button (mobile only) */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-cyan-400 p-2 hover:text-cyan-300 transition-colors"
          aria-label="Toggle menu"
        >
          <Filter size={20} />
        </button>

        {/* Nav Links */}
        <nav className={`nav-links ${isMenuOpen ? "open" : ""}`}>
          {[
            { id: "home", label: "Home" },
            { id: "achievements", label: "Achievements" },
            { id: "skills", label: "Skills" },
            { id: "projects", label: "Projects" },
            { id: "contact", label: "Contact" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => handleNavigation(id)}
              className={`nav-link ${
                activeSection === id ? "active-link" : ""
              }`}
            >
              {label}
            </button>
          ))}

          {/* Hire Me (CTA) */}
          <a
            href="https://t.me/rlohaw"
            target="_blank"
            rel="noopener noreferrer"
            className="hire-button pulse-cta"
          >
            Hire Me
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
