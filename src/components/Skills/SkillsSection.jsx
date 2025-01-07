import React from "react";
import SkillCard from "./SkillCard";
import "./SkillsSection.css";

const SkillsSection = ({ skills }) => {
  return (
    <section id="skills" className="skills-section fade-in">
      <h2 className="skills-heading animate-text-gradient">Skills</h2>

      {/*
        Check if the skills object has any keys. 
        If it’s truly empty, you can show “No skills available” for debugging.
      */}
      {Object.keys(skills).length === 0 ? (
        <p style={{ color: "#ff6666", marginTop: "2rem" }}>
          No Skills data found. Please ensure “skillsData.js” is imported
          correctly!
        </p>
      ) : (
        <div className="skills-grid">
          {Object.entries(skills).map(([skillName, skillData]) => (
            <SkillCard key={skillName} name={skillName} skill={skillData} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SkillsSection;
