// src/components/Navigation/Navigation.jsx

import React from "react";
import { Filter } from "lucide-react";
import "./Navigation.css"; // optional custom CSS

const Navigation = React.memo(function Navigation({
  isMenuOpen,
  setIsMenuOpen,
  scrollProgress,
  activeSection,
  handleNavigation,
}) {
  return (
    <header
      className="
        fixed top-0 left-0 right-0
        bg-black/80 
        backdrop-blur-sm
        z-50
      "
    >
      {/* Progress Bar at the top */}
      <div className="relative w-full h-1 bg-gray-700/30">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Nav container */}
      <div className="flex items-center justify-between p-4">
        {/* Brand/Logo with a text gradient */}
        <div
          className="
            font-bold text-xl 
            animate-text-gradient
          "
        >
          MyPortfolio
        </div>

        {/* Toggle Button (mobile only) */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden text-cyan-400 p-2 hover:text-cyan-300 transition-colors"
          aria-label="Toggle menu"
        >
          <Filter size={20} />
        </button>

        {/* Nav Links */}
        <nav
          className={`
            ${isMenuOpen ? "block" : "hidden md:flex"} 
            space-x-6
          `}
        >
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
              className={`
                relative px-2 py-1 
                transition-colors duration-300 
                ${
                  activeSection === id
                    ? "text-cyan-400 underline underline-offset-4"
                    : "text-gray-400 hover:text-cyan-400"
                }
              `}
            >
              {label}
            </button>
          ))}

          {/* Hire Me (CTA) */}
          <a
          href="https://t.me/rlohaw"
          target="_blank"
          rel="noopener noreferrer"
          className="
            ml-4
            px-3 py-1 
            rounded-md 
            text-black
            font-semibold
            hover:opacity-90
            transition-opacity
            animate-text-gradient
          "
        >
          Hire Me
        </a>
        </nav>
      </div>
    </header>
  );
});

export default Navigation;
