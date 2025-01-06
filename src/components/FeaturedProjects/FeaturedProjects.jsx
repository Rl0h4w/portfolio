// src/components/FeaturedProjects/FeaturedProjects.jsx

import React from "react";
import { ChevronDown } from "lucide-react";
import "./FeaturedProjects.css"; // optional

const FeaturedProjects = React.memo(function FeaturedProjects({
  featuredProjects,
  handleNavigation,
}) {
  return (
    <div className="featured-projects mt-12">
      <h2 className="text-xl mb-6 animate-text-gradient">Featured Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredProjects.map((project) => (
          <div key={project.id} className="featured-card">
            <div className="featured-gradient" />
            <div className="relative z-10">
              <h3 className="text-cyan-300 text-lg mb-2">{project.title}</h3>
              <p className="text-gray-300 mb-4">{project.shortDesc}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-800/60 rounded-md text-sm text-emerald-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleNavigation(project.id)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2"
              >
                View Details
                <ChevronDown size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default FeaturedProjects;
