const i18nConfig = {
  locales: ['en', 'ru', 'ja', 'zh', 'tr', 'de', 'es', 'fr', 'hi', 'ko', 'pt', 'vi'],
  defaultLocale: 'en'
};

interface WordResourceKeysType {
  [key: string]: string[];
}

export const wordResourceKeys: WordResourceKeysType = {
  en: ['en', 'ru', 'ja', 'zh', 'tr', 'de', 'es', 'fr', 'hi', 'ko', 'pt', 'vi']
}

interface LocaleKey {
  [key: string]: string;
}

export const languageNames: LocaleKey = {
  en: 'English',
  ru: 'Русский',
  ja: '日本語',
  zh: '中国人',
  tr: 'Türkçe',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी',
  ko: '한국어',
  pt: 'Português',
  vi: 'Tiếng Việt',
}

export default i18nConfig;