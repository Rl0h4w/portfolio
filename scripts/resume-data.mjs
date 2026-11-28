import { copy, email, github, siteUrl, telegram } from '../site/content.mjs';

const lang = process.argv[2] ?? 'ru';
const track = process.argv[3] ?? 'ai';
if (!Object.hasOwn(copy, lang)) throw new Error(`Unsupported language: ${lang}`);
if (track !== 'ai' && track !== 'backend') throw new Error(`Unsupported résumé track: ${track}`);
const t = copy[lang];
const ru = lang === 'ru';
const [bank, lab] = t.jobs;
const restoration = t.projects.find(project => project.id === 'restoration');
const profiles = {
  ai: {
    role: 'Senior AI / ML Engineer · AI Agents & ML Systems',
    description: ru
      ? 'Более трёх лет в ML и AI. Проектирую платформы для ИИ-агентов, запускаю LLM-сервисы в продакшене и оцениваю качество моделей. Разрабатываю бэкенд на Python и Go. Опыт в deep learning включает выбор модели, оценку на датасете и внедрение.'
      : 'Over three years in ML and AI. I design AI agent platforms, ship LLM services to production, evaluate model quality, and build backends in Python and Go. My deep learning work spans model selection, benchmarking, and deployment.',
    projects: ['context', 'text-to-sql', 'commercial-copilot', 'text-to-segments', 'recommendations'],
    skills: [0, 1, 2],
  },
  backend: {
    role: 'Senior Backend Engineer · Go / Python',
    description: ru
      ? 'Проектирую и разрабатываю бэкенд на Go и Python для продуктов с ИИ-агентами и LLM. Отвечаю за архитектуру, запуск и развитие сервисов. Работал с асинхронной обработкой, кэшированием и мониторингом микросервисов.'
      : 'I design and build Go and Python backends for AI agent and LLM products, owning architecture, delivery, and ongoing development. My work includes asynchronous processing, caching, and microservice monitoring.',
    projects: ['commercial-copilot', 'text-to-sql', 'context', 'text-to-segments'],
    skills: [2, 0, 1],
  },
};
const profile = profiles[track];
const [firstProject, ...otherProjects] = profile.projects.map(id => t.projects.find(project => project.id === id).resume);
const bankBullets = track === 'backend'
  ? [firstProject, ...bank.systems, ...otherProjects]
  : [firstProject, ...otherProjects, ...bank.systems];

const sections = [
  {
    heading: ru ? 'Опыт работы' : 'Experience',
    entries: [
      {
        title: `${bank.org} · ${bank.role} (${ru ? 'от стажёра до Middle+' : 'Intern to Middle+'})`,
        date: bank.period,
        bullets: bankBullets,
      },
      {
        title: `${lab.org} · ${lab.role}`,
        date: lab.period,
        bullets: [restoration.summary, restoration.detail],
      },
    ],
  },
  {
    heading: ru ? 'Образование' : 'Education',
    entries: t.education.map(({ org, period, role }) => ({ title: org, date: period, lines: [role] })),
  },
  {
    heading: t.awards,
    entries: [{ lines: t.results.map(([title, description]) => `${title} · ${description}`) }],
  },
  {
    heading: t.skills,
    entries: [{
      lines: [
        ...profile.skills.map(index => {
          const [label, list] = t.skillsList[index];
          return `${label} · ${list}`;
        }),
        ru ? 'Языки · Русский (родной), английский (B2)' : 'Languages · Russian (native), English (B2)',
      ],
    }],
  },
];

console.log(JSON.stringify({
  name: t.name,
  role: profile.role,
  description: profile.description,
  links: [
    { text: email, url: `mailto:${email}` },
    { text: ru ? 'Портфолио' : 'Portfolio', url: ru ? new URL('ru/', siteUrl).href : siteUrl },
    { text: 'GitHub', url: github },
    { text: 'Telegram', url: telegram },
  ],
  sections,
}));
