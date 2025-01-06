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

const SECTION_IDS = ["home", "achievements", "skills", "projects", "contact"];

function App() {
  // Mobile menu toggling
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Active section for dynamic highlighting
  const [activeSection, setActiveSection] = useState("home");

  // Scroll progress for the top bar
  const [scrollProgress, setScrollProgress] = useState(0);

  // Whether to open all skills
  const [openAllSkills, setOpenAllSkills] = useState(false);

  // Keep track of an individually opened skill
  const [openSkill, setOpenSkill] = useState(null);

  // Whether to open all projects
  const [openAllProjects, setOpenAllProjects] = useState(false);

  // Keep track of an individually opened project
  const [openProjectId, setOpenProjectId] = useState(null);

  // IntersectionObserver to highlight sections in the menu
  useEffect(() => {
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.55, // Adjust for when the section is ~55% in view
    });

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  // Track scroll progress for the top progress bar
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

  // Smooth-scroll to a given section
  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false);

    // If user picks "Skills," open them all
    if (sectionId === "skills") {
      setOpenAllSkills(true);
    } else {
      setOpenAllSkills(false);
    }

    // If user picks "Projects," open them all
    if (sectionId === "projects") {
      setOpenAllProjects(true);
    } else {
      setOpenAllProjects(false);
    }

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Called from FeaturedProjects to open a specific project
  const handleProjectOpen = (projectId) => {
    setOpenProjectId(projectId);
    // Also navigate to Projects section
    handleNavigation("projects");
  };

  // Toggling an individual project card
  const toggleProject = (id) => {
    // If the same project is open, close it; otherwise open the new one
    setOpenProjectId((prevId) => (prevId === id ? null : id));
  };

  // Toggling an individual skill card
  const toggleSkill = (skillName) => {
    // If the same skill is open, close it; otherwise open the new one
    setOpenSkill((prev) => (prev === skillName ? null : skillName));
  };

  return (
    <div className="App">
      {/* Optional Starburst effect in the background */}
      <StarburstEffect />

      <Navigation
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollProgress={scrollProgress}
        activeSection={activeSection}
        handleNavigation={handleNavigation}
      />

      {/* HOME Section */}
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
          {/* Photo */}
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
          {/* Intro Text */}
          <div style={{ flex: "1 1 300px" }}>
            {/* You can use a text gradient via inline styles or a special class */}
            <h1
              style={{
                marginBottom: "1rem",
                background: "linear-gradient(to right, #4ade80, #22d3ee)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.8rem",
                fontWeight: "bold",
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

      {/* ACHIEVEMENTS Section */}
      <section
        id="achievements"
        style={{
          padding: "3rem 1rem",
          minHeight: "50vh",
        }}
      >
        <Achievements achievementsData={achievementsData} />
      </section>

      {/* SKILLS Section */}
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
            // If "openAllSkills" is true, all are open; otherwise check individual
            isOpen={openAllSkills || openSkill === skillName}
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

      {/* MAIN PROJECTS Section */}
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
            // If "openAllProjects" is true, all are open; otherwise check individually
            isOpen={openAllProjects || openProjectId === project.id}
            toggleOpen={() => toggleProject(project.id)}
          />
        ))}
      </section>

      {/* CONTACT Section */}
      <section
        id="contact"
        style={{
          padding: "3rem 1rem 1rem",
          minHeight: "auto",
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
            {/* ...icon... */}
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
            {/* ...icon... */}
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
            {/* ...icon... */}
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
            {/* ...icon... */}
            Gmail
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
