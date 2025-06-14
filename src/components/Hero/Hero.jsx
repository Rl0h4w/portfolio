import React from 'react';
import { ArrowRight } from 'lucide-react';
import { 
  SocialIcons, 
  StatusIcons, 
  AchievementIcons 
} from '../Common/IconComponents';

const Hero = ({ handleNavigation }) => {
  const stats = [
    { 
      label: 'Years Experience', 
      value: '2+',
      icon: AchievementIcons.Clock
    },
    { 
      label: 'Pet Projects Completed', 
      value: '15+',
      icon: AchievementIcons.Trophy
    },
    { 
      label: 'Current projects', 
      value: '1',
      icon: AchievementIcons.Document
    }
  ];

  const socialLinks = [
    {
      icon: SocialIcons.GitHub,
      href: 'https://github.com/rl0h4w',
      label: 'GitHub Profile'
    },
    {
      icon: SocialIcons.LinkedIn,
      href: 'https://linkedin.com/in/rl0h4w',
      label: 'LinkedIn Profile'
    },
    {
      icon: SocialIcons.Telegram,
      href: 'https://t.me/rlohaw',
      label: 'Telegram'
    }
  ];

  return (
    <section id="about" className="relative min-h-screen flex items-center justify-center py-20">
      <div className="bg-shape bg-shape-1" />
      <div className="bg-shape bg-shape-2" />
      
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Profile Image */}
          <div className="hero-profile-container relative w-64 h-64 lg:w-80 lg:h-80">
            <img
              src="./profile.jpg"
              alt="Rostislav Lokhov"
              className="w-full h-full object-cover rounded-3xl shadow-2xl"
            />
          </div>

          {/* Content */}
          <div className="text-center lg:text-left max-w-2xl">
            <div className="space-y-4 mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold gradient-text">
                Computer Vision Engineer
              </h1>
              <p className="text-2xl text-gray-300">
                Specializing in Deep Learning & AI Solutions
              </p>
              <p className="text-lg text-gray-400">
                I craft efficient AI solutions for real-world challenges, focusing on 
                image processing and fraud detection systems that deliver measurable results.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-12">
              <button
                onClick={() => handleNavigation('projects')}
                className="cta-button px-6 py-3 bg-gradient-to-r from-cyan-400 to-emerald-400 
                         text-black font-semibold rounded-lg flex items-center gap-2 
                         hover:opacity-90 transition-all"
              >
                View My Work
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <a
                href="/portfolio/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-gray-800 text-white font-semibold rounded-lg 
                         flex items-center gap-2 hover:bg-gray-700 transition-colors"
              >
                Resume 
                <StatusIcons.Document size={20} />
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="stat-counter text-center">
                  <div className="flex items-center gap-2 justify-center mb-2">
                    <stat.icon size={20} />
                    <div className="text-3xl font-bold text-cyan-400">
                      {stat.value}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start gap-6 mt-8">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:-translate-y-1 transition-transform"
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;