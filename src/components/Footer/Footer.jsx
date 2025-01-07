// Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="contact" className="footer-section fade-in">
      <h2 className="footer-heading animate-text-gradient">Contact Me</h2>
      <div className="footer-links">
        <a href="https://t.me/rlohaw" target="_blank" rel="noopener noreferrer">
          Telegram
        </a>
        <a
          href="https://hh.ru/resume/12138874ff0bd4777a0039ed1f4e4c68357536"
          target="_blank"
          rel="noopener noreferrer"
        >
          hh.ru
        </a>
        <a
          href="https://github.com/rl0h4w"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
        <a href="mailto:rl0h4w@gmail.com">Gmail</a>
      </div>
      <p className="footer-copy">&copy; {new Date().getFullYear()} RLOHAW</p>
    </footer>
  );
};

export default Footer;
