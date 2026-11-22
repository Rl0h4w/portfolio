import { useRef, useState } from 'react';
import { BookOpen, Briefcase, FileText, FolderKanban, Menu, MessageCircle, UserCircle2, X } from 'lucide-react';

const icons = [UserCircle2, BookOpen, FolderKanban, Briefcase, MessageCircle];

export default function Navigation({ activeSection, sections, labels, lang }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef(null);
  const ru = lang === 'ru';
  const base = import.meta.env.BASE_URL;
  const resume = ru ? 'Резюме' : 'Resume';

  function closeOnEscape(event) {
    if (event.key === 'Escape' && isMenuOpen) {
      setIsMenuOpen(false);
      event.preventDefault();
      menuButton.current.focus();
    }
  }

  return (
    <header className="site-header fixed inset-x-0 top-0 z-50" onKeyDown={closeOnEscape}>
      <nav aria-label={ru ? 'Основная навигация' : 'Main navigation'} className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="flex min-h-16 flex-wrap items-center justify-between gap-x-4">
          <a className="gradient-text text-2xl font-bold" href="#about">RLOHAW</a>
          <button
            ref={menuButton}
            type="button"
            className="icon-link ml-auto lg:hidden"
            aria-label={ru ? 'Меню' : 'Menu'}
            aria-expanded={isMenuOpen}
            aria-controls="site-menu"
            onClick={() => setIsMenuOpen(open => !open)}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
          <div id="site-menu" className={`${isMenuOpen ? 'flex' : 'hidden'} w-full flex-col gap-1 pb-3 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-3 lg:pb-0`}>
            {sections.map((id, index) => {
              const Icon = icons[index];
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setIsMenuOpen(false)}
                  aria-current={activeSection === id ? 'location' : undefined}
                  className="nav-link"
                >
                  <Icon size={16} aria-hidden="true" />
                  {labels[index]}
                </a>
              );
            })}
            <a href={ru ? base : `${base}ru/`} hrefLang={ru ? 'en' : 'ru'} lang={ru ? 'en' : 'ru'} className="nav-link">
              {ru ? 'EN' : 'RU'}
            </a>
            <a href={`${base}${ru ? 'cv' : 'cv-en'}.pdf`} className="nav-resume">
              <FileText size={16} aria-hidden="true" />{resume}
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
