import React from 'react';
import { Github, Linkedin, Mail, MessageCircle, ArrowUp } from 'lucide-react';
import './Footer.css';

const Footer = ({ handleNavigation }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/rl0h4w',
      color: 'hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://linkedin.com/in/rl0h4w',
      color: 'hover:text-[#0A66C2]'
    },
    {
      name: 'Telegram',
      icon: MessageCircle,
      url: 'https://t.me/rlohaw',
      color: 'hover:text-[#26A5E4]'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:rl0h4w@gmail.com',
      color: 'hover:text-emerald-400'
    }
  ];

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="footer-section bg-gray-900/50 backdrop-blur-sm mt-20">
      <div className="footer-gradient" />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="footer-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
              RLOHAW
            </h2>
            <p className="text-gray-400 text-sm">
              Computer Vision Engineer specializing in deep learning and AI solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-cyan-400 footer-nav-link"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400">
              <li>rl0h4w@gmail.com</li>
              <li>t.me/rlohaw</li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Follow Me</h3>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 social-link ${social.color}`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} RLOHAW. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="back-to-top mt-4 md:mt-0 text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
            aria-label="Scroll to top"
          >
            Back to top
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;