"use client"

import React, { ReactNode, useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import initTranslations from '@/app/i18n';
import { createInstance } from 'i18next';

type TranslationsProviderProps = {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources?: Record<string, any>;
  isWords?: boolean;
};

const TranslationsProvider: React.FC<TranslationsProviderProps> = ({ children, locale, namespaces, resources, isWords }) => {
  const [i18n, setI18n] = useState(createInstance());
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeTranslations = async () => {
      await initTranslations(locale, namespaces, i18n, resources, isWords);
      setIsInitialized(true);
    };

    initializeTranslations();
  }, [locale, namespaces]);

  if (!isInitialized) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
};

export default TranslationsProvider;
