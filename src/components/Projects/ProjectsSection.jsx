import { useState } from 'react';
import { Github, Plus } from 'lucide-react';

const bestHackSource = 'https://github.com/Rl0h4w/BestHack';

export default function ProjectsSection({ content, lang }) {
  const [selected, setSelected] = useState('all');
  const ru = lang === 'ru';
  const filters = [
    ['all', ru ? 'Все проекты' : 'All projects'],
    ['bank', ru ? 'LLM и Backend' : 'LLMs and backend'],
    ['vision', 'Computer Vision'],
  ];
  const projects = content.projects.filter(project =>
    selected === 'all' || (selected === 'bank' ? Boolean(project.resume) : !project.resume)
  );

  return (
    <section id="projects" tabIndex={-1} className="portfolio-section">
      <h2 className="section-title">{content.cases}</h2>
      <div className="mb-7 flex flex-wrap justify-center gap-2" role="group" aria-label={ru ? 'Фильтр проектов' : 'Filter projects'}>
        {filters.map(([type, label]) => (
          <button
            type="button"
            key={type}
            aria-pressed={selected === type}
            aria-controls="project-list"
            onClick={() => setSelected(type)}
            className="filter-button"
          >
            {label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">{ru ? `Показано проектов: ${projects.length}` : `${projects.length} projects shown`}</p>
      <div id="project-list" className="grid items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map(project => (
          <article key={project.id} id={project.id} className="portfolio-card p-5 sm:p-6">
            <p className="mb-2 text-sm text-cyan-300">{project.area}</p>
            <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
            <p className="mb-3 text-gray-300">{project.summary}</p>
            {project.outcome && <p className="mb-3 border-l-2 border-cyan-400 pl-3 font-medium text-cyan-100">{project.outcome}</p>}
            <ul className="mb-3 flex flex-wrap gap-2" aria-label={content.skills}>
              {project.domains.map(tech => <li className="skill-tag" key={tech}>{tech}</li>)}
            </ul>
            {project.detail && (
              <details className="project-details">
                <summary><Plus size={18} aria-hidden="true" />{content.details}</summary>
                <p className="mt-2 text-gray-300">{project.detail}</p>
                {project.steps && (
                  <ol className="mt-3 list-decimal space-y-1 pl-5 text-gray-300">
                    {project.steps.map(([label, step]) => <li key={label}><strong className="text-white">{label}.</strong> {step}</li>)}
                  </ol>
                )}
                {project.id === 'heart-rate' && (
                  <a href={bestHackSource} className="mt-3 inline-flex items-center gap-2 text-cyan-300 underline underline-offset-4">
                    <Github size={16} aria-hidden="true" />{ru ? 'Код проекта' : 'Source code'}
                  </a>
                )}
              </details>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
