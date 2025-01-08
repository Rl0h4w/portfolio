import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import "./SkillCard.css";

const SkillCard = ({ name, skill, icon: IconComponent }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  // Function to determine progress color based on level
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'advanced': return 'bg-emerald-400';
      case 'intermediate': return 'bg-cyan-400';
      case 'beginner': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="skill-card" data-aos="fade-up">
      <div
        className="skill-header"
        onClick={toggleOpen}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`skill-content-${name}`}
        tabIndex={0}
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-cyan-400/10 text-cyan-400">
            <IconComponent size={24} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">{name}</h3>
            <p className="text-sm text-gray-400">{skill.experience}</p>
          </div>
        </div>
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
          <div className="space-y-4">
            {/* Progress bar for skill level */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Proficiency</span>
                <span className="text-cyan-400">{skill.level}</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full">
                <div
                  className={`h-full rounded-full ${getLevelColor(skill.level)} transition-all duration-500`}
                  style={{
                    width: skill.level === 'Advanced' ? '90%' :
                          skill.level === 'Intermediate' ? '60%' : '30%'
                  }}
                />
              </div>
            </div>

            {/* Project highlight */}
            <p className="text-sm text-gray-400 mt-4 line-clamp-2">
              {skill.projects}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;