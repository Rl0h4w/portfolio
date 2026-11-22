import { useEffect, useState } from 'react';
import ErrorBoundary from './components/Common/ErrorBoundary';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import SkillsSection from './components/Skills/SkillsSection';
import ProjectsSection from './components/Projects/ProjectsSection';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import StarburstEffect from './components/StarburstEffect/StarburstEffect';
import { copy } from '../site/content.mjs';

const sections = ['about', 'skills', 'projects', 'experience', 'contact'];
const lang = document.documentElement.lang === 'ru' ? 'ru' : 'en';
const content = copy[lang];
const ru = lang === 'ru';
const labels = ru
  ? ['Обо мне', 'Навыки', 'Проекты', 'Опыт', 'Контакты']
  : ['About', 'Skills', 'Projects', 'Experience', 'Contact'];

function App() {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const elements = sections.map(id => document.getElementById(id));
    let frame;
    const updateSection = () => {
      const current = elements.findLast(element => element.getBoundingClientRect().top < 140);
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      setActiveSection(atBottom ? 'contact' : current?.id ?? 'about');
    };
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateSection);
    };
    updateSection();
    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="relative min-h-screen bg-black">
        <StarburstEffect />
        <a className="skip-link" href="#main">{content.skip}</a>
        <div className="relative z-10">
          <Navigation activeSection={activeSection} sections={sections} labels={labels} lang={lang} />
          <main id="main" tabIndex={-1}>
            <Hero content={content} lang={lang} />
            <SkillsSection content={content} />
            <ProjectsSection content={content} lang={lang} />
            <section className="portfolio-section" id="experience" tabIndex={-1}>
              <h2 className="section-title">{content.experience}</h2>
              <div className="mx-auto grid max-w-5xl gap-4">
                {[...content.jobs, ...content.education].map(job => (
                  <article className="portfolio-card p-5 sm:p-6" key={job.org}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="text-xl font-semibold text-white">{job.org}</h3>
                      {job.period && <p className="text-sm text-gray-400">{job.period}</p>}
                    </div>
                    <p className="mb-2 mt-1 font-medium text-cyan-300">{job.role}</p>
                    {job.text && <p className="text-gray-300">{job.text}</p>}
                    {job.systems && (
                      <ul className="mt-3 list-disc space-y-2 pl-5 text-gray-300 marker:text-cyan-300">
                        {job.systems.map(detail => <li key={detail}>{detail}</li>)}
                      </ul>
                    )}
                  </article>
                ))}
                <div className="portfolio-card p-5 sm:p-6">
                  <h3 className="mb-3 text-xl font-semibold text-white">{content.awards}</h3>
                  <dl className="grid gap-3 sm:grid-cols-2">
                    {content.results.map(([name, result]) => (
                      <div key={name}>
                        <dt className="font-medium text-cyan-300">{name}</dt>
                        <dd className="text-gray-300">{result}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </section>
            <Contact content={content} lang={lang} />
          </main>
          <Footer content={content} sections={sections} labels={labels} lang={lang} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
