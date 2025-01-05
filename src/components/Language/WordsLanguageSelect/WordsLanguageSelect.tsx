import styles from './WordsLanguageSelect.module.css';
import { OptionObject } from '@/types';
import { useState, useEffect } from 'react';

import { updateWords } from '@/store/wordSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsLanguagesLoading, updateIsWordsLanguageSelectVisible } from '@/store/languageUiSlice'; 

import { wordResourceKeys } from '@/i18nConfig';

import { useCustomTranslation } from '@/hooks';

import { getWordResources } from '@/lib/api';

import SectionLabel from '../SectionLabel';
import { Text, Button } from '@/components/atoms';

import { InfoIcon, ResetIcon } from '#/public/icons';

const WordsLanguageSelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const tL = useCustomTranslation('Language');
  const t = useCustomTranslation('Language.WordsLanguageSelect');

  const isWordsLanguageSelectVisible = useAppSelector(state => state.languageUi.isWordsLanguageSelectVisible);
  const languageArray = useAppSelector(state => state.userData.userData.languageArray);

  const handleToggleSection = () => {
    dispatch(updateIsWordsLanguageSelectVisible(!isWordsLanguageSelectVisible));
  }

  const mainSectionClassName = `${styles.mainSection} 
    ${isWordsLanguageSelectVisible ? styles.mainSectionVisible : ''}`;

  const options: OptionObject[] = Object.keys(wordResourceKeys).map(language => {
    return  { key: language, text: tL(language) };
  })

  const [isChanged, setIsChanged] = useState(false);

  const [currentSelection, setCurrentSelection] = useState<OptionObject>(() =>  
    options.filter(option => option.key === languageArray[0])[0]
  )

  useEffect(() => {
      setIsChanged(currentSelection.key !== languageArray[0]);
  }, [currentSelection])

  useEffect(() => {
    setCurrentSelection(options.filter(option => option.key === languageArray[0])[0]);
  }, [languageArray])

  const returnOptionClassName = (key: string) => {
    return `${styles.languageOption} 
      ${key === currentSelection.key ? styles.languageOptionSelected : ''}`
  }

  const handleReset = () => {
    setCurrentSelection(options.filter(option => option.key === languageArray[0])[0])
  }

  const handleApply = async () => {
    if (currentSelection.key === languageArray[0]) return;
    dispatch(updateIsLanguagesLoading(true));

    const { requestedWords } = await getWordResources(languageArray[0], [], currentSelection.key)

    if (requestedWords) {
      dispatch(updateWords(requestedWords))
    }
    dispatch(updateIsLanguagesLoading(false));
  }

  const resetIconContainerClassName = `${styles.resetIconContainer} ${isChanged ? styles.resetIconVisible : ''}`;
  const applyButtonClassName = `${styles.applyButton} ${isChanged ? styles.applyButtonReady : ''}`;

  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t('label')} 
        isVisible={isWordsLanguageSelectVisible}
      />
      <section className={mainSectionClassName}>
        <div className={styles.currentContainer}>
          <div className={styles.infoIconContainer}>
            <InfoIcon className={styles.infoIcon} /> 
          </div>

          <Text className={styles.currentLanguage}>{currentSelection.text}</Text>

          <div className={resetIconContainerClassName} onClick={handleReset}>
            <ResetIcon className={styles.resetIcon} /> 
          </div>
        </div>

        <div className={styles.optionsContainer}>
          {options.map((optionObject, index) => (
            <Text 
              key={optionObject.key + index}
              className={returnOptionClassName(optionObject.key)}
              onClick={() => setCurrentSelection(optionObject)}
            >
              {optionObject.text}
            </Text>
          ))}
        </div>
        <Button text={t('button')} className={applyButtonClassName} onClick={handleApply} />
      </section>
    </>
  )
}

export default WordsLanguageSelect;