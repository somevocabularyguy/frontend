'use client';

import styles from './LanguageDropdown.module.css';
import { useState } from 'react';

import { ArrowIcon } from '@/public/icons';
import { Text } from '@/components/atoms';
import { OptionObject } from '@/types';

import { updateIsLoading } from '@/store/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsLanguageDropdownActive } from '@/store/languageUiSlice';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '@/i18nConfig';

const LanguageDropdown: React.FC = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleLanguageChange = (optionObject: OptionObject) => {
    const newLocale = optionObject.key;

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/;SameSite=Strict`;

    if (newLocale === currentLocale) return;

    dispatch(updateIsLoading(true));
    i18n.changeLanguage(newLocale);

    if (currentLocale === i18nConfig.defaultLocale) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };
  
  const dispatch = useAppDispatch();

  const isLanguageDropdownActive = useAppSelector(state => state.languageUi.isLanguageDropdownActive);

  const languageOptions: OptionObject[] = [
    { key: 'en', text: 'English' },
    { key: 'tr', text: 'Türkçe' }
  ]

  const toggleLanguageDropdown = () => {
    dispatch(updateIsLanguageDropdownActive(!isLanguageDropdownActive));
  }

  const [currentSelection, setCurrentSelection] = useState<OptionObject>(() =>  
    languageOptions.filter(option => option.key === currentLocale)[0]
  ) 

  const dispatchHandler = (optionObject: OptionObject) => {
    handleLanguageChange(optionObject);
    setCurrentSelection(optionObject);
    toggleLanguageDropdown();
  }

  const dropdownButtonStyle = `${styles.dropdownButton} ${isLanguageDropdownActive ? styles.dropdownButtonActive : ''}`;
  const dropdownArrowIconStyle = `${styles.dropdownArrowIcon} ${isLanguageDropdownActive ? styles.dropdownArrowIconActive : ''}`;

  return (
    <div className={styles.container}>
      <div className={dropdownButtonStyle} onClick={toggleLanguageDropdown}>
        <Text className={styles.dropdownButtonText}>{currentSelection.text}</Text>
        <ArrowIcon className={dropdownArrowIconStyle} fill="black" />
      </div>

      {isLanguageDropdownActive &&
        <div className={styles.optionsContainer}>
          {languageOptions.map((optionObject, index) => {
            return (
              <div 
                key={optionObject.key + index} 
                className={styles.option} 
                onClick={() => dispatchHandler(optionObject)}
              >
                <Text className={styles.optionText}>{optionObject.text}</Text>
              </div>
            )
          })}      
        </div>
        }
    </div>
  );
}

export default LanguageDropdown;
