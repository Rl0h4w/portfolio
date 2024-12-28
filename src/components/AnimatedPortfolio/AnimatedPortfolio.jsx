// src/components/AnimatedPortfolio/AnimatedPortfolio.jsx
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Github } from 'lucide-react';
import Navigation from '../Navigation/Navigation';
import FeaturedProjects from '../FeaturedProjects/FeaturedProjects';
import ProjectCard from '../Projects/ProjectCard';
import SkillCard from '../Skills/SkillCard';
import Achievements from '../Achievements/Achievements';
import StarburstEffect from '../StarburstEffect/StarburstEffect';
import { projects } from '../../data/projectsData';
import { skills } from '../../data/skillsData';
import { achievementsData } from '../../data/achievementsData'; // Corrected import
import './AnimatedPortfolio.css';

/**
 * Main AnimatedPortfolio Component
 */
const AnimatedPortfolio = () => {
  // States for UI control
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openSkills, setOpenSkills] = useState({});
  const [openProjects, setOpenProjects] = useState({});
  const [selectedTech, setSelectedTech] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Memoized data for optimization
  const featuredProjects = useMemo(() => {
    return projects.filter(p => p.featured);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return selectedTech === 'all'
      ? projects
      : projects.filter((project) => project.techStack.includes(selectedTech));
  }, [selectedTech, projects]);

  /**
   * Scroll Handler with requestAnimationFrame optimization
   */
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate scroll progress
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
          const currentProgress = (window.pageYOffset / totalScroll) * 100;
          setScrollProgress(currentProgress);

          // Update active section based on scroll position
          const sections = ['home', 'achievements', 'skills', 'projects', 'contact'];
          let currentSection = sections[0];
          
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const rect = element.getBoundingClientRect();
              const offset = 150;
              if (rect.top <= offset && rect.bottom >= offset) {
                currentSection = section;
                break;
              }
            }
          }

          // Check if user is near the bottom of the page
          if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 100) {
            currentSection = 'contact';
          }

          setActiveSection(currentSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Navigation Handler
   */
  const handleNavigation = useCallback((sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false); // Close menu after navigation
    }
  }, []);

  /**
   * Project Filter Handler
   */
  const handleTechFilter = useCallback((tech) => {
    setSelectedTech(tech);
  }, []);

  /**
   * Main Render
   */
  return (
    <div className="portfolio-container">
      
      {/* Animated Background with low z-index */}
      <StarburstEffect />

      {/* Navigation with high z-index */}
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        handleNavigation={handleNavigation}
      />

      {/* Main Content with higher z-index */}
      <div className="content-wrapper">
        {/* Header Section */}
        <div id="home" className="header-section">
          <div className="header-content">
            {/* Animated Gradient Text */}
            <h1 className="header-title text-4xl font-bold tracking-wider animate-text-gradient mb-4">
              RLOHAW
            </h1>
            <div className="header-subtitle text-gray-300">AND DREADFULLY DISTINCT AGAINST THE DARK,</div>
            <div className="header-subtitle text-gray-300">A TALL WHITE FOUNTAIN PLAYED</div>
          </div>
          
          <div className="profile-info mt-8 md:mt-0">
            <div className="profile-card">
              {/* Profile Content */}
              <div className="profile-content">
                <div className="profile-header">$ cat profile.txt</div>
                <div className="profile-details">
                  <p>Name: <span className="text-cyan-300">Rostislav Lokhov</span></p>
                  <p>Role: <span className="text-cyan-300">DS/MLE</span></p>
                  <p>Location: <span className="text-cyan-300">Moscow, Russia</span></p>
                  {/* Animated Gradient Status */}
                  <p>Status: <span className="animate-status-gradient">Considering offers</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Projects Section */}
        <FeaturedProjects 
          featuredProjects={featuredProjects}
          handleNavigation={handleNavigation}
        />

        {/* Main Content Sections */}
        <div className="main-content space-y-16">
          {/* Achievements Section */}
          <Achievements achievementsData={achievementsData} />

          {/* Skills Section */}
          <section id="skills" className="skills-section">
            <h2 className="text-xl mb-6 animate-text-gradient">
              Skills
            </h2>
            <div className="skills-grid space-y-4">
              {Object.entries(skills).map(([name, skill]) => (
                <SkillCard 
                  key={name}
                  name={name}
                  skill={skill}
                  isOpen={openSkills[name]}
                  toggleOpen={() => setOpenSkills(prev => ({ ...prev, [name]: !prev[name] }))}
                />
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="projects-section">
            <h2 className="text-xl mb-6 animate-text-gradient">
              Projects
            </h2>
            {/* Project Filters */}
            <div className="project-filters mb-6">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => handleTechFilter('all')}
                  className={`px-3 py-1 rounded-full transition-colors duration-300 
                    ${selectedTech === 'all' ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  All
                </button>
                {Array.from(new Set(projects.flatMap(p => p.techStack))).map(tech => (
                  <button
                    key={tech}
                    onClick={() => handleTechFilter(tech)}
                    className={`px-3 py-1 rounded-full transition-colors duration-300 
                      ${selectedTech === tech ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Projects Grid */}
            <div className="projects-grid space-y-4">
              {filteredProjects.map(project => (
                <ProjectCard 
                  key={project.id}
                  project={project}
                  isOpen={openProjects[project.id]}
                  toggleOpen={() => setOpenProjects(prev => ({ ...prev, [project.id]: !prev[project.id] }))}
                />
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="footer mt-12 border-t border-white/20 pt-4">
            <div className="social-links flex items-center flex-wrap gap-4">
              <span className="text-cyan-400">❯ Find me on:</span>
              {[
                { 
                  name: 'GitHub', 
                  icon: <Github size={16} className="text-cyan-400" />, 
                  url: 'https://github.com/rlohaw' 
                },
                { 
                  name: 'Telegram', 
                  icon: (
                    <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.245-1.865-.447-.756-.244-1.356-.374-1.303-.788.026-.204.324-.416.892-.636 3.490-1.528 5.816-2.533 6.978-3.015 3.324-1.385 4.012-1.627 4.466-1.635.099-.002.321.023.465.140.122.102.198.265.21.466.012.2-.031.469-.043.553z"/>
                    </svg>
                  ), 
                  url: 'https://t.me/rlohaw' 
                },
                { 
                  name: 'LinkedIn', 
                  icon: (
                    <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                  url: 'https://www.linkedin.com/in/rostislav-lokhov/' 
                }
              ].map(({ name, icon, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link relative group"
                >
                  <span className="relative flex items-center gap-1 px-3 py-1 rounded-full">
                    {icon}
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPortfolio;
