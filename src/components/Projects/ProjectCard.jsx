import React, { useState } from "react";
import { ChevronDown, ChevronUp, Github } from "lucide-react";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div
      className="project-card card-container hover-glow"
      data-aos="fade-up"
      data-aos-offset="100"
    >
      <div
        className="project-header"
        onClick={toggleOpen}
        role="button"
        aria-expanded={isOpen}
        aria-controls={`project-content-${project.id}`}
        tabIndex={0}
      >
        <h3 className="text-cyan-300 font-medium">{project.title}</h3>
        {isOpen ? (
          <ChevronUp className="text-cyan-400" />
        ) : (
          <ChevronDown className="text-cyan-400" />
        )}
      </div>
      <p className="project-short-desc">{project.shortDesc}</p>

      <div
        id={`project-content-${project.id}`}
        className={`project-content ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="project-full-desc">{project.fullDesc}</div>

        <div className="project-tech-stack">
          <h4>Tech Stack:</h4>
          <div className="tech-badges">
            {project.techStack.map((tech, idx) => (
              <span key={idx} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="project-achievements">
          <h4>Key Achievements:</h4>
          <ul>
            {project.achievements.map((ach, i) => (
              <li key={i}>{ach}</li>
            ))}
          </ul>
        </div>

        {project.links && project.links.github && (
          <div className="project-links">
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="github-link"
            >
              <Github size={16} />
              View Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
