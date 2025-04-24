import React, { useState, useEffect, memo } from 'react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Plus } from 'lucide-react';

const ProjectCard = memo(({ project, expandedId, setExpandedId }) => {
  const isExpanded = expandedId === project.id;


  return (
    <div
      className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-cyan-400/50 transition-all"
      role="article"
      aria-label={project.title}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
        <p className={`text-gray-400 mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
          {isExpanded ? project.fullDesc : project.shortDesc}
        </p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 text-sm rounded-full bg-cyan-400/10 text-cyan-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpandedId(isExpanded ? null : project.id)}
          className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2 transition-colors"
          aria-expanded={isExpanded}
        >
          <Plus
            size={20}
            className={`transform transition-transform ${isExpanded ? 'rotate-45' : ''}`}
          />
          {isExpanded ? 'Show Less' : 'Show More'}
        </button>

        {/* Expanded Content */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content" 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }} 
              className="mt-4 pt-4 border-t border-gray-800"
              style={{ overflow: 'hidden' }}
            >
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">Key Achievements:</h4>
              <ul className="space-y-2 mb-4">
                {project.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-gray-300 flex items-start gap-2">
                    <span className="text-cyan-400 mt-1 shrink-0">•</span> 
                    <span>{achievement}</span> 
                  </li>
                ))}
              </ul>

              {/* Project Links */}
              <div className="flex gap-4">
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    aria-label={`View ${project.title} source code on GitHub`}
                  >
                    <Github size={20} />
                    <span>Source Code</span>
                  </a>
                )}
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    aria-label={`View live demo of ${project.title}`}
                  >
                    <ExternalLink size={20} />
                    <span>Live Demo</span>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}); 

const ProjectsSection = ({ projects }) => {
  const [selectedTech, setSelectedTech] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  const technologies = [...new Set(projects.flatMap(p => p.techStack))];

  const filteredProjects = selectedTech === 'all'
    ? projects
    : projects.filter(p => p.techStack.includes(selectedTech));

  return (
    <section className="py-20 px-4" id="projects">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
            All Projects
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          A collection of my work in machine learning, computer vision, and software development.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="tablist">
          <button
            onClick={() => setSelectedTech('all')}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedTech === 'all'
                ? 'bg-cyan-400 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
            role="tab"
            aria-selected={selectedTech === 'all'}
          >
            All Projects
          </button>
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => setSelectedTech(tech)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedTech === tech
                  ? 'bg-cyan-400 text-black'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
              role="tab"
              aria-selected={selectedTech === tech}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard
                  project={project}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                />
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;