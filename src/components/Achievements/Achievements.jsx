import React from "react";
import "./Achievements.css";

const Achievements = ({ achievementsData }) => {
  return (
    <section id="achievements" className="achievements-section">
      <h2 className="achievements-heading animate-text-gradient fade-in">
        Achievements
      </h2>
      <div className="card-container fade-in" data-aos="fade-up">
        <h3 className="achievements-subheading">🏆 Key Technical Achievements</h3>
        <ul className="achievements-list">
          {achievementsData.keyTechnical.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
      <div
        className="card-container fade-in"
        data-aos="fade-up"
        style={{ marginTop: "2rem" }}
      >
        <h3 className="achievements-subheading">🎯 Project Impact</h3>
        <ul className="achievements-list">
          {achievementsData.projectImpact.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Achievements;
