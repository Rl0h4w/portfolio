// src/components/Achievements/Achievements.jsx

import React from "react";
import "./Achievements.css"; // optional

const Achievements = ({ achievementsData }) => {
  return (
    <section id="achievements" className="achievements-section">
      <h2 className="text-xl mb-6 animate-text-gradient">Achievements</h2>
      <div className="achievement-card">
        <div className="achievement-content">
          <div className="achievement-item">
            <h3 className="text-cyan-300 text-lg mb-2">
              🏆 Key Technical Achievements
            </h3>
            <ul>
              {achievementsData.keyTechnical.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="achievement-item">
            <h3 className="text-cyan-300 text-lg mb-2">
              🎯 Project Impact
            </h3>
            <ul>
              {achievementsData.projectImpact.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
