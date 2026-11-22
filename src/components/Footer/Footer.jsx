import { ArrowUp, Github, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { email, github, telegram } from '../../../site/content.mjs';
import './Footer.css';

const socials = [
  { Icon: Github, href: github, label: 'GitHub' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/rl0h4w', label: 'LinkedIn' },
  { Icon: MessageCircle, href: telegram, label: 'Telegram' },
  { Icon: Mail, href: `mailto:${email}`, label: 'Email' },
];

export default function Footer({ content, sections, labels, lang }) {
  return (
    <footer className="footer-section border-t border-gray-800 bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
        <div className="flex flex-wrap justify-between gap-x-8 gap-y-4">
          <div>
            <a href="#about" className="gradient-text text-2xl font-bold">RLOHAW</a>
            <p className="mt-1 text-sm text-gray-400">{content.role}</p>
          </div>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
            {sections.map((id, index) => (
              <li key={id}><a href={`#${id}`} className="nav-link">{labels[index]}</a></li>
            ))}
          </ul>
          <div className="flex gap-1 text-gray-300">
            {socials.map(({ Icon, href, label }) => (
              <a href={href} key={label} className="icon-link" aria-label={label}><Icon size={20} aria-hidden="true" /></a>
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-gray-800 pt-3 text-sm text-gray-400">
          <span>© {new Date().getFullYear()} {content.name}</span>
          <a className="nav-link text-cyan-300" href="#about">
            {lang === 'ru' ? 'Наверх' : 'Back to top'} <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
