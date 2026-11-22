import { copy, email, github, siteUrl, telegram } from '../site/content.mjs';

const lang = process.argv[2] ?? 'ru';
if (!(lang in copy)) throw new Error(`Unsupported language: ${lang}`);
const t = copy[lang];
const ru = lang === 'ru';
const [bank, lab] = t.jobs;
const bankProjects = t.projects.filter(project => project.resume);
const restoration = t.projects.find(project => project.id === 'restoration');

const sections = [
  {
    heading: ru ? 'Опыт работы' : 'Experience',
    entries: [
      {
        title: `${bank.org} · ${bank.role}`,
        date: bank.period,
        bullets: [...bankProjects.map(project => project.resume), ...bank.systems],
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
        ...t.skillsList.map(([label, list]) => `${label} · ${list}`),
        ru ? 'Языки · Русский (родной), английский (B2)' : 'Languages · Russian (native), English (B2)',
      ],
    }],
  },
];

console.log(JSON.stringify({
  name: t.name,
  role: t.role,
  description: t.description,
  links: [
    { text: email, url: `mailto:${email}` },
    { text: ru ? 'Портфолио' : 'Portfolio', url: ru ? new URL('ru/', siteUrl).href : siteUrl },
    { text: 'GitHub', url: github },
    { text: 'Telegram', url: telegram },
  ],
  sections,
}));
