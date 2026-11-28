import { russianProjects, englishProjects } from './projects.js';

export const publicBase = 'https://rlohaw.ru/me/';
export const wordsByLanguage = {
  ru: {
    name: 'Ростислав Лохов', profile: 'Профиль', work: 'Смотреть работы', open: 'О проекте',
    back: 'К работам', result: 'Результат', next: 'Следующая работа', previous: 'Предыдущая работа',
    browse: 'Листать работы', aiResume: 'Резюме AI / ML', backendResume: 'Резюме Backend', email: 'Почта', play: 'Включить движение',
    pause: 'Приостановить движение', sculpture: 'Оптическая скульптура',
    bio: 'Проектирую платформы для ИИ-агентов в Т-Банке. Веду бэкенд на Go и Python от архитектуры до запуска.',
    lab: 'До Т-Банка занимался восстановлением подводной съёмки в лаборатории ЛЭТИ.',
    home: 'rlohaw — на главную', navigation: 'Основная навигация', projects: 'Работы',
    interactive: 'Интерактивная оптическая скульптура',
    interactionHelp: 'Потяните мышью или пальцем, чтобы повернуть скульптуру. С клавиатуры используйте стрелки.',
    hint: 'Потяните, чтобы повернуть',
    description: 'Ростислав Лохов проектирует платформы для ИИ-агентов и разрабатывает бэкенд на Go и Python.'
  },
  en: {
    name: 'Rostislav Lokhov', profile: 'Profile', work: 'Explore my work', open: 'View case',
    back: 'Back to work', result: 'Result', next: 'Next project', previous: 'Previous project',
    browse: 'Browse projects', aiResume: 'AI / ML résumé', backendResume: 'Backend résumé', email: 'Email', play: 'Enable motion',
    pause: 'Pause motion', sculpture: 'Optical sculpture',
    bio: 'I design platforms for AI agents at T-Bank and lead backend development in Go and Python from architecture to launch.',
    lab: 'Before T-Bank, I worked on underwater image restoration at the ETU LETI research lab.',
    home: 'rlohaw — home', navigation: 'Main navigation', projects: 'Work',
    interactive: 'Interactive optical sculpture',
    interactionHelp: 'Drag to rotate the sculpture, or use the arrow keys.', hint: 'Drag to rotate',
    description: 'Rostislav Lokhov builds AI agent platforms, LLM products, and Go and Python backends.'
  }
};

export function routePath(base, lang, view = 'home', slug = '') {
  const prefix = base + (lang === 'ru' ? 'ru/' : '');
  if (view === 'home') return prefix;
  return prefix + view + '/' + (slug ? slug + '/' : '');
}

export function resolvePage(pathname, base) {
  if (!pathname.startsWith(base)) return null;
  const parts = pathname.slice(base.length).split('/').filter(Boolean);
  const lang = parts[0] === 'ru' ? parts.shift() : 'en';
  const view = parts.shift() || 'home';
  const slug = parts.shift() || '';
  if (parts.length) return null;
  if (['home', 'profile'].includes(view) && !slug) return { lang, view, slug };
  if (['work', 'case'].includes(view) && russianProjects.some(project => project.slug === slug)) {
    return { lang, view, slug };
  }
  return null;
}

export function legacyPage(hash, lang) {
  const [section, projectSlug] = hash.replace(/^#\/?/, '').split('/');
  if (['work', 'case'].includes(section) && russianProjects.some(project => project.slug === projectSlug)) {
    return { lang, view: section, slug: projectSlug };
  }
  if (['profile', 'about', 'experience', 'skills', 'contact'].includes(section)) {
    return { lang, view: 'profile', slug: '' };
  }
  if (section === 'projects') return { lang, view: 'work', slug: russianProjects[0].slug };
  return { lang, view: 'home', slug: '' };
}

export function allPages() {
  return ['en', 'ru'].flatMap(lang => [
    { lang, view: 'home', slug: '' },
    { lang, view: 'profile', slug: '' },
    ...russianProjects.flatMap(project => ['work', 'case'].map(view => ({ lang, view, slug: project.slug })))
  ]);
}

export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

const arrow = '<span class="circle" aria-hidden="true"><span class="arr"></span></span>';
function action(label, href) {
  return `<a class="action control-reveal" href="${href}"><span>${label}</span>${arrow}</a>`;
}

export function renderPage(page, base, galleryIndex = 0) {
  const { lang, view, slug } = page;
  const words = wordsByLanguage[lang];
  const projects = lang === 'ru' ? russianProjects : englishProjects;
  const index = projects.findIndex(project => project.slug === slug);
  const project = projects[index < 0 ? galleryIndex : index];
  const isWork = view === 'work' || view === 'case';
  const projectPath = (offset = 0, targetView = 'work') => {
    const next = projects[((index < 0 ? galleryIndex : index) + offset + projects.length) % projects.length];
    return routePath(base, lang, targetView, next.slug);
  };
  const canonical = routePath('/me/', lang, view === 'work' ? 'case' : view, slug);
  let title, description, html;
  if (view === 'home') {
    title = words.name + ' · Machine Learning / AI Engineer';
    description = words.description;
    html = `<section class="display-page"><div class="identity heading-reveal">
      <p class="eyeline">Machine Learning / AI Engineer</p><h1 tabindex="-1">${words.name}</h1></div>
      ${action(words.work, routePath(base, lang, 'work', projects[0].slug))}</section>`;
  } else if (view === 'work') {
    title = project.title + ' · ' + words.name;
    description = project.summary;
    html = `<section class="display-page"><div class="gallery-title heading-reveal">
      <p class="eyeline">${project.area}</p><h1 tabindex="-1">${project.title}</h1></div>
      <div class="gallery-controls control-reveal"><nav class="pager" aria-label="${words.browse}">
      <a class="prev" href="${projectPath(-1)}" aria-label="${words.previous}">${arrow}</a>
      <span class="count">${index + 1} / ${projects.length}</span>
      <a href="${projectPath(1)}" aria-label="${words.next}">${arrow}</a></nav>
      ${action(words.open, projectPath(0, 'case'))}</div></section>`;
  } else if (view === 'case') {
    title = project.full + ' · ' + words.name;
    description = project.summary;
    html = `<div class="reading"><article class="heading-reveal">
      <a class="back" href="${projectPath()}">← ${words.back}</a>
      <p class="eyeline">${project.area}</p><h1 tabindex="-1">${project.full}</h1>
      <p class="lede">${project.summary}</p><p class="outcome"><strong>${words.result}</strong>${project.result}</p>
      <div class="links"><a class="text-link" href="${projectPath(1)}">${words.next} →</a></div></article></div>`;
  } else {
    title = words.name + ' · ' + words.profile;
    description = words.description;
    html = `<div class="reading"><article class="profile-copy heading-reveal"><p class="eyeline">${words.profile}</p>
      <h1 tabindex="-1">${words.name}</h1><p class="lede">${words.bio}</p><p class="outcome">${words.lab}</p>
      <div class="links"><a class="text-link" href="mailto:rlohaw@yandex.ru">${words.email} ↗</a>
      <a class="text-link" href="https://t.me/rlohaw" target="_blank" rel="noopener">Telegram ↗</a>
      <a class="text-link" href="https://github.com/Rl0h4w" target="_blank" rel="noopener">GitHub ↗</a>
      <a class="text-link" download="Rostislav-Lokhov-AI-ML-CV.pdf" href="${base}${lang === 'ru' ? 'cv' : 'cv-en'}.pdf">${words.aiResume} ↓</a>
      <a class="text-link" download="Rostislav-Lokhov-Backend-CV.pdf" href="${base}${lang === 'ru' ? 'cv-backend' : 'cv-backend-en'}.pdf">${words.backendResume} ↓</a></div></article></div>`;
  }
  return {
    ...page, words, html, title, description,
    shape: isWork ? project.shape : 0, palette: isWork ? project.palette : 'pearl',
    canonical: 'https://rlohaw.ru' + canonical,
    workPath: projectPath(), homePath: routePath(base, lang), profilePath: routePath(base, lang, 'profile'),
    languagePath: routePath(base, lang === 'ru' ? 'en' : 'ru', view, slug),
    alternates: ['en', 'ru'].map(language => ({
      lang: language, url: 'https://rlohaw.ru' + routePath('/me/', language, view === 'work' ? 'case' : view, slug)
    }))
  };
}
