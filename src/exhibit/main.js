import './exhibit.css';
import { createOptic } from './optic.js';
import { legacyPage, renderPage, resolvePage, routePath, wordsByLanguage } from './pages.js';
import { russianProjects } from './projects.js';
import ring from './assets/poster-0.webp';
import layers from './assets/poster-1.webp';
import wave from './assets/poster-2.webp';
import knot from './assets/poster-3.webp';

const posters = [ring, layers, wave, knot];
const base = import.meta.env.BASE_URL;
const lang = document.documentElement.lang;
const words = wordsByLanguage[lang];
const stage = document.getElementById('sculpture');
const motion = document.querySelector('.motion-toggle');
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
let optic;
let paused = reduced.matches;
let chosenMotion = false;
let currentView = 'home';
let projectIndex = 0;

function updateMotion() {
  optic?.pause(paused);
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

function migrateFragment() {
  if (!location.hash) return;
  const page = legacyPage(location.hash, lang);
  history.replaceState(null, '', routePath(base, lang, page.view, page.slug) + location.search);
}

function render(focus) {
  const page = resolvePage(location.pathname, base) || { lang, view: 'home', slug: '' };
  const index = russianProjects.findIndex(project => project.slug === page.slug);
  if (index >= 0) projectIndex = index;
  const state = renderPage(page, base, projectIndex);
  currentView = state.view;
  document.body.dataset.view = state.view;
  document.body.dataset.palette = state.palette;
  document.querySelector('.signature').href = state.homePath;
  const navWork = document.getElementById('projects-nav');
  navWork.hidden = state.view !== 'profile';
  navWork.href = state.workPath;
  const profileLink = document.getElementById('profile-nav');
  profileLink.hidden = state.view === 'profile';
  profileLink.href = state.profilePath;
  document.getElementById('language-nav').href = state.languagePath;
  if (optic) {
    optic.select(state.shape);
  } else {
    optic = createOptic(stage, i => posters[i], state.shape, words.sculpture);
    updateMotion();
  }

  document.title = state.title;
  document.querySelector('meta[name="description"]').content = state.description;
  document.querySelector('meta[property="og:title"]').content = state.title;
  document.querySelector('meta[property="og:description"]').content = state.description;
  document.querySelector('meta[property="og:url"]').content = state.canonical;
  document.querySelector('link[rel="canonical"]').href = state.canonical;
  for (const alternate of state.alternates) {
    document.querySelector('link[hreflang="' + alternate.lang + '"]').href = alternate.url;
  }

  const content = document.getElementById('content');
  const path = routePath(base, lang, state.view, state.slug);
  content.classList.toggle('navigated', focus);
  if (content.dataset.path !== path || focus) {
    content.innerHTML = state.html;
    content.dataset.path = path;
  }
  window.scrollTo(0, 0);
  if (focus) document.querySelector('h1').focus({ preventScroll: true });
}

function navigate(url) {
  history.pushState(null, '', url);
  render(true);
}

document.addEventListener('click', event => {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
  const link = event.target.closest('a[href]');
  if (!link || link.target || link.hasAttribute('download')) return;
  const url = new URL(link.href);
  const page = resolvePage(url.pathname, base);
  if (url.origin !== location.origin || url.hash || !page || page.lang !== lang) return;
  event.preventDefault();
  if (url.href !== location.href) navigate(url);
});
window.addEventListener('popstate', () => render(true));
window.addEventListener('hashchange', () => {
  migrateFragment();
  render(true);
});
document.addEventListener('keydown', event => {
  if (currentView !== 'work' || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    const index = (projectIndex + (event.key === 'ArrowRight' ? 1 : -1) + russianProjects.length) % russianProjects.length;
    navigate(routePath(base, lang, 'work', russianProjects[index].slug));
  }
});

async function start() {
  try {
    await document.fonts.load('400 1em Inter', 'rlohaw ' + words.name);
  } catch {
    document.documentElement.style.setProperty('--ui-font', 'system-ui');
  }
  migrateFragment();
  render(false);
  requestAnimationFrame(() => document.body.classList.remove('initial-layout'));
}
start();
