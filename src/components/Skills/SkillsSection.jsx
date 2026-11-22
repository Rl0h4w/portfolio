import { Brain, Layers, Terminal } from 'lucide-react';

const icons = [Layers, Brain, Terminal];

export default function SkillsSection({ content }) {
  return (
    <section id="skills" tabIndex={-1} className="portfolio-section">
      <h2 className="section-title">{content.skills}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.skillsList.map(([category, skills], index) => {
          const Icon = icons[index];
          return (
            <article className="portfolio-card p-5 sm:p-6" key={category}>
              <div className="mb-4 flex items-center gap-3">
                <span className="rounded-lg bg-cyan-400/10 p-3 text-cyan-300"><Icon size={24} aria-hidden="true" /></span>
                <h3 className="text-xl font-semibold text-white">{category}</h3>
              </div>
              <ul className="flex flex-wrap gap-2" aria-label={category}>
                {skills.split(', ').map(skill => <li className="skill-tag" key={skill}>{skill}</li>)}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
