/**
 * Translations for all tool titles and descriptions.
 * Used by ToolLayout (auto-detected from pathname) and homepage cards.
 */

export interface ToolI18n {
  title: string;
  desc: string;
}

export const toolTranslations: Record<string, { en: ToolI18n; ru: ToolI18n }> = {
  // ── Text Tools ──
  'word-counter': {
    en: { title: 'Word Counter', desc: 'Count words, characters, sentences, and paragraphs' },
    ru: { title: 'Счётчик слов', desc: 'Подсчёт слов, символов, предложений и абзацев' },
  },
  'case-converter': {
    en: { title: 'Case Converter', desc: 'Convert text to uppercase, lowercase, title case & more' },
    ru: { title: 'Конвертер регистра', desc: 'Верхний, нижний, заглавный регистр и другие' },
  },
  'lorem-ipsum-generator': {
    en: { title: 'Lorem Ipsum Generator', desc: 'Generate placeholder text for your designs' },
    ru: { title: 'Генератор Lorem Ipsum', desc: 'Генерация текста-заполнителя для макетов' },
  },
  'text-diff': {
    en: { title: 'Text Diff', desc: 'Compare two texts and see the differences' },
    ru: { title: 'Сравнение текстов', desc: 'Сравните два текста и увидьте различия' },
  },
  'markdown-preview': {
    en: { title: 'Markdown Preview', desc: 'Write Markdown and see live preview' },
    ru: { title: 'Просмотр Markdown', desc: 'Пишите Markdown и смотрите результат' },
  },
  'text-to-speech': {
    en: { title: 'Text to Speech', desc: 'Convert text to speech with different voices' },
    ru: { title: 'Озвучка текста', desc: 'Озвучивание текста различными голосами' },
  },
  'find-replace': {
    en: { title: 'Find & Replace', desc: 'Find and replace text with regex support' },
    ru: { title: 'Найти и заменить', desc: 'Поиск и замена с поддержкой регулярных выражений' },
  },
  'slug-generator': {
    en: { title: 'Slug Generator', desc: 'Generate URL-friendly slugs from text' },
    ru: { title: 'Генератор слагов', desc: 'Создание URL-дружественных слагов из текста' },
  },
  'text-reverser': {
    en: { title: 'Text Reverser', desc: 'Reverse text, words, or sentences' },
    ru: { title: 'Переворот текста', desc: 'Перевернуть текст, слова или предложения' },
  },
  'character-map': {
    en: { title: 'Character Map', desc: 'Browse and copy special Unicode characters' },
    ru: { title: 'Таблица символов', desc: 'Просмотр и копирование Unicode-символов' },
  },
  'emoji-picker': {
    en: { title: 'Emoji Picker', desc: 'Search and copy emojis quickly' },
    ru: { title: 'Эмодзи', desc: 'Быстрый поиск и копирование эмодзи' },
  },

  // ── Developer Tools ──
  'json-formatter': {
    en: { title: 'JSON Formatter', desc: 'Format, validate, and minify JSON data' },
    ru: { title: 'Форматирование JSON', desc: 'Форматирование, проверка и сжатие JSON' },
  },
  'base64-encoder': {
    en: { title: 'Base64 Encoder/Decoder', desc: 'Encode and decode Base64 strings' },
    ru: { title: 'Base64 кодировщик', desc: 'Кодирование и декодирование Base64' },
  },
  'url-encoder': {
    en: { title: 'URL Encoder/Decoder', desc: 'Encode and decode URL components' },
    ru: { title: 'URL кодировщик', desc: 'Кодирование и декодирование компонентов URL' },
  },
  'hash-generator': {
    en: { title: 'Hash Generator', desc: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes' },
    ru: { title: 'Генератор хешей', desc: 'Генерация хешей MD5, SHA-1, SHA-256, SHA-512' },
  },
  'uuid-generator': {
    en: { title: 'UUID Generator', desc: 'Generate random UUIDs (v4)' },
    ru: { title: 'Генератор UUID', desc: 'Генерация случайных UUID (v4)' },
  },
  'html-prettifier': {
    en: { title: 'HTML Prettifier', desc: 'Format and beautify HTML code' },
    ru: { title: 'Форматирование HTML', desc: 'Форматирование и улучшение HTML-кода' },
  },
  'css-minifier': {
    en: { title: 'CSS Minifier', desc: 'Minify and beautify CSS code' },
    ru: { title: 'CSS минификатор', desc: 'Сжатие и форматирование CSS-кода' },
  },
  'regex-tester': {
    en: { title: 'Regex Tester', desc: 'Test regular expressions with live matches' },
    ru: { title: 'Тестер регулярных выражений', desc: 'Тестирование регулярных выражений в реальном времени' },
  },
  'jwt-decoder': {
    en: { title: 'JWT Decoder', desc: 'Decode and inspect JWT tokens' },
    ru: { title: 'JWT декодер', desc: 'Декодирование и анализ JWT-токенов' },
  },
  'cron-parser': {
    en: { title: 'Cron Parser', desc: 'Parse and explain cron expressions' },
    ru: { title: 'Парсер Cron', desc: 'Разбор и объяснение cron-выражений' },
  },
  'sql-formatter': {
    en: { title: 'SQL Formatter', desc: 'Format and beautify SQL queries' },
    ru: { title: 'Форматирование SQL', desc: 'Форматирование и улучшение SQL-запросов' },
  },
  'code-diff': {
    en: { title: 'Code Diff', desc: 'Compare two code snippets side by side' },
    ru: { title: 'Сравнение кода', desc: 'Сравнение двух фрагментов кода' },
  },

  // ── Security & Privacy ──
  'password-generator': {
    en: { title: 'Password Generator', desc: 'Generate strong, random passwords' },
    ru: { title: 'Генератор паролей', desc: 'Генерация надёжных случайных паролей' },
  },
  'password-strength': {
    en: { title: 'Password Strength Checker', desc: 'Check how strong your password is' },
    ru: { title: 'Проверка надёжности пароля', desc: 'Проверьте насколько надёжен ваш пароль' },
  },
  'ip-address': {
    en: { title: 'IP Address Info', desc: 'View your IP address and network info' },
    ru: { title: 'Информация об IP', desc: 'Ваш IP-адрес и информация о сети' },
  },
  'http-headers': {
    en: { title: 'HTTP Headers Checker', desc: 'View HTTP response headers for any URL' },
    ru: { title: 'Проверка HTTP-заголовков', desc: 'Просмотр HTTP-заголовков ответа' },
  },
  'privacy-policy': {
    en: { title: 'Privacy Policy Generator', desc: 'Generate a privacy policy for your site' },
    ru: { title: 'Генератор политики конфиденциальности', desc: 'Создайте политику конфиденциальности для вашего сайта' },
  },

  // ── Web & SEO ──
  'meta-tag-generator': {
    en: { title: 'Meta Tag Generator', desc: 'Generate HTML meta tags for SEO' },
    ru: { title: 'Генератор мета-тегов', desc: 'Генерация HTML мета-тегов для SEO' },
  },
  'robots-txt-generator': {
    en: { title: 'Robots.txt Generator', desc: 'Create robots.txt for search engines' },
    ru: { title: 'Генератор robots.txt', desc: 'Создание robots.txt для поисковых систем' },
  },
  'sitemap-generator': {
    en: { title: 'Sitemap Generator', desc: 'Generate XML sitemaps for your website' },
    ru: { title: 'Генератор Sitemap', desc: 'Генерация XML-карт сайта' },
  },
  'redirect-checker': {
    en: { title: 'Redirect Checker', desc: 'Check URL redirect chains' },
    ru: { title: 'Проверка редиректов', desc: 'Проверка цепочек перенаправлений URL' },
  },
  'og-preview': {
    en: { title: 'Open Graph Preview', desc: 'Preview social media sharing cards' },
    ru: { title: 'Предпросмотр Open Graph', desc: 'Предпросмотр карточек для соцсетей' },
  },
  'structured-data': {
    en: { title: 'Structured Data Generator', desc: 'Generate JSON-LD structured data' },
    ru: { title: 'Генератор структурированных данных', desc: 'Генерация JSON-LD разметки' },
  },

  // ── Math & Converters ──
  'unit-converter': {
    en: { title: 'Unit Converter', desc: 'Convert between length, weight, temperature & more' },
    ru: { title: 'Конвертер единиц', desc: 'Конвертация длины, веса, температуры и др.' },
  },
  'number-base': {
    en: { title: 'Number Base Converter', desc: 'Convert between binary, hex, decimal, octal' },
    ru: { title: 'Конвертер систем счисления', desc: 'Перевод между двоичной, 16-ричной, десятичной, 8-ричной' },
  },
  'percentage-calculator': {
    en: { title: 'Percentage Calculator', desc: 'Calculate percentages easily' },
    ru: { title: 'Калькулятор процентов', desc: 'Простой расчёт процентов' },
  },
  'bmi-calculator': {
    en: { title: 'BMI Calculator', desc: 'Calculate your Body Mass Index' },
    ru: { title: 'Калькулятор ИМТ', desc: 'Рассчитайте индекс массы тела' },
  },
  'tip-calculator': {
    en: { title: 'Tip Calculator', desc: 'Calculate tips and split bills' },
    ru: { title: 'Калькулятор чаевых', desc: 'Расчёт чаевых и деление счёта' },
  },

  // ── Media & Files ──
  'image-to-base64': {
    en: { title: 'Image to Base64', desc: 'Convert images to Base64 data URIs' },
    ru: { title: 'Изображение в Base64', desc: 'Конвертация изображений в Base64' },
  },
  'svg-to-png': {
    en: { title: 'SVG to PNG', desc: 'Convert SVG files to PNG images' },
    ru: { title: 'SVG в PNG', desc: 'Конвертация SVG-файлов в PNG' },
  },
  'image-compressor': {
    en: { title: 'Image Compressor', desc: 'Compress images in your browser' },
    ru: { title: 'Сжатие изображений', desc: 'Сжимайте изображения прямо в браузере' },
  },
  'favicon-generator': {
    en: { title: 'Favicon Generator', desc: 'Generate favicons from images' },
    ru: { title: 'Генератор favicon', desc: 'Создание favicon из изображений' },
  },
  'pdf-page-counter': {
    en: { title: 'PDF Page Counter', desc: 'Count pages in PDF files' },
    ru: { title: 'Счётчик страниц PDF', desc: 'Подсчёт страниц в PDF-файлах' },
  },

  // ── Content & Writing ──
  'title-case': {
    en: { title: 'Title Case Converter', desc: 'Capitalize titles following proper rules' },
    ru: { title: 'Конвертер заголовков', desc: 'Правильное написание заглавных букв в заголовках' },
  },
  'plagiarism-hash': {
    en: { title: 'Plagiarism Hash', desc: 'Generate content fingerprints for plagiarism checking' },
    ru: { title: 'Хеш-отпечаток текста', desc: 'Генерация отпечатков контента для проверки на плагиат' },
  },
  'readability-score': {
    en: { title: 'Readability Score', desc: 'Calculate Flesch-Kincaid readability score' },
    ru: { title: 'Оценка читабельности', desc: 'Расчёт индекса удобочитаемости Flesch-Kincaid' },
  },
  'headline-analyzer': {
    en: { title: 'Headline Analyzer', desc: 'Analyze and score your headlines' },
    ru: { title: 'Анализ заголовков', desc: 'Анализ и оценка ваших заголовков' },
  },
  'word-frequency': {
    en: { title: 'Word Frequency Counter', desc: 'Count word frequency in any text' },
    ru: { title: 'Частота слов', desc: 'Подсчёт частоты слов в тексте' },
  },
  'random-quote': {
    en: { title: 'Random Quote Generator', desc: 'Get random inspiring quotes' },
    ru: { title: 'Генератор цитат', desc: 'Случайные вдохновляющие цитаты' },
  },
  'plagiarism-checker': {
    en: { title: 'Plagiarism Checker', desc: 'Analyze text for originality and duplicate fragments' },
    ru: { title: 'Проверка на плагиат', desc: 'Анализ текста на оригинальность и дублирование' },
  },
  'ai-content-detector': {
    en: { title: 'AI Content Detector', desc: 'Detect AI-generated text with statistical analysis' },
    ru: { title: 'Детектор ИИ-контента', desc: 'Определение текста, сгенерированного ИИ' },
  },

  // ── Design & CSS ──
  'color-picker': {
    en: { title: 'Color Picker', desc: 'Pick colors and convert HEX, RGB, HSL' },
    ru: { title: 'Палитра цветов', desc: 'Выбор цветов и конвертация HEX, RGB, HSL' },
  },
  'gradient-generator': {
    en: { title: 'Gradient Generator', desc: 'Create beautiful CSS gradients' },
    ru: { title: 'Генератор градиентов', desc: 'Создание красивых CSS-градиентов' },
  },
  'box-shadow': {
    en: { title: 'Box Shadow Generator', desc: 'Generate CSS box shadows visually' },
    ru: { title: 'Генератор теней', desc: 'Визуальная генерация CSS box-shadow' },
  },
  'border-radius': {
    en: { title: 'Border Radius Generator', desc: 'Create custom border radius values' },
    ru: { title: 'Генератор border-radius', desc: 'Создание пользовательских border-radius' },
  },
  'css-grid': {
    en: { title: 'CSS Grid Generator', desc: 'Build CSS grid layouts visually' },
    ru: { title: 'Генератор CSS Grid', desc: 'Визуальное построение CSS-сеток' },
  },
  'glassmorphism': {
    en: { title: 'Glassmorphism Generator', desc: 'Create frosted glass CSS effects' },
    ru: { title: 'Генератор стеклоэффекта', desc: 'Создание эффекта матового стекла в CSS' },
  },
  'neumorphism': {
    en: { title: 'Neumorphism Generator', desc: 'Create soft UI / neumorphic effects' },
    ru: { title: 'Генератор неоморфизма', desc: 'Создание мягких UI-эффектов' },
  },
  'font-pairing': {
    en: { title: 'Font Pairing', desc: 'Find beautiful font combinations' },
    ru: { title: 'Подбор шрифтов', desc: 'Красивые сочетания шрифтов' },
  },
  'contrast-checker': {
    en: { title: 'Contrast Checker', desc: 'Check WCAG color contrast ratios' },
    ru: { title: 'Проверка контраста', desc: 'Проверка контрастности цветов по WCAG' },
  },

  // ── Crypto & Encoding ──
  'morse-code': {
    en: { title: 'Morse Code', desc: 'Translate text to Morse code and back' },
    ru: { title: 'Азбука Морзе', desc: 'Перевод текста в код Морзе и обратно' },
  },
  'rot13': {
    en: { title: 'ROT13 Encoder', desc: 'Apply ROT13 letter substitution cipher' },
    ru: { title: 'Шифр ROT13', desc: 'Шифрование подстановкой ROT13' },
  },
  'caesar-cipher': {
    en: { title: 'Caesar Cipher', desc: 'Encrypt/decrypt with Caesar shift cipher' },
    ru: { title: 'Шифр Цезаря', desc: 'Шифрование/дешифрование шифром Цезаря' },
  },
  'binary-translator': {
    en: { title: 'Binary Translator', desc: 'Convert text to binary and back' },
    ru: { title: 'Двоичный переводчик', desc: 'Перевод текста в двоичный код и обратно' },
  },
  'nato-phonetic': {
    en: { title: 'NATO Phonetic', desc: 'Convert text to NATO phonetic alphabet' },
    ru: { title: 'Алфавит НАТО', desc: 'Перевод текста в фонетический алфавит НАТО' },
  },
  'punycode': {
    en: { title: 'Punycode Converter', desc: 'Encode/decode international domain names' },
    ru: { title: 'Punycode конвертер', desc: 'Кодирование/декодирование интернационализированных доменов' },
  },

  // ── Math & Science ──
  'scientific-calculator': {
    en: { title: 'Scientific Calculator', desc: 'Advanced calculator with scientific functions' },
    ru: { title: 'Научный калькулятор', desc: 'Продвинутый калькулятор с научными функциями' },
  },
  'matrix-calculator': {
    en: { title: 'Matrix Calculator', desc: 'Perform matrix operations' },
    ru: { title: 'Матричный калькулятор', desc: 'Операции с матрицами' },
  },
  'statistics-calculator': {
    en: { title: 'Statistics Calculator', desc: 'Calculate mean, median, mode, std deviation' },
    ru: { title: 'Статистический калькулятор', desc: 'Среднее, медиана, мода, стандартное отклонение' },
  },
  'aspect-ratio': {
    en: { title: 'Aspect Ratio Calculator', desc: 'Calculate and resize aspect ratios' },
    ru: { title: 'Калькулятор пропорций', desc: 'Расчёт и изменение соотношения сторон' },
  },
  'byte-converter': {
    en: { title: 'Byte Converter', desc: 'Convert between bytes, KB, MB, GB, TB' },
    ru: { title: 'Конвертер байтов', desc: 'Конвертация байтов, КБ, МБ, ГБ, ТБ' },
  },
  'roman-numeral': {
    en: { title: 'Roman Numeral Converter', desc: 'Convert between Roman and Arabic numerals' },
    ru: { title: 'Римские цифры', desc: 'Конвертация между римскими и арабскими цифрами' },
  },

  // ── Productivity ──
  'invoice-generator': {
    en: { title: 'Invoice Generator', desc: 'Create and print professional invoices' },
    ru: { title: 'Генератор счетов', desc: 'Создание и печать профессиональных счетов' },
  },
  'lorem-picsum': {
    en: { title: 'Lorem Picsum', desc: 'Generate placeholder images with custom sizes' },
    ru: { title: 'Lorem Picsum', desc: 'Генерация изображений-заполнителей нужного размера' },
  },
  'kanban-board': {
    en: { title: 'Kanban Board', desc: 'Simple drag & drop task board' },
    ru: { title: 'Канбан-доска', desc: 'Простая доска задач с перетаскиванием' },
  },
  'habit-tracker': {
    en: { title: 'Habit Tracker', desc: 'Track daily habits with visual calendar' },
    ru: { title: 'Трекер привычек', desc: 'Отслеживание привычек с визуальным календарём' },
  },
  'expense-tracker': {
    en: { title: 'Expense Tracker', desc: 'Track expenses by category' },
    ru: { title: 'Учёт расходов', desc: 'Отслеживание расходов по категориям' },
  },
  'meeting-cost': {
    en: { title: 'Meeting Cost Calculator', desc: 'Calculate meeting cost in real-time' },
    ru: { title: 'Стоимость совещания', desc: 'Расчёт стоимости совещания в реальном времени' },
  },
  'presentation-generator': {
    en: { title: 'Presentation Generator', desc: 'Generate presentations on any topic with templates' },
    ru: { title: 'Генератор презентаций', desc: 'Создание презентаций на любую тему по шаблонам' },
  },

  // ── Fun & Games ──
  'random-number': {
    en: { title: 'Random Number Generator', desc: 'Generate random numbers with options' },
    ru: { title: 'Генератор случайных чисел', desc: 'Генерация случайных чисел с настройками' },
  },
  'coin-dice': {
    en: { title: 'Coin Flip & Dice', desc: 'Flip coins and roll dice' },
    ru: { title: 'Монетка и кубик', desc: 'Подбрасывание монеты и кубика' },
  },
  'typing-speed-test': {
    en: { title: 'Typing Speed Test', desc: 'Test your typing speed (WPM)' },
    ru: { title: 'Тест скорости набора', desc: 'Проверьте скорость печати (WPM)' },
  },
  'reaction-time-test': {
    en: { title: 'Reaction Time Test', desc: 'Test your reaction time in milliseconds' },
    ru: { title: 'Тест реакции', desc: 'Проверьте скорость реакции в миллисекундах' },
  },
  'screen-resolution': {
    en: { title: 'Screen Resolution', desc: 'Detect screen and viewport dimensions' },
    ru: { title: 'Разрешение экрана', desc: 'Определение размеров экрана и области просмотра' },
  },
  'fake-data-generator': {
    en: { title: 'Fake Data Generator', desc: 'Generate realistic test data' },
    ru: { title: 'Генератор тестовых данных', desc: 'Генерация реалистичных тестовых данных' },
  },
  'wifi-qr-generator': {
    en: { title: 'WiFi QR Generator', desc: 'Create QR codes for WiFi sharing' },
    ru: { title: 'WiFi QR-генератор', desc: 'Создание QR-кодов для подключения к WiFi' },
  },
  'meme-text-generator': {
    en: { title: 'Meme Text Generator', desc: 'Add meme text to images' },
    ru: { title: 'Генератор мемов', desc: 'Добавление текста мемов к изображениям' },
  },

  // ── Data Converters ──
  'json-to-csv': {
    en: { title: 'JSON to CSV', desc: 'Convert JSON arrays to CSV format' },
    ru: { title: 'JSON в CSV', desc: 'Конвертация JSON-массивов в CSV' },
  },
  'csv-to-json': {
    en: { title: 'CSV to JSON', desc: 'Convert CSV data to JSON arrays' },
    ru: { title: 'CSV в JSON', desc: 'Конвертация CSV-данных в JSON' },
  },
  'json-to-yaml': {
    en: { title: 'JSON to YAML', desc: 'Convert JSON to YAML and back' },
    ru: { title: 'JSON в YAML', desc: 'Конвертация JSON в YAML и обратно' },
  },
  'json-to-typescript': {
    en: { title: 'JSON to TypeScript', desc: 'Generate TypeScript interfaces from JSON' },
    ru: { title: 'JSON в TypeScript', desc: 'Генерация TypeScript-интерфейсов из JSON' },
  },
  'html-entity': {
    en: { title: 'HTML Entity Encoder', desc: 'Encode and decode HTML entities' },
    ru: { title: 'HTML-сущности', desc: 'Кодирование и декодирование HTML-сущностей' },
  },
  'markdown-table': {
    en: { title: 'Markdown Table Generator', desc: 'Create Markdown tables visually' },
    ru: { title: 'Генератор Markdown-таблиц', desc: 'Визуальное создание таблиц в Markdown' },
  },

  // ── Utilities ──
  'qr-code-generator': {
    en: { title: 'QR Code Generator', desc: 'Generate QR codes for any text or URL' },
    ru: { title: 'Генератор QR-кодов', desc: 'Генерация QR-кодов для текста или URL' },
  },
  'timestamp-converter': {
    en: { title: 'Timestamp Converter', desc: 'Convert between Unix timestamps and dates' },
    ru: { title: 'Конвертер временных меток', desc: 'Конвертация Unix-временных меток и дат' },
  },
};

/**
 * Get translated tool title/description by slug and locale.
 * Falls back to English if no translation found.
 */
export function getToolI18n(slug: string, locale: 'en' | 'ru'): ToolI18n {
  const t = toolTranslations[slug];
  if (!t) return { title: slug, desc: '' };
  return t[locale] || t.en;
}
