import React, { useState, useEffect } from 'react';
import ErrorBoundary from './components/Common/ErrorBoundary';
import { ToastProvider } from './components/Common/Toast';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import SkillsSection from './components/Skills/SkillsSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import StarburstEffect from './components/StarburstEffect/StarburstEffect';

// Data imports
import { projects } from './data/projectsData';
import { skills } from './data/skillsData';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track active section
  useEffect(() => {
    const sections = ['about', 'skills', 'projects', 'contact'];
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.5,
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = 
        document.documentElement.scrollHeight - 
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll navigation
  const handleNavigation = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <ErrorBoundary>
      <ToastProvider>
        <div className="relative min-h-screen bg-gray-900">
          <div className="fixed inset-0 z-0">
            <StarburstEffect />
          </div>

          <div className="relative z-10">
            <Navigation 
              activeSection={activeSection}
              scrollProgress={scrollProgress}
              handleNavigation={handleNavigation}
            />
            
            <main className="relative z-10">
              <Hero handleNavigation={handleNavigation} />
              
              <div className="relative z-10 py-20">
                <SkillsSection skills={skills} />
              </div>
              
              <div className="relative z-10 py-20">
                <ProjectsSection projects={projects} />
              </div>
              
              <div className="relative z-10 py-20">
                <Contact />
              </div>
            </main>

            <Footer handleNavigation={handleNavigation} />
          </div>
        </div>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;