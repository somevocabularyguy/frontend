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

export default i18nConfig;