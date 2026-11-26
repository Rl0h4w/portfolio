import './exhibit.css';
import { createOptic } from './optic.js';
import { russianProjects, englishProjects } from './projects.js';
import ring from './assets/poster-0.webp';
import layers from './assets/poster-1.webp';
import wave from './assets/poster-2.webp';
import knot from './assets/poster-3.webp';

const posters = [ring, layers, wave, knot];
const base = import.meta.env.BASE_URL;
const ru = document.documentElement.lang === 'ru';
const projects = ru ? russianProjects : englishProjects;
const words = ru ? {
  name: 'Ростислав Лохов', profile: 'Профиль', work: 'Смотреть работы', open: 'О проекте',
  back: 'К работам', result: 'Результат', next: 'Следующая работа', previous: 'Предыдущая работа',
  browse: 'Листать работы', resume: 'Резюме', email: 'Почта', play: 'Включить движение',
  pause: 'Приостановить движение', sculpture: 'Оптическая скульптура',
  bio: 'Проектирую платформы для ИИ-агентов в Т-Банке. Веду бэкенд на Go и Python от архитектуры до запуска.',
  lab: 'До Т-Банка занимался восстановлением подводной съёмки в лаборатории ЛЭТИ.'
} : {
  name: 'Rostislav Lokhov', profile: 'Profile', work: 'Explore my work', open: 'View case',
  back: 'Back to work', result: 'Result', next: 'Next project', previous: 'Previous project',
  browse: 'Browse projects', resume: 'Résumé', email: 'Email', play: 'Enable motion',
  pause: 'Pause motion', sculpture: 'Optical sculpture',
  bio: 'I design platforms for AI agents at T-Bank and lead backend development in Go and Python from architecture to launch.',
  lab: 'Before T-Bank, I worked on underwater image restoration at the ETU LETI research lab.'
};

const stage = document.getElementById('sculpture');
const motion = document.querySelector('.motion-toggle');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const arrow = '<span class="circle" aria-hidden="true"><span class="arr"></span></span>';
let optic;
let paused = reduced.matches;
let chosenMotion = false;
let currentView = 'home';
let projectIndex = 0;

function projectPath(index, view = 'work') {
  const project = projects[(index + projects.length) % projects.length];
  return '#/' + view + '/' + project.slug;
}
function action(label, href) {
  return `<a class="action control-reveal" href="${href}"><span>${label}</span>${arrow}</a>`;
}
function updateMotion() {
  optic.pause(paused);
  document.body.classList.toggle('still', paused);
  motion.dataset.paused = String(paused);
  motion.title = paused ? words.play : words.pause;
  motion.setAttribute('aria-label', motion.title);
}
motion.addEventListener('click', () => {
  chosenMotion = true;
  paused = !paused;
  updateMotion();
});
reduced.addEventListener('change', () => {
  if (!chosenMotion) {
    paused = reduced.matches;
    updateMotion();
  }
});

function galleryNav(index) {
  return `<nav class="pager" aria-label="${words.browse}">
    <a class="prev" href="${projectPath(index - 1)}" aria-label="${words.previous}">${arrow}</a>
    <span class="count">${index + 1} / ${projects.length}</span>
    <a href="${projectPath(index + 1)}" aria-label="${words.next}">${arrow}</a></nav>`;
}

function render(focus) {
  const [section, slug] = location.hash.replace(/^#\/?/, '').split('/');
  const index = projects.findIndex(project => project.slug === slug);
  let view = section || 'home';
  if (['about', 'experience', 'skills', 'contact'].includes(view)) view = 'profile';
  if (view === 'projects') view = 'work';
  if (!['home','work','case','profile'].includes(view) ||
      (section !== 'projects' && ['work','case'].includes(view) && index < 0)) view = 'home';
  if (index >= 0) projectIndex = index;
  const project = projects[projectIndex];
  const isWork = view === 'work' || view === 'case';
  currentView = view;
  document.body.dataset.view = view;
  document.body.dataset.palette = isWork ? project.palette : 'pearl';
  const navWork = document.getElementById('projects-nav');
  navWork.hidden = view !== 'profile';
  navWork.href = projectPath(projectIndex);
  document.getElementById('profile-nav').hidden = view === 'profile';
  document.getElementById('language-nav').href = base + (ru ? '' : 'ru/') + location.hash;
  const shape = isWork ? project.shape : 0;
  if (optic) {
    optic.select(shape);
  } else {
    optic = createOptic(stage, i => posters[i], shape, words.sculpture);
    updateMotion();
  }

  let html, title;
  if (view === 'home') {
    title = words.name;
    html = `<section class="display-page"><div class="identity heading-reveal">
      <p class="eyeline">Machine Learning / AI Engineer</p><h1 tabindex="-1">${title}</h1></div>
      ${action(words.work, projectPath(0))}</section>`;
  } else if (view === 'work') {
    title = project.title;
    html = `<section class="display-page"><div class="gallery-title heading-reveal">
      <p class="eyeline">${project.area}</p><h1 tabindex="-1">${title}</h1></div>
      <div class="gallery-controls control-reveal">${galleryNav(projectIndex)}${action(words.open, projectPath(projectIndex, 'case'))}</div></section>`;
  } else if (view === 'case') {
    title = project.full;
    html = `<div class="reading"><article class="heading-reveal">
      <a class="back" href="${projectPath(projectIndex)}">← ${words.back}</a>
      <p class="eyeline">${project.area}</p><h1 tabindex="-1">${title}</h1>
      <p class="lede">${project.summary}</p><p class="outcome"><strong>${words.result}</strong>${project.result}</p>
      <div class="links"><a class="text-link" href="${projectPath(projectIndex + 1)}">${words.next} →</a></div></article></div>`;
  } else {
    title = words.profile;
    html = `<div class="reading"><article class="profile-copy heading-reveal"><p class="eyeline">${title}</p>
      <h1 tabindex="-1">${words.name}</h1><p class="lede">${words.bio}</p><p class="outcome">${words.lab}</p>
      <div class="links"><a class="text-link" href="mailto:rlohaw@yandex.ru">${words.email} ↗</a>
      <a class="text-link" href="https://t.me/rlohaw" target="_blank" rel="noopener">Telegram ↗</a>
      <a class="text-link" href="https://github.com/Rl0h4w" target="_blank" rel="noopener">GitHub ↗</a>
      <a class="text-link" download="Rostislav-Lokhov-CV.pdf" href="${base}${ru ? 'cv' : 'cv-en'}.pdf">${words.resume} ↓</a></div></article></div>`;
  }
  document.title = title + ' · rlohaw';
  document.getElementById('content').innerHTML = html;
  window.scrollTo(0,0);
  if (focus) document.querySelector('h1').focus({preventScroll:true});
}

window.addEventListener('hashchange', () => render(true));
document.addEventListener('keydown', event => {
  if (currentView !== 'work' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    location.hash = projectPath(projectIndex + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
render(false);
requestAnimationFrame(() => document.body.classList.remove('initial-layout'));
