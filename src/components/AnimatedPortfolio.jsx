import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, Github } from 'lucide-react';

const AnimatedPortfolio = () => {
  const [openSkills, setOpenSkills] = useState({});
  const [openProjects, setOpenProjects] = useState({});

  useEffect(() => {
    const gradients = document.querySelectorAll('.animate-gradient');
    gradients.forEach(gradient => {
      gradient.style.backgroundSize = '400% 400%';
    });
  }, []);

  const projects = [
    {
      id: 1,
      title: "ML Image Process",
      shortDesc: "High-performance medical image processing pipeline",
      fullDesc: "Developed an end-to-end pipeline for medical image processing using deep learning models. Implemented efficient data processing and model serving architecture.",
      techStack: ["Python", "PyTorch", "FastAPI", "Docker", "PostgreSQL"],
      links: {
        github: "https://github.com/rlohaw/project1",
        demo: "https://demo-link.com"
      },
      achievements: [
        "Reduced image processing time by 60%",
        "Implemented distributed processing pipeline",
        "Achieved 95% accuracy in image classification"
      ]
    },
    {
      id: 2,
      title: "NLP Analysis Tool",
      shortDesc: "Natural Language Processing for document analysis",
      fullDesc: "Created a tool for analyzing large volumes of text data using transformer models. Features include sentiment analysis, named entity recognition, and topic modeling.",
      techStack: ["Python", "Hugging Face", "spaCy", "Flask", "Redis"],
      links: {
        github: "https://github.com/rlohaw/project2",
        demo: "https://demo-link.com"
      },
      achievements: [
        "Processed over 1M documents",
        "Integrated 5+ language models",
        "Reduced analysis time by 40%"
      ]
    }
  ];

  const skills = {
    "Machine Learning": {
      items: ["PyTorch", "TensorFlow", "Scikit-learn", "XGBoost", "LightGBM"],
      experience: "4 years of hands-on experience in developing and deploying ML models",
      projects: "Implemented production ML systems for medical imaging and NLP",
      level: "Advanced"
    },
    "Deep Learning": {
      items: ["CNNs", "Transformers", "GANs", "Object Detection", "Segmentation"],
      experience: "3 years working with neural networks and deep learning architectures",
      projects: "Developed custom architectures for medical image analysis",
      level: "Advanced"
    },
    "MLOps": {
      items: ["Docker", "Kubernetes", "MLflow", "DVC", "Airflow"],
      experience: "2 years of experience in ML systems deployment and monitoring",
      projects: "Built end-to-end ML pipelines for production environments",
      level: "Intermediate"
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
      <div className="border border-white/20 p-4 rounded-lg transition-all duration-300 hover:border-cyan-400/50">
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
                  <span key={index} className="px-2 py-1 bg-purple-900/20 rounded-md text-sm">
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

            <div className="flex gap-4 pt-2">
              <a 
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <Github size={16} />
                View Code
              </a>
              <a 
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            </div>
          </div>
        )}
      </div>
    );
  };

  const SkillCard = ({ name, skill }) => {
    const isOpen = openSkills[name];

    return (
      <div className="border border-white/20 p-4 rounded-lg transition-all duration-300 hover:border-cyan-400/50">
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
                <span key={index} className="px-2 py-1 bg-purple-900/20 rounded-md text-sm">
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
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30 pointer-events-none" />
      
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl" />
      </div>

      <div className="flex items-center mb-12 relative">
        <div className="mr-8">
          <div className="text-4xl font-bold tracking-wider bg-gradient-to-r from-cyan-400 via-white to-purple-400 text-transparent bg-clip-text">
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
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-cyan-500 to-purple-600 rounded blur opacity-60 group-hover:opacity-100 transition duration-1000" />
                  <div className="relative bg-black px-6 py-2 rounded">
                    HIRE ME
                  </div>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="border border-white/20 p-6 rounded-lg relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative">
            <div className="text-xl mb-4 text-cyan-400">$ cat profile.txt</div>
            <div className="space-y-2 text-sm">
              <p>Name: <span className="text-purple-300">Rostislav Lokhov</span></p>
              <p>Role: <span className="text-purple-300">DS/MLE</span></p>
              <p>Location: <span className="text-purple-300">Moscow, Russia</span></p>
              <p>
                Status: 
                <span className="bg-gradient-to-r from-green-400 via-cyan-400 to-green-400 text-transparent bg-clip-text">
                  considering offers
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-cyan-400 mb-6">$ ls -la skills/</h2>
          {Object.entries(skills).map(([name, skill]) => (
            <SkillCard key={name} name={name} skill={skill} />
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl text-cyan-400 mb-6">$ git log --oneline projects/</h2>
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

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
  );
};

export default AnimatedPortfolio;