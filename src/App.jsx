import React, { useState, useEffect } from "react";
import AOS from "aos";
import Navigation from "./components/Navigation/Navigation";
import Hero from "./components/Hero/Hero";
import Achievements from "./components/Achievements/Achievements";
import SkillsSection from "./components/Skills/SkillsSection";
import FeaturedProjects from "./components/FeaturedProjects/FeaturedProjects";
import ProjectsSection from "./components/Projects/ProjectsSection";
import Footer from "./components/Footer/Footer";
import StarburstEffect from "./components/StarburstEffect/StarburstEffect";

// Data
import { achievementsData } from "./data/achievementsData";
import { projects } from "./data/projectsData";
import { skills } from "./data/skillsData";

function App() {
  // Mobile menu toggling
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Active section for dynamic highlighting
  const [activeSection, setActiveSection] = useState("home");

  // Scroll progress for top nav bar
  const [scrollProgress, setScrollProgress] = useState(0);

  // Intersection Observer for section highlighting
  useEffect(() => {
    const sections = ["home", "achievements", "skills", "projects", "contact"];
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
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // AOS for scroll-based animations
  useEffect(() => {
    AOS.init({ duration: 800, offset: 100, once: true });
  }, []);

  // Smooth-scroll to a given section
  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // For Featured Projects “View Details”: navigate to projects section & open that card
  const handleFeaturedProjectOpen = (projectId) => {
    // Navigate to the Projects section
    handleNavigation("projects");
    // Optionally open that specific project card by ID 
    // (You can integrate a Redux or useRef to trigger the open state.)
  };

  return (
    <>
      {/* StarburstEffect is now truly in the background */}
      <StarburstEffect />

      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        handleNavigation={handleNavigation}
      />

      <Hero handleNavigation={handleNavigation} />

      <Achievements achievementsData={achievementsData} />

      {/* FIXED: pass in the correct data from skillsData.js */}
      <SkillsSection skills={skills} />

      {/* Featured Projects - optional highlight */}
      <FeaturedProjects
        featuredProjects={projects.filter((p) => p.featured)}
        onViewDetails={handleFeaturedProjectOpen}
      />

      {/* FIXED: Pass in the ‘projects’ array from projectsData */}
      <ProjectsSection projects={projects} />

      <Footer />
    </>
  );
}

export default App;
