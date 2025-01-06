// src/components/Navigation/Navigation.jsx
import React from "react";
import { Filter } from "lucide-react";
import "./Navigation.css"; // unchanged

const Navigation = React.memo(function Navigation({
  isMenuOpen,
  setIsMenuOpen,
  scrollProgress,
  activeSection,
  handleNavigation,
}) {
  return (
    <nav
      className={`
      fixed top-0 right-0 p-4 
      z-50 transition-all duration-300 
      ${isMenuOpen ? "w-64" : "w-auto"}
      rounded-bl-lg border-l border-b border-white/10
    `}
    >
      {/* Progress Bar */}
      <div className="progress-bar h-1 bg-gray-700/30 fixed top-0 left-0 right-0">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Toggle Button for Mobile */}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="md:hidden text-cyan-400 p-2 hover:text-cyan-300 transition-colors"
        aria-label="Toggle menu"
      >
        <Filter size={20} />
      </button>

      {/* Navigation Links */}
      <ul
        className={`
        nav-list space-y-2 
        ${isMenuOpen ? "block" : "hidden md:block"}
        relative z-10
      `}
      >
        {[
          { id: "home", label: "Home" },
          { id: "achievements", label: "Achievements" },
          { id: "skills", label: "Skills" },
          { id: "projects", label: "Projects" },
          { id: "contact", label: "Contact" },
        ].map(({ id, label }) => {
          // Example scaling from 1.0 at top to 1.2 at bottom
          const maxScale = 1.2;
          let itemScale = 1 + (scrollProgress / 100) * 0.2; // up to +0.2
          if (itemScale > maxScale) {
            itemScale = maxScale;
          }

          return (
            <li
              key={id}
              onClick={() => handleNavigation(id)}
              style={{
                transform: `scale(${itemScale})`,
                transformOrigin: "left center", // so it expands from the left side
                transition: "transform 0.2s ease",
              }}
              className={`
                nav-item cursor-pointer 
                transition-all duration-300 
                hover:bg-white/5 rounded px-2 py-1
                ${
                  activeSection === id
                    ? "text-cyan-400 translate-x-2 bg-white/10"
                    : "text-gray-400 hover:text-cyan-400"
                }
              `}
            >
              → {label}
            </li>
          );
        })}

        {/* "Hire Me" Button */}
        <li className="mt-4">
          <a
            href="https://t.me/rlohaw"
            target="_blank"
            rel="noopener noreferrer"
            className="hire-button relative group"
          >
            <div className="button-gradient" />
            <div className="button-content hire-button-animations">
              HIRE ME
            </div>
          </a>
        </li>
      </ul>
    </nav>
  );
});

export default Navigation;
