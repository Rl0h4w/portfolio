# Rostislav Lokhov · Portfolio

Двуязычное портфолио с WebGL-сценой на Vite. Английская версия открывается по `https://rlohaw.ru/me/`, русская — по `https://rlohaw.ru/me/ru/`. Ссылка `/me/en/` ведёт на английскую версию. Русское и английское резюме доступны по `/me/cv.pdf` и `/me/cv-en.pdf`.

## Локальный запуск

Требуется Node.js 20 или новее.

```sh
npm ci
PORTFOLIO_BASE=/me/ npm run dev
```

Откройте `http://localhost:5173/me/`. Сборка без переменной `PORTFOLIO_BASE` использует `/portfolio/` для GitHub Pages.

## Публикация

Пуш в основную ветку `main` запускает workflow `Publish portfolio`. Он собирает один и тот же коммит для [GitHub Pages](https://rl0h4w.github.io/portfolio/) с префиксом `/portfolio/` и для [Aeza](https://rlohaw.ru/me/) с префиксом `/me/`. Workflow также доступен для ручного запуска из GitHub Actions.

На московском VPS служба `rlohaw-portfolio-origin` раздаёт статику через Caddy на `127.0.0.1:18177`. Служба `rlohaw-portfolio-tunnel` подключает этот сервер к `rlohaw.ru` через Cloudflare Tunnel. Caddy перенаправляет `/me` и `/me/en` на пути с завершающей косой чертой.

На Aeza workflow передаёт сборку по SSH с ключом окружения `aeza`. Ключ позволяет запустить только приёмник `scripts/receive-aeza-release.py`, установленный на сервере как `/usr/local/sbin/receive-rlohaw-portfolio`. Приёмник проверяет архив, создаёт каталог в `/srv/www/rlohaw.ru/releases/` и атомарно переключает ссылку `/srv/www/rlohaw.ru/current`. Caddy подхватывает обновление без перезапуска. Для отката достаточно вернуть ссылку на предыдущий каталог. Если Cloudflare отдаёт старую версию обновлённого файла, очистите кэш по его URL.

## Контент и резюме

Три избранных кейса на обоих языках находятся в `src/exhibit/projects.js`, интерактивная сцена и стили — в `src/exhibit/`. Полные данные для резюме находятся в `site/content.mjs`.

Общий рендерер `src/exhibit/pages.js` формирует страницы для браузера и сборки. Плагин `scripts/prerender-portfolio.mjs` сохраняет готовый HTML для профиля, галереи и кейсов, а также генерирует `sitemap.xml` с каноническими адресами и языковыми версиями. Например, русский кейс DataKnowledge доступен по `/me/ru/case/dataknowledge/`. Старые ссылки с `#/case/` переводятся на соответствующие адреса при открытии.

PDF собираются из данных резюме. На macOS обновите их после правок опыта, кейсов или контактных данных. Для экспорта нужен Swift из Xcode Command Line Tools.

```sh
swiftc scripts/export-resume.swift -o /tmp/portfolio-export-resume
node scripts/resume-data.mjs ru | /tmp/portfolio-export-resume public/cv.pdf
node scripts/resume-data.mjs en | /tmp/portfolio-export-resume public/cv-en.pdf
PORTFOLIO_BASE=/me/ npm run build
```

Сборка сайта использует готовые PDF и работает на Linux.
