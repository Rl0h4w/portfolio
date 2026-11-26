export const russianProjects = [
  {
    slug:'context',shape:1,palette:'lilac',title:'Платформа контекста',
    full:'Контекст для ИИ‑агентов',area:'Т-Банк · Архитектура ML-систем',
    summary:'Спроектировал платформу, которая превращает знания из Confluence в логические схемы. ИИ-агенты получают из них согласованные факты и правила предметной области.',
    result:'В Т-Банке эту архитектуру выбрали целевой. Платформу адаптируют для других доменов.'
  },
  {
    slug:'underwater',shape:2,palette:'tide',title:'Подводное зрение',
    full:'Восстановление подводной съёмки',area:'ЛЭТИ · Computer Vision',
    summary:'Объединил цветокоррекцию, шумоподавление и сверхразрешение в одном пайплайне. Сравнил шесть архитектур на 300 000 подводных кадров.',
    result:'Выбранную модель внедрили в комплекс подводного мониторинга. PSNR вырос на 7,3 дБ, цветовой сдвиг снизился на 30%.'
  },
  {
    slug:'dataknowledge',shape:3,palette:'apricot',title:'DataKnowledge',
    full:'От вопроса к SQL',area:'Т-Банк · DataKnowledge',
    summary:'Разработал приложение, в котором аналитик задаёт вопрос обычными словами и получает результат SQL-запроса. Для каждого домена система подбирает свои схемы, термины и примеры.',
    result:'Запустил сервис в продакшене. Качество SQL проверял на эталонных задачах аналитиков двумя способами — exact match и LLM-as-a-judge.'
  }
];

const englishCopy = [
  {
    title: 'Context platform', full: 'Context for AI agents', area: 'T-Bank · ML systems architecture',
    summary: 'I designed a platform that turns knowledge from Confluence into logical schemas. AI agents use them to retrieve consistent domain facts and rules.',
    result: 'T-Bank selected this architecture as its standard. The platform is being adapted for other domains.'
  },
  {
    title: 'Underwater vision', full: 'Restoring underwater footage', area: 'ETU LETI · Computer Vision',
    summary: 'I combined color correction, denoising and super-resolution in one pipeline and compared six architectures on 300,000 underwater frames.',
    result: 'The selected model was integrated into an underwater monitoring system. PSNR improved by 7.3 dB and color shift fell by 30%.'
  },
  {
    title: 'DataKnowledge', full: 'From question to SQL', area: 'T-Bank · DataKnowledge',
    summary: 'I built an application where analysts ask questions in everyday language and get SQL query results. It retrieves the schemas, terms and examples for each domain.',
    result: 'I launched the service in production and evaluated generated SQL against reference tasks from analysts using exact match and LLM-as-a-judge.'
  }
];

export const englishProjects = russianProjects.map((project, i) => ({ ...project, ...englishCopy[i] }));
