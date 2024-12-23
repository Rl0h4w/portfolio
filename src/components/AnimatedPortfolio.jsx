import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github, Filter } from 'lucide-react';

/**
 * AnimatedPortfolio Component
 * A modern, animated portfolio showcasing skills, projects, and achievements
 * Features smooth transitions, responsive design, and interactive elements
 */
const AnimatedPortfolio = () => {
  // State management for UI interactions
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openSkills, setOpenSkills] = useState({});
  const [openProjects, setOpenProjects] = useState({});
  const [selectedTech, setSelectedTech] = useState('all');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Project data structure
  const projects = [
    {
      id: 1,
      title: "Image Denoising and Enhancement",
      shortDesc: "Efficient image processing with constrained resources",
      fullDesc: "Developed models for image denoising, color correction, and super-resolution using deep learning techniques. Optimized hyperparameters with Optuna for enhanced performance under resource constraints.",
      techStack: ["Python", "TensorFlow", "Optuna"],
      featured: true,
      links: {
        github: "https://github.com/rlohaw/project1"
      },
      achievements: [
        "Implemented noise removal and color correction models with minimal latency",
        "Integrated Residual Channel Attention Network (RCAN) for super-resolution tasks",
        "Optimized models to run efficiently on limited computational resources"
      ]
    },
    {
      id: 2,
      title: "Fraud Detection for Vehicle Images (NDA)",
      shortDesc: "Advanced fraud detection with 2.5D car imagery",
      fullDesc: "Developed a model to detect fraud from 2.5D vehicle imagery (photos from four sides of a car). The solution was optimized to run inference on a single-core CPU with 3GB of RAM, meeting stringent resource constraints.",
      techStack: ["Python", "PyTorch", "EfficientFormer"],
      featured: true,
      achievements: [
        "Implemented a unified backbone (EfficientFormer_l1) with separate heads for damage, fraud, and side classification",
        "Introduced a combined binary target for an ALL_GOOD class for better generalization",
        "Applied advanced, class-specific augmentations using imgaug to handle noisy and inconsistent annotations",
        "Optimized for inference on resource-constrained hardware with CosineAnnealingWarmRestarts scheduler and AdamW optimizer"
      ]
    }
  ];

  // Skills data structure
  const skills = {
    "Computer Vision": {
      items: ["Image Denoising", "Color Correction", "Image Super-Resolution", "Object Detection", "Semantic Segmentation"],
      experience: "1 year of intensive research and model development",
      projects: "Designed and trained custom architectures to enhance aerial imaging quality for UAVs, focusing on noise reduction, color consistency, and resolution optimization.",
      level: "Intermediate"
    },
    "Machine Learning": {
      items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM", "CatBoost", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      experience: "1 year of applied experience",
      projects: "Conducted research-driven ML model development, focusing on feature engineering, predictive analytics, and optimization with custom algorithms.",
      level: "Intermediate"
    },
    "Deep Learning": {
      items: ["CNNs", "Transformers", "GANs", "Custom Architectures", "OpenCV", "Keras"],
      experience: "2 years of focused architecture design and experimentation",
      projects: "Created and refined deep learning models for challenging datasets, with an emphasis on custom architecture research and high-performance training.",
      level: "Intermediate"
    },
    "MLOps": {
      items: ["Docker", "Kubernetes", "GitHub Actions"],
      experience: "Limited exposure to deployment workflows",
      projects: "Assisted in deploying ML models using basic containerization and automation tools to streamline production readiness.",
      level: "Beginner"
    }
  };

  /**
   * Handle scroll events and update active section
   * Controls the progress bar and navigation highlighting
   */
  useEffect(() => {
    const handleScroll = () => {
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

      // Check if reached the end of the page
      if (window.innerHeight + window.pageYOffset >= document.documentElement.scrollHeight - 100) {
        currentSection = 'contact';
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /**
   * Smooth scroll to section when clicking navigation items
   * @param {string} sectionId - ID of the target section
   */
  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      setIsMenuOpen(false);
    }
  };

  /**
   * Navigation Component
   * Fixed position navigation with progress bar and responsive menu
   */
  const Navigation = () => (
    <nav className={`
      fixed top-0 right-0 p-4 
      bg-black/40 backdrop-blur-sm 
      z-50 transition-all duration-300 
      ${isMenuOpen ? 'w-64' : 'w-auto'}
      rounded-bl-lg border-l border-b border-white/10
    `}>
      <div className="progress-bar h-1 bg-gray-700/30 fixed top-0 left-0 right-0">
        <div 
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
      {/* Mobile menu toggle */}
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-cyan-400 p-2 hover:text-cyan-300 transition-colors"
        aria-label="Toggle menu"
      >
        <Filter size={20} />
      </button>
      {/* Navigation links */}
      <ul className={`
        nav-list space-y-2 
        ${isMenuOpen ? 'block' : 'hidden md:block'}
        relative z-10
      `}>
        {[
          { id: 'home', label: 'Home' },
          { id: 'achievements', label: 'Achievements' },
          { id: 'skills', label: 'Skills' },
          { id: 'projects', label: 'Projects' },
          { id: 'contact', label: 'Contact' }
        ].map(({ id, label }) => (
          <li 
            key={id}
            onClick={() => handleNavigation(id)}
            className={`
              nav-item cursor-pointer 
              transition-all duration-300 
              hover:bg-white/5 rounded px-2 py-1
              ${activeSection === id 
                ? 'text-cyan-400 translate-x-2 bg-white/10' 
                : 'text-gray-400 hover:text-cyan-400'}
            `}
          >
            → {label}
          </li>
        ))}
        {/* Hire me button */}
        <li className="mt-4">
          <a 
            href="https://t.me/rlohaw"
            target="_blank"
            rel="noopener noreferrer"
            className="hire-button relative group block"
          >
            <div className="button-gradient absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded blur opacity-60 group-hover:opacity-100 transition duration-1000" />
            <div className="button-content relative bg-black/60 backdrop-blur-sm px-6 py-2 rounded">
              HIRE ME
            </div>
          </a>
        </li>
      </ul>
    </nav>
  );

  /**
   * Featured Projects Component
   * Displays highlighted projects in a grid layout
   */
  const FeaturedProjects = () => {
    const featuredProjects = projects.filter(p => p.featured);
    
    return (
      <div className="featured-projects mt-12">
        <h2 className="text-xl text-cyan-400 mb-6">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(project => (
            <div 
              key={project.id}
              className="featured-card border border-white/20 p-6 rounded-lg relative overflow-hidden group bg-black/40 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-500"
            >
              <div className="featured-gradient absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-900/10 to-cyan-900/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-purple-300 text-lg mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.shortDesc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-purple-900/30 rounded-md text-sm text-cyan-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <button 
                  onClick={() => handleNavigation('projects')}
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
  };

  return (
    <div className="portfolio-container min-h-screen bg-black text-white p-8 font-mono relative overflow-hidden">
      {/* Background elements */}
      <div className="background-main absolute inset-0 bg-gradient-to-br from-purple-950/80 via-black to-cyan-950/80" />
      <div className="background-overlay absolute inset-0 bg-black/40" />
      
      {/* Animated background */}
      <div className="background-animated absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="gradient-container absolute w-full h-full">
          <div 
            className="gradient-circle-1 absolute w-96 h-96 bg-purple-900/5 rounded-full blur-3xl"
            style={{
              animation: 'moveGradient1 25s infinite linear',
              transform: 'translate(-50%, -50%)',
              left: '30%',
              top: '30%'
            }}
          />
          <div 
            className="gradient-circle-2 absolute w-96 h-96 bg-cyan-900/5 rounded-full blur-3xl"
            style={{
              animation: 'moveGradient2 30s infinite linear',
              transform: 'translate(-50%, -50%)',
              left: '70%',
              top: '60%'
            }}
          />
          <div 
            className="gradient-circle-3 absolute w-96 h-96 bg-purple-800/5 rounded-full blur-3xl"
            style={{
              animation: 'moveGradient3 28s infinite linear',
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%'
            }}
          />
        </div>
      </div>

      <Navigation />

      {/* Main content */}
      <div className="content-wrapper relative z-10 max-w-6xl mx-auto pt-20">
        {/* Header Section */}
        <div id="home" className="header-section flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div className="header-content mr-8">
            <h1 className="header-title text-4xl font-bold tracking-wider animate-text-gradient mb-4">
              RLOHAW
            </h1>
            <div className="header-subtitle text-gray-300">AND DREADFULLY DISTINCT AGAINST THE DARK,</div>
            <div className="header-subtitle text-gray-300">A TALL WHITE FOUNTAIN PLAYED</div>
          </div>
          
          <div className="profile-info mt-8 md:mt-0">
            <div className="profile-card border border-white/20 p-6 rounded-lg relative overflow-hidden group bg-black/40 backdrop-blur-sm">
              <div className="profile-gradient absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-900/10 to-cyan-900/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="profile-content relative">
                <div className="profile-header text-xl mb-4 text-cyan-400">$ cat profile.txt</div>
                <div className="profile-details space-y-2 text-sm">
                  <p>Name: <span className="text-purple-300">Rostislav Lokhov</span></p>
                  <p>Role: <span className="text-purple-300">DS/MLE</span></p>
                  <p>Location: <span className="text-purple-300">Moscow, Russia</span></p>
                  <p>Status: <span className="animate-status-gradient">Considering offers</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <FeaturedProjects />
{/* Main content sections */}
<div className="main-content space-y-16">
          {/* Achievements Section */}
          <section id="achievements" className="achievements-section">
            <h2 className="text-xl text-cyan-400 mb-6">$ cat achievements.md</h2>
            <div className="achievement-card border border-white/20 p-6 rounded-lg relative overflow-hidden group bg-black/40 backdrop-blur-sm">
              <div className="achievement-gradient absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-900/10 to-cyan-900/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="achievement-content relative space-y-4">
                <div className="achievement-item">
                  <h3 className="text-purple-300 text-lg mb-2">🏆 Key Technical Achievements</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Finalist in the AIDAO International AI Olympiad by Yandex</li>
                    <li>Recipient of the Central University Scholarship</li>
                    <li>Team Leader and Winner of the DataThon 2024</li>
                  </ul>
                </div>
                <div className="achievement-item">
                  <h3 className="text-purple-300 text-lg mb-2">🎯 Project Impact</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Developed and deployed a high-performance fraud detection model</li>
                    <li>Successfully designed a resource-efficient deep learning pipeline</li>
                    <li>Led the creation of a custom image processing architecture</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skills" className="skills-section">
            <h2 className="text-xl text-cyan-400 mb-6">$ ls -la skills/</h2>
            <div className="skills-grid space-y-4">
              {Object.entries(skills).map(([name, skill]) => (
                <div key={name} 
                     className="skill-card border border-white/20 p-4 rounded-lg transition-all duration-500 hover:border-cyan-400/50 bg-black/40 backdrop-blur-sm">
                  <div 
                    className="skill-header flex items-center justify-between cursor-pointer group"
                    onClick={() => setOpenSkills(prev => ({ ...prev, [name]: !prev[name] }))}
                    role="button"
                    aria-expanded={openSkills[name]}
                    tabIndex={0}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 transform group-hover:rotate-90 transition-transform duration-300">❯</span>
                      <h3 className="text-purple-300 font-medium">{name}</h3>
                    </div>
                    {openSkills[name] ? 
                      <ChevronUp className="text-cyan-400 transform transition-transform duration-300 group-hover:-translate-y-1" /> : 
                      <ChevronDown className="text-cyan-400 transform transition-transform duration-300 group-hover:translate-y-1" />
                    }
                  </div>
                  
                  <div className={`
                    skill-content overflow-hidden transition-all duration-500 
                    ${openSkills[name] ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                    relative z-10
                  `}>
                    <div className="space-y-4 p-4 bg-black/20 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item, index) => (
                          <span key={index} className="skill-badge px-2 py-1 bg-purple-900/30 rounded-md text-sm text-cyan-200">
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="skill-details space-y-2 text-sm">
                        <p className="text-gray-300">
                          <span className="text-purple-300">Experience: </span>
                          {skill.experience}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-purple-300">Projects: </span>
                          {skill.projects}
                        </p>
                        <p className="text-gray-300">
                          <span className="text-purple-300">Level: </span>
                          <span className={`
                            ${skill.level === 'Advanced' ? 'text-green-400' : ''}
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
              ))}
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="projects-section">
            <h2 className="text-xl text-cyan-400 mb-6">$ git log --oneline projects/</h2>
            {/* Project filters */}
            <div className="project-filters mb-6">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setSelectedTech('all')}
                  className={`px-3 py-1 rounded-full transition-colors duration-300 
                    ${selectedTech === 'all' ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  All
                </button>
                {Array.from(new Set(projects.flatMap(p => p.techStack))).map(tech => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTech(tech)}
                    className={`px-3 py-1 rounded-full transition-colors duration-300 
                      ${selectedTech === tech ? 'bg-cyan-400 text-black' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                  >
                    {tech}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Projects grid */}
            <div className="projects-grid space-y-4">
              {projects
                .filter(project => selectedTech === 'all' || project.techStack.includes(selectedTech))
                .map(project => (
                  <div key={project.id} 
                       className="project-card border border-white/20 p-4 rounded-lg transition-all duration-300 hover:border-cyan-400/50 bg-black/40 backdrop-blur-sm">
                    <div 
                      className="project-header flex items-center justify-between cursor-pointer group"
                      onClick={() => setOpenProjects(prev => ({ ...prev, [project.id]: !prev[project.id] }))}
                      role="button"
                      aria-expanded={openProjects[project.id]}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 transform group-hover:rotate-90 transition-transform duration-300">❯</span>
                        <h3 className="text-purple-300 font-medium">{project.title}</h3>
                      </div>
                      {openProjects[project.id] ? 
                        <ChevronUp className="text-cyan-400" /> : 
                        <ChevronDown className="text-cyan-400" />
                      }
                    </div>

                    <div className={`
                      project-content overflow-hidden transition-all duration-500 
                      relative z-10
                      ${openProjects[project.id] ? 'max-h-[1000px] opacity-100 mt-4' : 'max-h-0 opacity-0'}
                    `}>
                      <div className="space-y-4 p-4 bg-black/20 rounded-lg">
                        <p className="text-gray-300">{project.fullDesc}</p>
                        
                        <div className="tech-stack space-y-2">
                          <h4 className="text-purple-300">Tech Stack:</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.techStack.map((tech, index) => (
                              <span key={index} className="tech-badge px-2 py-1 bg-purple-900/30 rounded-md text-sm text-cyan-200">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="achievements space-y-2">
                          <h4 className="text-purple-300">Key Achievements:</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-300">
                            {project.achievements.map((achievement, index) => (
                              <li key={index}>{achievement}</li>
                            ))}
                          </ul>
                        </div>

                        {project.links && (
                          <div className="project-links flex gap-4 pt-2">
                            {project.links?.github && (
                              <a 
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link-github flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
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
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.245-1.865-.447-.756-.244-1.356-.374-1.303-.788.026-.204.324-.416.892-.636 3.490-1.528 5.816-2.533 6.978-3.015 3.324-1.385 4.012-1.627 4.466-1.635.099-.002.321.023.465.14.122.102.198.265.21.466.012.2-.031.469-.043.553z"/>
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
                  <div className="link-gradient absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
                  <span className="relative flex items-center gap-1 px-3 py-1 bg-black/40 rounded-full">
                    {icon}
                    {name}
                  </span>
                </a>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* Global styles and animations */}
      <style jsx>{`
        /* Background animations */
        @keyframes moveGradient1 {
          0%, 100% { transform: translate(-50%, -50%) translate(100px, 100px) rotate(0deg); }
          25% { transform: translate(-50%, -50%) translate(-100px, 100px) rotate(90deg); }
          50% { transform: translate(-50%, -50%) translate(-100px, -100px) rotate(180deg); }
          75% { transform: translate(-50%, -50%) translate(100px, -100px) rotate(270deg); }
        }
        
        @keyframes moveGradient2 {
          0%, 100% { transform: translate(-50%, -50%) translate(-120px, -120px) rotate(0deg); }
          25% { transform: translate(-50%, -50%) translate(120px, -120px) rotate(90deg); }
          50% { transform: translate(-50%, -50%) translate(120px, 120px) rotate(180deg); }
          75% { transform: translate(-50%, -50%) translate(-120px, 120px) rotate(270deg); }
        }
        
        @keyframes moveGradient3 {
          0%, 100% { transform: translate(-50%, -50%) translate(0, 150px) rotate(0deg); }
          25% { transform: translate(-50%, -50%) translate(-150px, 0) rotate(90deg); }
          50% { transform: translate(-50%, -50%) translate(0, -150px) rotate(180deg); }
          75% { transform: translate(-50%, -50%) translate(150px, 0) rotate(270deg); }
        }

        /* Text gradient animations */
        @keyframes textGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-text-gradient {
          background: linear-gradient(
            to right,
            #60daff 20%,
            #ffffff 30%,
            #a78bfa 70%,
            #60daff 80%
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGradient 3s linear infinite;
        }

        .animate-status-gradient {
          background: linear-gradient(
            to right,
            #4ade80 20%,
            #60daff 50%,
            #4ade80 80%
          );
          background-size: 200% auto;
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: textGradient 2s linear infinite;
        }

        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .header-section {
            flex-direction: column;
            gap: 2rem;
          }

          .profile-info {
            width: 100%;
          }

          .social-links {
            flex-direction: column;
            align-items: flex-start;
          }
        }

        /* Enhanced hover effects */
        .project-card:hover,
        .skill-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .social-link:hover {
          transform: scale(1.05);
        }

        /* Smooth transitions */
        .project-card,
        .skill-card,
        .social-link {
          transition: all 0.3s ease-in-out;
        }

        /* Keyboard focus styles */
        .nav-item:focus-visible,
        .project-header:focus-visible,
        .skill-header:focus-visible,
        .social-link:focus-visible {
          outline: 2px solid #60daff;
          outline-offset: 2px;
          border-radius: 4px;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(96, 218, 255, 0.3);
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(96, 218, 255, 0.5);
        }

        /* Text content styles */
        .text-gray-300 {
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
        }

        .text-purple-300 {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.7);
        }

        /* Content backgrounds */
        .project-card .project-content,
        .skill-card .skill-content {
          position: relative;
          isolation: isolate;
        }

        /* Improved card backgrounds */
        .project-card,
        .skill-card {
          backdrop-filter: blur(8px);
          position: relative;
          isolation: isolate;
        }

        /* Gradient overlays */
        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom right,
            rgba(139, 92, 246, 0.1),
            rgba(6, 182, 212, 0.1)
          );
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .project-card:hover .gradient-overlay,
        .skill-card:hover .gradient-overlay {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default AnimatedPortfolio;

