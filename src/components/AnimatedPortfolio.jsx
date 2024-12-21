import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';

const AnimatedPortfolio = () => {
  const [openSkills, setOpenSkills] = useState({});
  const [openProjects, setOpenProjects] = useState({});

  const projects = [
    {
      id: 1,
      title: "Image Denoising and Enhancement",
      shortDesc: "Efficient image processing with constrained resources",
      fullDesc: "Developed models for image denoising, color correction, and super-resolution using deep learning techniques. Optimized hyperparameters with Optuna for enhanced performance under resource constraints.",
      techStack: ["Python", "TensorFlow", "Optuna"],
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
      achievements: [
        "Implemented a unified backbone (EfficientFormer_l1) with separate heads for damage, fraud, and side classification",
        "Introduced a combined binary target for an ALL_GOOD class for better generalization",
        "Applied advanced, class-specific augmentations using imgaug to handle noisy and inconsistent annotations",
        "Optimized for inference on resource-constrained hardware with CosineAnnealingWarmRestarts scheduler and AdamW optimizer"
      ]
    }
  ];

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

  const handleNavigation = (sectionId) => {
    if (sectionId === 'projects') {
      const allProjectsOpen = projects.reduce((acc, project) => {
        acc[project.id] = true;
        return acc;
      }, {});
      setOpenProjects(allProjectsOpen);
    } else if (sectionId === 'skills') {
      const allSkillsOpen = Object.keys(skills).reduce((acc, skill) => {
        acc[skill] = true;
        return acc;
      }, {});
      setOpenSkills(allSkillsOpen);
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const toggleSkill = (skillName) => {
    setOpenSkills(prev => ({
      ...prev,
      [skillName]: !prev[skillName]
    }));
  };

  const toggleProject = (projectId) => {
    setOpenProjects(prev => ({
      ...prev,
      [projectId]: !prev[projectId]
    }));
  };

  const ProjectCard = ({ project }) => {
    const isOpen = openProjects[project.id];

    return (
      <div className="project-card border border-white/20 p-4 rounded-lg transition-all duration-300 hover:border-cyan-400/50 bg-black/40 backdrop-blur-sm">
        <div 
          className="project-header flex items-center justify-between cursor-pointer"
          onClick={() => toggleProject(project.id)}
        >
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">❯</span>
            <h3 className="text-purple-300 font-medium">{project.title}</h3>
          </div>
          {isOpen ? <ChevronUp className="text-cyan-400" /> : <ChevronDown className="text-cyan-400" />}
        </div>

        {isOpen && (
          <div className="project-content mt-4 space-y-4">
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
        )}
      </div>
    );
  };

  const SkillCard = ({ name, skill }) => {
    const isOpen = openSkills[name];

    return (
      <div className="skill-card border border-white/20 p-4 rounded-lg transition-all duration-300 hover:border-cyan-400/50 bg-black/40 backdrop-blur-sm">
        <div 
          className="skill-header flex items-center justify-between cursor-pointer"
          onClick={() => toggleSkill(name)}
        >
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">❯</span>
            <h3 className="text-purple-300 font-medium">{name}</h3>
          </div>
          {isOpen ? <ChevronUp className="text-cyan-400" /> : <ChevronDown className="text-cyan-400" />}
        </div>

        {isOpen && (
          <div className="skill-content mt-4 space-y-4">
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
        )}
      </div>
    );
  };

  return (
    <div className="portfolio-container min-h-screen bg-black text-white p-8 font-mono relative overflow-hidden">
      {/* Background gradients */}
      <div className="background-main absolute inset-0 bg-gradient-to-br from-purple-950/80 via-black to-cyan-950/80" />
      <div className="background-overlay absolute inset-0 bg-black/40" />
      
      {/* Animated background elements */}
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
      
      <style jsx>{`
        @keyframes moveGradient1 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(100px, 100px) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translate(-100px, 100px) rotate(90deg);
          }
          50% {
            transform: translate(-50%, -50%) translate(-100px, -100px) rotate(180deg);
          }
          75% {
            transform: translate(-50%, -50%) translate(100px, -100px) rotate(270deg);
          }
        }
        
        @keyframes moveGradient2 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(-120px, -120px) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translate(120px, -120px) rotate(90deg);
          }
          50% {
            transform: translate(-50%, -50%) translate(120px, 120px) rotate(180deg);
          }
          75% {
            transform: translate(-50%, -50%) translate(-120px, 120px) rotate(270deg);
          }
        }
        
        @keyframes moveGradient3 {
          0%, 100% {
            transform: translate(-50%, -50%) translate(0, 150px) rotate(0deg);
          }
          25% {
            transform: translate(-50%, -50%) translate(-150px, 0) rotate(90deg);
          }
          50% {
            transform: translate(-50%, -50%) translate(0, -150px) rotate(180deg);
          }
          75% {
            transform: translate(-50%, -50%) translate(150px, 0) rotate(270deg);
          }
        }

        @keyframes textGradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
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
      `}</style>

      {/* Main content */}
      <div className="content-wrapper relative z-10">
        <div id="home" className="header-section flex items-center mb-12">
          <div className="header-content mr-8">
            <div className="header-title text-4xl font-bold tracking-wider animate-text-gradient">
              RLOHAW
            </div>
            <div className="header-subtitle text-gray-300 mt-2">AND DREADFULLY DISTINCT AGAINST THE DARK,</div>
            <div className="header-subtitle text-gray-300">A TALL WHITE FOUNTAIN PLAYED</div>
          </div>
          <div className="navigation-menu ml-auto">
            <nav>
            <ul className="nav-list space-y-2">
                <li onClick={() => handleNavigation('achievements')} 
                    className="nav-item hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Achievements</li>
                <li onClick={() => handleNavigation('skills')} 
                    className="nav-item hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Skills</li>
                <li onClick={() => handleNavigation('projects')} 
                    className="nav-item hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Projects</li>
                <li onClick={() => handleNavigation('contact')} 
                    className="nav-item hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Contact</li>
                <li className="nav-item">
                  <a 
                    href="https://t.me/rlohaw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hire-button mt-4 relative group block"
                  >
                    <div className="button-gradient absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded blur opacity-60 group-hover:opacity-100 transition duration-1000" />
                    <div className="button-content relative bg-black px-6 py-2 rounded">
                      HIRE ME
                    </div>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Main content */}
        <div className="main-content grid grid-cols-1 gap-8">
          {/* Profile section */}
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

          {/* Achievements section */}
          <div id="achievements" className="achievements-section space-y-4">
            <h2 className="section-title text-xl text-cyan-400 mb-6">$ cat achievements.md</h2>
            <div className="achievement-card border border-white/20 p-6 rounded-lg relative overflow-hidden group bg-black/40 backdrop-blur-sm">
              <div className="achievement-gradient absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-900/10 to-cyan-900/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="achievement-content relative space-y-4">
                <div className="achievement-item">
                  <h3 className="text-purple-300 text-lg mb-2">🏆 Key Technical Achievements</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Finalist in the AIDAO International AI Olympiad by Yandex, competing against top AI talents to solve real-world challenges in AI and machine learning</li>
                    <li>Recipient of the Central University Scholarship, recognizing academic excellence and innovative contributions to AI research</li>
                    <li>Team Leader and Winner of the DataThon 2024, leading a team to secure 1st place by developing a cutting-edge solution for complex data challenges</li>
                  </ul>
                </div>
                <div className="achievement-item">
                  <h3 className="text-purple-300 text-lg mb-2">🎯 Project Impact</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Developed and deployed a high-performance fraud detection model for a 2.5D car image dataset under strict hardware limitations, optimizing inference on a single-core processor with 3GB RAM</li>
                    <li>Successfully designed a resource-efficient deep learning pipeline, achieving significant results while optimizing for limited computational resources and maintaining high accuracy</li>
                    <li>Led the creation of a custom image processing architecture that effectively handles challenging real-world data, improving model performance and accuracy in a resource-constrained environment</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>



          {/* Skills section */}
          <div id="skills" className="skills-section space-y-4">
            <h2 className="section-title text-xl text-cyan-400 mb-6">$ ls -la skills/</h2>
            {Object.entries(skills).map(([name, skill]) => (
              <SkillCard key={name} name={name} skill={skill} />
            ))}
          </div>

          {/* Projects section */}
          <div id="projects" className="projects-section space-y-4">
            <h2 className="section-title text-xl text-cyan-400 mb-6">$ git log --oneline projects/</h2>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Footer with social links */}
        <div id="contact" className="footer mt-12 border-t border-white/20 pt-4 text-sm">
          <div className="social-links flex items-center flex-wrap gap-4">
            <span className="text-cyan-400">❯ Find me on:</span>
            <a
              href="https://github.com/rlohaw"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link relative group"
            >
              <div className="link-gradient absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
              <span className="relative flex items-center gap-1">
                <Github size={16} className="text-cyan-400" />
                GitHub
              </span>
            </a>
            <a
              href="https://t.me/rlohaw"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link relative group"
            >
              <div className="link-gradient absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
              <span className="relative flex items-center gap-1">
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18 1.897-.962 6.502-1.359 8.627-.168.9-.5 1.201-.82 1.23-.697.064-1.226-.461-1.901-.903-1.056-.692-1.653-1.123-2.678-1.799-1.185-.781-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.139-5.062 3.345-.479.329-.913.489-1.302.481-.428-.008-1.252-.245-1.865-.447-.756-.244-1.356-.374-1.303-.788.026-.204.324-.416.892-.636 3.490-1.528 5.816-2.533 6.978-3.015 3.324-1.385 4.012-1.627 4.466-1.635.099-.002.321.023.465.14.122.102.198.265.21.466.012.2-.031.469-.043.553z"/>
                </svg>
                Telegram
              </span>
            </a>
            <a
              href="https://hh.ru/resume/12138874ff0bd4777a0039ed1f4e4c68357536"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link relative group"
            >
              <div className="link-gradient absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
              <span className="relative flex items-center gap-1">
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.5 0h-15A4.5 4.5 0 0 0 0 4.5v15A4.5 4.5 0 0 0 4.5 24h15a4.5 4.5 0 0 0 4.5-4.5v-15A4.5 4.5 0 0 0 19.5 0zM7 18H4V8h3v10zm-1.5-11A1.5 1.5 0 1 1 7 5.5 1.5 1.5 0 0 1 5.5 7zM18 18h-3v-4.5a1.5 1.5 0 1 0-3 0V18H9V8h3v1.5A3 3 0 0 1 15 8a3 3 0 0 1 3 3v7z"/>
                </svg>
                HH.ru
              </span>
            </a>
            <a
              href="https://www.linkedin.com/in/rostislav-lokhov/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link relative group"
            >
              <div className="link-gradient absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
              <span className="relative flex items-center gap-1">
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPortfolio;