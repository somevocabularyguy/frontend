const i18nConfig = {
  locales: ['en', 'tr'],
  defaultLocale: 'en'
};

interface WordResourceKeysType {
  [key: string]: string[];
}

export const wordResourceKeys: WordResourceKeysType = {
  en: ['en', 'ja', 'ru', 'tr', 'zh']
}

interface LocaleKey {
  [key: string]: string;
}

export const languageNames: LocaleKey = {
  en: 'English',
  tr: 'Türkçe'
}

export default i18nConfig;