import styles from './OtherLanguagesSelect.module.css';
import SectionLabel from '../SectionLabel';

import { OptionObject } from '@/types';
import { useState, useEffect } from 'react';

import { wordResourceKeys } from '@/i18nConfig';

import { Text, Button } from '@/components/atoms';

import { areArraysEqual } from '@/utils/generalUtils';
import { loadWordResourcesClient } from '@/utils/dataUtilsClient';

import { updateLanguageArray } from '@/store/userDataSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { addSingleWordResource, removeSingleWordResource } from '@/store/languageSlice'; 
import { updateIsLanguagesLoading, updateIsOtherLanguagesSelectVisible } from '@/store/languageUiSlice'; 

import { useCustomTranslation } from '@/hooks';
import { InfoIcon, ResetIcon } from '@/public/icons';

const OtherLanguagesSelect: React.FC = () => {
  const dispatch = useAppDispatch()
  const tL = useCustomTranslation('Language');
  const t = useCustomTranslation('Language.OtherLanguagesSelect');

  const languageArray = useAppSelector(state => state.userData.userData.languageArray);
  const isOtherLanguagesSelectVisible = useAppSelector(state => state.languageUi.isOtherLanguagesSelectVisible);

  const options: OptionObject[] = wordResourceKeys[languageArray[0]].map(language => {
    return { key: language, text: tL(language) }
  })

  const [isChanged, setIsChanged] = useState(false);

  const slicedLanguageArray = languageArray.slice(1)
  const [selectedObjectArray, setSelectedObjectArray] = useState(() => (
    slicedLanguageArray.map(language => (
      options.filter(optionObject => optionObject.key === language)[0]
    ))
  ));

  useEffect(() => {
    const objectKeys = selectedObjectArray.map(optionObject => optionObject.key);
    const newLanguageArray = [languageArray[0], ...objectKeys]
    setIsChanged(!areArraysEqual(languageArray, newLanguageArray));
  }, [selectedObjectArray])

  useEffect(() => {
    const slicedLanguageArray = languageArray.slice(1)
    setSelectedObjectArray(
      slicedLanguageArray.map(language => (
        options.filter(optionObject => optionObject.key === language)[0]
      ))
    );
  }, [languageArray])

  const handleToggleSection = () => {
    dispatch(updateIsOtherLanguagesSelectVisible(!isOtherLanguagesSelectVisible));
  }

  const mainSectionClassName = `${styles.mainSection} 
    ${isOtherLanguagesSelectVisible ? styles.mainSectionVisible : ''}`;


  const handleReset = () => {
    const slicedLanguageArray = languageArray.slice(1)
    setSelectedObjectArray(
      slicedLanguageArray.map(language => (
        options.filter(optionObject => optionObject.key === language)[0]
      ))
    );
  }

  const handleApply = async () => {
    const objectKeys = selectedObjectArray.map(obj => obj.key);
    const newLanguageArray = [languageArray[0], ...objectKeys]

    if (areArraysEqual(languageArray, newLanguageArray)) {
      return;
    }
    dispatch(updateIsLanguagesLoading(true));

    languageArray.forEach(language => {
      if (!newLanguageArray.includes(language)) {
        dispatch(removeSingleWordResource(language))
      }
    })

    if (newLanguageArray.some(language => !languageArray.includes(language))) {
      const { requestedWordResources } = await loadWordResourcesClient(languageArray, newLanguageArray)
      if (requestedWordResources) {
        Object.keys(requestedWordResources).forEach(language => {
          dispatch(addSingleWordResource({ language: language, wordResource: requestedWordResources[language] }))
        })
      }
    }
    dispatch(updateLanguageArray(newLanguageArray))
    dispatch(updateIsLanguagesLoading(false));
  }

  const returnOptionClassName = (optionKey: string) => {
    if (optionKey === languageArray[0]) {
      return `${styles.languageOption} ${styles.wordsLanguage}`;
    }
    return `${styles.languageOption} 
      ${selectedObjectArray.some(selected => selected.key === optionKey) 
          ? styles.languageOptionSelected : ''}`;
  };

  const handleSelect = (optionObject: OptionObject) => {
    if (optionObject.key === languageArray[0]) return;
    setSelectedObjectArray(prevArray => {
      if (prevArray.some(selected => selected.key === optionObject.key)) {
        return prevArray.filter(selected => selected.key !== optionObject.key);
      } else {
        return [...prevArray, optionObject];
      }
    });
  };

  const resetIconContainerClassName = `${styles.resetIconContainer} ${isChanged ? styles.resetIconVisible : ''}`;
  const applyButtonClassName = `${styles.applyButton} ${isChanged ? styles.applyButtonReady : ''}`;


  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t('label')}
        isVisible={isOtherLanguagesSelectVisible}
      />
      <section className={mainSectionClassName}>
        <div className={styles.topContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.iconsContainer}>
              <div className={styles.infoIconContainer}>
                <InfoIcon className={styles.infoIcon} /> 
              </div>

              <div className={resetIconContainerClassName} onClick={handleReset}>
                <ResetIcon className={styles.resetIcon} /> 
              </div>
            </div>


            <div className={styles.currentArrayContainer}>
              <Text className={styles.currentLanguage}>{tL(languageArray[0])}</Text>

              {selectedObjectArray.map((optionObject, index) => (
                <Text 
                  key={optionObject.key + index}
                  className={styles.selectedLanguage}
                  onClick={() => handleSelect(optionObject)}
                >
                  {optionObject.text}
                </Text>
              ))}
            </div>
          </div>
            
          <div className={styles.optionsContainer}>
            {options.map((optionObject, index) => (
              <Text 
                key={optionObject.key + index}
                className={returnOptionClassName(optionObject.key)}
                onClick={() => handleSelect(optionObject)}
              >
                {optionObject.text}
              </Text>
            ))}
          </div>
        </div>
        <Button text={t('button')} className={applyButtonClassName} onClick={handleApply} />

      </section>
    </>
  )
}

export default OtherLanguagesSelect;