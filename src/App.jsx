// src/App.jsx
import React, { useState, useEffect } from "react";
import Navigation from "./components/Navigation/Navigation";
import FeaturedProjects from "./components/FeaturedProjects/FeaturedProjects";
import Achievements from "./components/Achievements/Achievements";
import SkillCard from "./components/Skills/SkillCard";
import ProjectCard from "./components/Projects/ProjectCard";
import { achievementsData } from "./data/achievementsData";
import { projects } from "./data/projectsData";
import { skills } from "./data/skillsData";

import StarburstEffect from "./components/StarburstEffect/StarburstEffect";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  
  // Track which skill is open by name. If null, none is open.
  const [openSkill, setOpenSkill] = useState(null);

  // For Projects: which Project ID is currently open
  const [openProjectId, setOpenProjectId] = useState(null);

  // Scroll progress for the top bar & scaling effect
  const [scrollProgress, setScrollProgress] = useState(0);

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

  const handleNavigation = (sectionId) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Called from FeaturedProjects: scroll to "projects" and open that specific project
  const handleProjectOpen = (projectId) => {
    setOpenProjectId(projectId);
    handleNavigation("projects");
  };

  // Toggling a project card from the Projects section
  const toggleProject = (id) => {
    setOpenProjectId((prevId) => (prevId === id ? null : id));
  };

  // Toggling a skill card
  const toggleSkill = (skillName) => {
    setOpenSkill((prev) => (prev === skillName ? null : skillName));
  };

  return (
    <div className="App">
      <StarburstEffect />
      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        handleNavigation={handleNavigation}
      />

      {/* HOME */}
      <section
        id="home"
        style={{
          padding: "3rem 1rem",
          minHeight: "70vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <img
            src="/profile.jpg"
            alt="Profile"
            style={{
              width: "220px",
              height: "220px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <div style={{ flex: "1 1 300px" }}>
            <h1
              style={{
                marginBottom: "1rem",
                color: "#fff",
                fontSize: "1.8rem",
              }}
            >
              Hello, I’m [Your Name]!
            </h1>
            <p style={{ color: "#ccc", lineHeight: "1.5" }}>
              I’m a data scientist and computer vision enthusiast, specializing
              in advanced deep learning techniques for image processing and
              fraud detection. Check out my achievements, skills, and projects
              to learn more about my work!
            </p>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section
        id="achievements"
        style={{
          padding: "3rem 1rem",
          minHeight: "50vh",
        }}
      >
        <Achievements achievementsData={achievementsData} />
      </section>

      {/* SKILLS */}
      <section
        id="skills"
        style={{
          padding: "3rem 1rem",
          minHeight: "50vh",
        }}
      >
        <h2 className="text-xl mb-6 animate-text-gradient">Skills</h2>
        {Object.entries(skills).map(([skillName, skillData]) => (
          <SkillCard
            key={skillName}
            name={skillName}
            skill={skillData}
            isOpen={openSkill === skillName}
            toggleOpen={() => toggleSkill(skillName)}
          />
        ))}
      </section>

      {/* FEATURED PROJECTS */}
      <section
        style={{
          padding: "2rem 1.5rem",
        }}
      >
        <FeaturedProjects
          featuredProjects={projects.filter((p) => p.featured)}
          handleNavigation={handleProjectOpen}
        />
      </section>

      {/* MAIN PROJECTS */}
      <section
        id="projects"
        style={{
          padding: "3rem 1rem",
          minHeight: "50vh",
        }}
      >
        <h2 className="text-xl mb-6 animate-text-gradient">Projects</h2>
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            isOpen={openProjectId === project.id}
            toggleOpen={() => toggleProject(project.id)}
          />
        ))}
      </section>

      {/* CONTACT (with reduced bottom space) */}
      <section
        id="contact"
        style={{
          padding: "3rem 1rem 1rem", // changed bottom padding from 3rem to 1rem
          minHeight: "auto",         // or remove minHeight if you wish
        }}
      >
        <h2 className="text-xl mb-6 animate-text-gradient">Contact Me</h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            alignItems: "center",
            color: "#ccc",
          }}
        >
          {/* Telegram */}
          <a
            href="https://t.me/rlohaw"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "#22d3ee",
            }}
          >
            {/* icon */}
            Telegram
          </a>

          {/* hh.ru */}
          <a
            href="https://hh.ru/resume/12138874ff0bd4777a0039ed1f4e4c68357536"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "#22d3ee",
            }}
          >
            {/* icon */}
            hh.ru
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/rl0h4w"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "#22d3ee",
            }}
          >
            {/* icon */}
            GitHub
          </a>

          {/* Gmail */}
          <a
            href="mailto:rl0h4w@gmail.com"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              color: "#22d3ee",
            }}
          >
            {/* icon */}
            Gmail
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
