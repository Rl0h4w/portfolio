import { FileText, Github, Linkedin, Mail, MapPin, MessageCircle } from 'lucide-react';
import { email, github, telegram } from '../../../site/content.mjs';

const methods = [
  { Icon: Mail, name: 'Email', value: email, href: `mailto:${email}`, color: 'text-red-300' },
  { Icon: Github, name: 'GitHub', value: 'github.com/Rl0h4w', href: github, color: 'text-white' },
  { Icon: Linkedin, name: 'LinkedIn', value: 'linkedin.com/in/rl0h4w', href: 'https://linkedin.com/in/rl0h4w', color: 'text-blue-300' },
  { Icon: MessageCircle, name: 'Telegram', value: 't.me/rlohaw', href: telegram, color: 'text-cyan-300' },
];

export default function Contact({ content, lang }) {
  const ru = lang === 'ru';
  const base = import.meta.env.BASE_URL;
  return (
    <section id="contact" tabIndex={-1} className="portfolio-section">
      <h2 className="section-title">{content.contact}</h2>
      <div className="mx-auto grid max-w-5xl gap-4 lg:grid-cols-2">
        <div className="grid gap-3">
          {methods.map(({ Icon, name, value, href, color }) => (
            <a className="portfolio-card flex min-w-0 items-center gap-4 p-4 hover:border-cyan-400/60" href={href} key={name}>
              <span className={`shrink-0 rounded-lg bg-gray-800 p-2.5 ${color}`}><Icon size={22} aria-hidden="true" /></span>
              <span className="min-w-0">
                <strong className="block text-white">{name}</strong>
                <span className="break-words text-sm text-gray-300">{value}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="portfolio-card self-start p-5 sm:p-6">
          <p className="mb-5 flex items-center gap-3 text-gray-300">
            <MapPin className="text-red-300" size={20} aria-hidden="true" />
            {ru ? 'Москва / удалённо' : 'Moscow / remote'}
          </p>
          <h3 className="mb-2 text-xl font-semibold text-white">{content.resume}</h3>
          <div className="flex flex-wrap gap-2">
            <a className="hero-action hero-secondary" href={`${base}cv-en.pdf`} hrefLang="en" lang="en"><FileText size={16} aria-hidden="true" />English PDF</a>
            <a className="hero-action hero-secondary" href={`${base}cv.pdf`} hrefLang="ru" lang="ru"><FileText size={16} aria-hidden="true" />Русский PDF</a>
          </div>
        </div>
      </div>
    </section>
  );
}
