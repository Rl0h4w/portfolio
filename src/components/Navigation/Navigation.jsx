import React, { useState, useEffect } from 'react';
import { Menu, X, UserCircle2, BookOpen, FolderKanban, MessageCircle, FileText } from 'lucide-react';

const Navigation = ({ activeSection, handleNavigation }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setHasScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { id: 'about', label: 'About', icon: UserCircle2 },
    { id: 'skills', label: 'Skills', icon: BookOpen },
    { id: 'projects', label: 'Projects', icon: FolderKanban },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      hasScrolled ? 'bg-black/90 shadow-lg backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 text-transparent bg-clip-text">
              RLOHAW
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleNavigation(id)}
                className={`px-3 py-2 text-sm font-medium transition-colors flex items-center gap-2 ${
                  activeSection === id
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
            <a
              href="cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-black bg-cyan-400 rounded-md hover:bg-cyan-300 transition-colors flex items-center gap-2"
            >
              <FileText size={16} />
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 invisible'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm rounded-b-lg">
            {navigationItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  handleNavigation(id);
                  setIsMenuOpen(false);
                }}
                className={`flex items-center gap-2 w-full px-3 py-2 text-base font-medium rounded-md text-left ${
                  activeSection === id
                    ? 'text-cyan-400 bg-cyan-400/10'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon size={18} />
                {label}
              </button>
            ))}
            <a
              href="cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 w-full px-3 py-2 text-base font-medium text-center text-black bg-cyan-400 rounded-md hover:bg-cyan-300"
            >
              <FileText size={18} />
              Resume
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;