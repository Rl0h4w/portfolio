import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { allPages, escapeHtml, publicBase, renderPage, resolvePage, routePath } from '../src/exhibit/pages.js';

function renderDocument(template, page, base) {
  const state = renderPage(page, base);
  const { words } = state;
  let html = template.replace(/<html lang="[^"]+">/, `<html lang="${page.lang}">`);
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(state.title)}</title>`);
  for (const [key, value] of Object.entries({
    description: state.description,
    'og:title': state.title,
    'og:description': state.description,
    'og:url': state.canonical
  })) {
    const attribute = key.startsWith('og:') ? 'property' : 'name';
    html = html.replace(new RegExp(`<meta ${attribute}="${key}"[^>]*>`),
      `<meta ${attribute}="${key}" content="${escapeHtml(value)}" />`);
  }
  html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${state.canonical}" />`);
  for (const alternate of state.alternates) {
    html = html.replace(new RegExp(`<link rel="alternate" hreflang="${alternate.lang}"[^>]*>`),
      `<link rel="alternate" hreflang="${alternate.lang}" href="${alternate.url}" />`);
  }
  html = html.replace(/data-view="[^"]+" data-palette="[^"]+"/,
    `data-view="${state.view}" data-palette="${state.palette}"`);
  html = html.replace(/<header class="mast">[\s\S]*?<\/header>/, `<header class="mast">
    <a class="signature" href="${state.homePath}" aria-label="${words.home}">
      <span class="sign" aria-hidden="true"></span><span>rlohaw</span>
    </a>
    <nav aria-label="${words.navigation}">
      <a id="projects-nav" class="nav-link" href="${state.workPath}"${page.view === 'profile' ? '' : ' hidden'}>${words.projects}</a>
      <a id="profile-nav" class="nav-link" href="${state.profilePath}"${page.view === 'profile' ? ' hidden' : ''}>${words.profile} <span aria-hidden="true">↗</span></a>
      <a id="language-nav" class="nav-link" lang="${page.lang === 'ru' ? 'en' : 'ru'}" hreflang="${page.lang === 'ru' ? 'en' : 'ru'}"
        href="${state.languagePath}" aria-label="${page.lang === 'ru' ? 'English version' : 'Русская версия'}">${page.lang === 'ru' ? 'EN' : 'RU'}</a>
      <button class="motion-toggle" type="button" aria-label="${words.pause}" title="${words.pause}"><span aria-hidden="true"></span></button>
    </nav>
  </header>`);
  html = html.replace(/(<div id="sculpture"[^>]*aria-label=")[^"]+/, '$1' + words.interactive);
  html = html.replace(/(<span id="interaction-help"[^>]*>)[^<]*/, '$1' + words.interactionHelp);
  html = html.replace(/(<span class="hint"[^>]*>)[^<]*/, '$1' + words.hint);
  return html.replace('<div id="content"></div>',
    `<div id="content" data-path="${routePath(base, page.lang, page.view, page.slug)}">${state.html}</div>`);
}

function sitemap() {
  const entries = allPages().filter(page => page.view !== 'work').map(page => {
    const { canonical, alternates } = renderPage(page, '/me/');
    const links = alternates.map(alternate =>
      `    <xhtml:link rel="alternate" hreflang="${alternate.lang}" href="${alternate.url}" />`).join('\n');
    return `  <url>\n    <loc>${canonical}</loc>\n${links}\n  </url>`;
  });
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>\n`;
}

export default function prerenderPortfolio() {
  let config;
  return {
    name: 'prerender-portfolio',
    configResolved(value) { config = value; },
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = new URL(request.url, 'http://localhost').pathname;
        if (path === config.base + 'sitemap.xml') {
          response.setHeader('Content-Type', 'application/xml');
          response.end(sitemap());
          return;
        }
        const page = resolvePage(path, config.base);
        if (page && page.view !== 'home') request.url = config.base + (page.lang === 'ru' ? 'ru/' : '') + 'index.html';
        next();
      });
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, context) {
        if (config.command !== 'serve') return html;
        const path = new URL(context.originalUrl || context.path, 'http://localhost').pathname;
        const page = resolvePage(path, config.base);
        return page ? renderDocument(html, page, config.base) : html;
      }
    },
    async writeBundle() {
      const output = resolve(config.root, config.build.outDir);
      const templates = await Promise.all(['index.html', 'ru/index.html'].map(file => readFile(resolve(output, file), 'utf8')));
      for (const page of allPages()) {
        const path = routePath('/', page.lang, page.view, page.slug).slice(1) + 'index.html';
        const file = resolve(output, path);
        await mkdir(dirname(file), { recursive: true });
        await writeFile(file, renderDocument(templates[page.lang === 'ru' ? 1 : 0], page, config.base));
      }
      await writeFile(resolve(output, 'sitemap.xml'), sitemap());
      await writeFile(resolve(output, 'robots.txt'), `User-agent: *\nAllow: /\nSitemap: ${publicBase}sitemap.xml\n`);
    }
  };
}
