import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next/initReactI18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import i18nConfig from '@/i18nConfig';

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: ReturnType<typeof createInstance>,
  resources?: Record<string, any>,
  isWords?: boolean
) {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: string, namespace: string[]) => {
          let translationFile;
          if (isWords) {
            translationFile = import(`@/locales/words/${language}/${namespace}.json`);
          } else {
            translationFile = import(`@/locales/${language}/${namespace}.json`);
          }
          return translationFile;
        }
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales
  });

  return {
    i18n: i18nInstance,
    resources: i18nInstance.services.resourceStore.data,
    t: i18nInstance.t
  };
}
