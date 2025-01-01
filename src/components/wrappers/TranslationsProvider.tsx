'use client';

import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';

type TranslationsProviderProps = {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: Record<string, any>;
};

const TranslationsProvider: React.FC<TranslationsProviderProps> = ({ children, locale, namespaces, resources }) => {
  const i18n = createInstance();

  initTranslations(locale, namespaces, i18n, resources);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}

export default TranslationsProvider;