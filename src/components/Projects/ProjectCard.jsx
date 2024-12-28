// src/components/Projects/ProjectCard.jsx
import React from 'react';
import { ChevronDown, ChevronUp, Github } from 'lucide-react';
import './ProjectCard.css'; // Import component-specific CSS

const ProjectCard = ({ project, isOpen, toggleOpen }) => {
  return (
    <div className="project-card">
      <div 
        className="project-header"
        onClick={toggleOpen}
        role="button"
        aria-expanded={isOpen}
        tabIndex={0}
      >
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 transform group-hover:rotate-90 transition-transform duration-300">❯</span>
          <h3 className="text-cyan-300 font-medium">{project.title}</h3>
        </div>
        {isOpen ? 
          <ChevronUp className="text-cyan-400" /> : 
          <ChevronDown className="text-cyan-400" />
        }
      </div>

      <div className={`project-content ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="space-y-4 p-4 rounded-lg">
          <p className="text-gray-300">{project.fullDesc}</p>
          
          <div className="tech-stack space-y-2">
            <h4 className="text-cyan-300">Tech Stack:</h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span key={index} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="achievements space-y-2">
            <h4 className="text-cyan-300">Key Achievements:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {project.achievements.map((achievement, idx) => (
                <li key={idx}>{achievement}</li>
              ))}
            </ul>
          </div>

          {project.links && (
            <div className="project-links flex gap-4 pt-2">
              {project.links.github && (
                <a 
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-github"
                >
                  <Github size={16} />
                  View Code
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
