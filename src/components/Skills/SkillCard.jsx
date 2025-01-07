import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./SkillCard.css";

const SkillCard = ({ name, skill }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div className="skill-card card-container" data-aos="fade-up">
      <div
        className="skill-header"
        onClick={toggleOpen}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`skill-content-${name}`}
        tabIndex={0}
      >
        <h3 className="text-cyan-300 font-medium">{name}</h3>
        {isOpen ? (
          <ChevronUp className="text-cyan-400" />
        ) : (
          <ChevronDown className="text-cyan-400" />
        )}
      </div>
      <div
        id={`skill-content-${name}`}
        className={`skill-content ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="skill-body">
          <div className="skill-badges">
            {skill.items.map((item, idx) => (
              <span key={idx} className="skill-badge">
                {item}
              </span>
            ))}
          </div>
          <p className="skill-meta">
            <span>Experience:</span> {skill.experience}
          </p>
          <p className="skill-meta">
            <span>Projects:</span> {skill.projects}
          </p>
          <p className="skill-meta">
            <span>Level:</span>{" "}
            <span
              className={
                skill.level === "Advanced"
                  ? "text-emerald-400"
                  : skill.level === "Intermediate"
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            >
              {skill.level}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
