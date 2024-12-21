import React, { useState, useEffect } from 'react';
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
      <div className="border border-white/20 p-4 rounded-lg transition-all duration-300 hover:border-cyan-400/50 bg-black/40 backdrop-blur-sm">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleProject(project.id)}
        >
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">❯</span>
            <h3 className="text-purple-300 font-medium">{project.title}</h3>
          </div>
          {isOpen ? <ChevronUp className="text-cyan-400" /> : <ChevronDown className="text-cyan-400" />}
        </div>

        {isOpen && (
          <div className="mt-4 space-y-4">
            <p className="text-gray-300">{project.fullDesc}</p>
            
            <div className="space-y-2">
              <h4 className="text-purple-300">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-purple-900/30 rounded-md text-sm text-cyan-200">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-purple-300">Key Achievements:</h4>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {project.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div>

            {(project.links?.github || project.links?.demo) && (
              <div className="flex gap-4 pt-2">
                {project.links?.github && (
                  <a 
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                  >
                    <Github size={16} />
                    View Code
                  </a>
                )}
                {project.links?.demo && (
                  <a 
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
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
      <div className="border border-white/20 p-4 rounded-lg transition-all duration-300 hover:border-cyan-400/50 bg-black/40 backdrop-blur-sm">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSkill(name)}
        >
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">❯</span>
            <h3 className="text-purple-300 font-medium">{name}</h3>
          </div>
          {isOpen ? <ChevronUp className="text-cyan-400" /> : <ChevronDown className="text-cyan-400" />}
        </div>

        {isOpen && (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {skill.items.map((item, index) => (
                <span key={index} className="px-2 py-1 bg-purple-900/30 rounded-md text-sm text-cyan-200">
                  {item}
                </span>
              ))}
            </div>

            <div className="space-y-2 text-sm">
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
    <div className="min-h-screen bg-black text-white p-8 font-mono relative overflow-hidden">
      {/* Enhanced background gradients */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-950/60 via-black to-cyan-950/60 pointer-events-none" />
      
      {/* Dynamic gradient background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute w-full h-full">
          <div 
            className="absolute w-96 h-96 bg-purple-900/10 rounded-full blur-3xl"
            style={{
              animation: 'moveGradient1 25s infinite linear',
              transform: 'translate(-50%, -50%)',
              left: '30%',
              top: '30%'
            }}
          />
          <div 
            className="absolute w-96 h-96 bg-cyan-900/10 rounded-full blur-3xl"
            style={{
              animation: 'moveGradient2 30s infinite linear',
              transform: 'translate(-50%, -50%)',
              left: '70%',
              top: '60%'
            }}
          />
          <div 
            className="absolute w-96 h-96 bg-purple-800/10 rounded-full blur-3xl"
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
      <div className="relative z-10">
        <div className="flex items-center mb-12">
          <div className="mr-8">
            <div className="text-4xl font-bold tracking-wider animate-text-gradient">
              RLOHAW
            </div>
            <div className="text-gray-300 mt-2">AND DREADFULLY DISTINCT AGAINST THE DARK,</div>
            <div className="text-gray-300">A TALL WHITE FOUNTAIN PLAYED</div>
          </div>
          <div className="ml-auto">
            <nav>
              <ul className="space-y-2">
                <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Home</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Projects</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Skills</li>
                <li className="hover:text-cyan-400 cursor-pointer transition-colors duration-300">→ Contact</li>
                <li>
                  <button className="mt-4 relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded blur opacity-60 group-hover:opacity-100 transition duration-1000 animate-gradient" />
                    <div className="relative bg-black px-6 py-2 rounded">
                      HIRE ME
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Profile section */}
        <div className="grid grid-cols-1 gap-8">
          <div className="border border-white/20 p-6 rounded-lg relative overflow-hidden group bg-black/40 backdrop-blur-sm">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-900/10 to-cyan-900/30 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative">
              <div className="text-xl mb-4 text-cyan-400">$ cat profile.txt</div>
              <div className="space-y-2 text-sm">
                <p>Name: <span className="text-purple-300">Rostislav Lokhov</span></p>
                <p>Role: <span className="text-purple-300">DS/MLE</span></p>
                <p>Location: <span className="text-purple-300">Moscow, Russia</span></p>
                <p>Status: <span className="animate-status-gradient">Considering offers</span>
                </p>
              </div>
            </div>
          </div>

          {/* Skills section */}
          <div className="space-y-4">
            <h2 className="text-xl text-cyan-400 mb-6">$ ls -la skills/</h2>
            {Object.entries(skills).map(([name, skill]) => (
              <SkillCard key={name} name={name} skill={skill} />
            ))}
          </div>

          {/* Projects section */}
          <div className="space-y-4">
            <h2 className="text-xl text-cyan-400 mb-6">$ git log --oneline projects/</h2>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-white/20 pt-4 text-sm">
          <div className="flex items-center flex-wrap gap-4">
            <span className="text-cyan-400">❯ Find me on:</span>
            {["GitHub", "LinkedIn", "Twitter"].map((platform, i) => (
              <a
                key={i}
                href="#"
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded-full blur opacity-0 group-hover:opacity-60 transition duration-500" />
                <span className="relative">{platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedPortfolio;