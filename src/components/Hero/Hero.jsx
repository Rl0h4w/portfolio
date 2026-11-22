import { ArrowRight, Clock, FileText, Github, Linkedin, MessageCircle } from 'lucide-react';
import { github, telegram } from '../../../site/content.mjs';

const socialLinks = [
  { Icon: Github, href: github, label: 'GitHub', color: 'text-gray-300' },
  { Icon: Linkedin, href: 'https://linkedin.com/in/rl0h4w', label: 'LinkedIn', color: 'text-blue-400' },
  { Icon: MessageCircle, href: telegram, label: 'Telegram', color: 'text-cyan-400' },
];

export default function Hero({ content, lang }) {
  const ru = lang === 'ru';
  const base = import.meta.env.BASE_URL;
  return (
    <section id="about" tabIndex={-1} className="hero-section relative flex items-center">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 lg:flex-row lg:gap-12">
        <img
          src={`${base}profile.jpg`}
          alt={content.name}
          width="320"
          height="320"
          fetchPriority="high"
          className="hero-portrait fade-in aspect-square w-52 shrink-0 rounded-3xl object-cover sm:w-64 lg:w-80"
        />

        <div className="fade-in max-w-2xl text-center lg:text-left">
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">{content.role}</h1>
          <p className="mb-3 text-xl font-medium text-gray-300 sm:text-2xl">{content.name}</p>
          <p className="mb-7 text-base leading-relaxed text-gray-300 sm:text-lg">{content.description}</p>
          <div className="mb-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <a className="hero-action hero-primary" href="#projects">
              {content.work}<ArrowRight size={18} aria-hidden="true" />
            </a>
            <a className="hero-action hero-secondary" href={`${base}${ru ? 'cv' : 'cv-en'}.pdf`}>
              {content.resume}<FileText size={18} aria-hidden="true" />
            </a>
          </div>

          <dl className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-400 lg:justify-start">
            <div className="flex flex-col">
              <dt className="order-2">{ru ? 'Года в ML и AI' : 'Years in ML and AI'}</dt>
              <dd className="flex items-center justify-center gap-2 text-2xl font-bold text-cyan-400 lg:justify-start">
                <Clock size={18} aria-hidden="true" />3+
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="order-2">{ru ? 'Сейчас' : 'Currently'}</dt>
              <dd className="text-2xl font-bold text-cyan-400">{content.current}</dd>
            </div>
          </dl>

          <div className="mt-4 flex justify-center gap-1 lg:justify-start">
            {socialLinks.map(({ Icon, href, label, color }) => (
              <a key={href} href={href} className={`icon-link ${color}`} aria-label={label}>
                <Icon size={22} aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
