import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import "./ProjectsSection.css";

const ProjectsSection = ({ projects }) => {
  const [selectedTech, setSelectedTech] = useState("all");

  // Collect unique technologies
  const uniqueTechs = Array.from(
    new Set(projects.flatMap((p) => p.techStack))
  );

  // Filter the projects by selected technology
  const filteredProjects =
    selectedTech === "all"
      ? projects
      : projects.filter((proj) => proj.techStack.includes(selectedTech));

  return (
    <section id="projects" className="projects-section fade-in">
      <h2 className="projects-title animate-text-gradient">Projects</h2>

      {/* If no projects at all, show a debugging message */}
      {projects.length === 0 && (
        <p style={{ color: "#ff6666" }}>
          No Projects found. Make sure `projectsData.js` is imported and passed
          in correctly.
        </p>
      )}

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button
          onClick={() => setSelectedTech("all")}
          className={`filter-button ${selectedTech === "all" ? "active" : ""}`}
        >
          All
        </button>
        {uniqueTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setSelectedTech(tech)}
            className={`filter-button ${
              selectedTech === tech ? "active" : ""
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}

        {/* If no project after filtering, show a quick note */}
        {filteredProjects.length === 0 && (
          <p style={{ marginTop: "2rem", color: "#ff6666" }}>
            No projects matched <b>{selectedTech}</b>.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
