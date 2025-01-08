import React from 'react';
import { SkillIcons } from '../Common/IconComponents';

const SkillsSection = ({ skills }) => {
  // Function to determine progress color based on level
  const getLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case 'advanced': return 'bg-emerald-400';
      case 'intermediate': return 'bg-cyan-400';
      case 'beginner': return 'bg-blue-400';
      default: return 'bg-gray-400';
    }
  };

  const getIcon = (category) => {
    switch (category) {
      case 'Computer Vision': return SkillIcons.ComputerVision;
      case 'Machine Learning': return SkillIcons.MachineLearning;
      case 'Deep Learning': return SkillIcons.DeepLearning;
      case 'MLOps': return SkillIcons.MLOps;
      default: return SkillIcons.MachineLearning;
    }
  };

  return (
    <section id="skills" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
            Technical Skills
          </span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Specialized in AI and computer vision, with a focus on developing
          efficient and scalable solutions for complex problems.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {Object.entries(skills).map(([category, skillData], index) => {
            const IconComponent = getIcon(category);
            return (
              <div key={category} className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-lg bg-cyan-400/10 text-cyan-400">
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{category}</h3>
                    <p className="text-sm text-gray-400">{skillData.experience}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Progress bar for skill level */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Proficiency</span>
                      <span className="text-cyan-400">{skillData.level}</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full">
                      <div
                        className={`h-full rounded-full ${getLevelColor(skillData.level)} transition-all duration-500`}
                        style={{
                          width: skillData.level === 'Advanced' ? '90%' :
                                skillData.level === 'Intermediate' ? '60%' : '30%'
                        }}
                      />
                    </div>
                  </div>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-2">
                    {skillData.items.map((item, index) => (
                      <span
                        key={`${category}-${index}`}
                        className="px-3 py-1 text-sm rounded-full bg-gray-800 text-gray-300 hover:bg-cyan-400/10 hover:text-cyan-400 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Project highlight */}
                  <p className="text-sm text-gray-400 mt-4 line-clamp-2">
                    {skillData.projects}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;