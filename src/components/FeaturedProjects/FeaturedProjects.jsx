// FeaturedProjects.jsx
import React from "react";
import { ChevronDown } from "lucide-react";
import "./FeaturedProjects.css";

const FeaturedProjects = ({ featuredProjects, onViewDetails }) => {
  return (
    <section className="featured-section fade-in">
      <h2 className="featured-title animate-text-gradient">Featured Projects</h2>
      <div className="featured-grid">
        {featuredProjects.map((project) => (
          <div key={project.id} className="featured-card card-container hover-glow">
            <h3 className="featured-card-title">{project.title}</h3>
            <p className="featured-card-desc">{project.shortDesc}</p>
            <div className="featured-tech-stack">
              {project.techStack.map((tech, idx) => (
                <span key={idx} className="tech-badge">
                  {tech}
                </span>
              ))}
            </div>
            <button
              className="featured-details-button"
              onClick={() => onViewDetails(project.id)}
            >
              View Details
              <ChevronDown size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;
