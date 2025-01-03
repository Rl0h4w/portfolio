// src/components/Skills/SkillCard.jsx
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './SkillCard.css'; // Import component-specific CSS

const SkillCard = ({ name, skill, isOpen, toggleOpen }) => {
  return (
    <div className="skill-card">
      <div 
        className="skill-header"
        onClick={toggleOpen}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 transform group-hover:rotate-90 transition-transform duration-300">❯</span>
          <h3 className="text-cyan-300 font-medium">{name}</h3>
        </div>
        {isOpen ? 
          <ChevronUp className="text-cyan-400 transform transition-transform duration-300 group-hover:-translate-y-1" /> : 
          <ChevronDown className="text-cyan-400 transform transition-transform duration-300 group-hover:translate-y-1" />
        }
      </div>
      
      <div className={`skill-content ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-4 p-4 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {skill.items.map((item, index) => (
              <span key={index} className="skill-badge">
                {item}
              </span>
            ))}
          </div>
          <div className="skill-details space-y-2 text-sm">
            <p className="text-gray-300">
              <span className="text-cyan-300">Experience: </span>
              {skill.experience}
            </p>
            <p className="text-gray-300">
              <span className="text-cyan-300">Projects: </span>
              {skill.projects}
            </p>
            <p className="text-gray-300">
              <span className="text-cyan-300">Level: </span>
              <span className={`
                ${skill.level === 'Advanced' ? 'text-emerald-400' : ''}
                ${skill.level === 'Intermediate' ? 'text-yellow-400' : ''}
                ${skill.level === 'Beginner' ? 'text-red-400' : ''}
              `}>
                {skill.level}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillCard;
