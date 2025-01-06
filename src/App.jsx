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

// The order of your sections as they appear in layout
const SECTION_IDS = ["home", "achievements", "skills", "projects", "contact"];

function App() {
  // Mobile menu toggling
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Active section for dynamic highlighting
  const [activeSection, setActiveSection] = useState("home");

  // Scroll progress for the top bar
  const [scrollProgress, setScrollProgress] = useState(0);

  // “Open All” skills if user clicks “Skills” menu
  const [openAllSkills, setOpenAllSkills] = useState(false);

  // Which Project is open
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

    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Called from FeaturedProjects to open a project
  const handleProjectOpen = (projectId) => {
    setOpenProjectId(projectId);
    handleNavigation("projects");
  };

  // Toggling an individual project card
  const toggleProject = (id) => {
    setOpenProjectId((prevId) => (prevId === id ? null : id));
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
            // Force each skill to open if openAllSkills is true
            isOpen={openAllSkills}
            toggleOpen={() => {}}
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
            isOpen={openProjectId === project.id}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-telegram"
              viewBox="0 0 24 24"
            >
              <path d="M22 3L2 12l5.5 2 2.5 7 3.5-3 5 4 4-19z" />
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-briefcase"
              viewBox="0 0 24 24"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
              <path d="M16 3h-8v4h8V3z"></path>
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-github"
              viewBox="0 0 24 24"
            >
              <path
                d="M9 19c-4.97 1-4.97-2.5-7-3
                m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61
                c3.14-.35 6.44-1.54 6.44-7
                A5.44 5.44 0 0 0 20 4.77
                A5.07 5.07 0 0 0 19.91 1
                S19.09.65 16 2.48
                a13.38 13.38 0 0 0-7 0
                C5.91.65 5.09 1 5.09 1
                A5.07 5.07 0 0 0 5 4.77
                a5.44 5.44 0 0 0-1.5 3.72
                c0 5.42 3.3 6.61 6.44 7
                A3.37 3.37 0 0 0 9 17.13V21"
              ></path>
            </svg>
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-mail"
              viewBox="0 0 24 24"
            >
              <path d="M4 4h16v16H4z" />
              <path d="M22 6l-10 7L2 6" />
            </svg>
            Gmail
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;
