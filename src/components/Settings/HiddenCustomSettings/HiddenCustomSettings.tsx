import styles from './HiddenCustomSettings.module.css';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeHiddenWordId, removeCustomWordId } from '@/store/userDataSlice';
import { updateIsHiddenCustomSettingsVisible } from '@/store/settingsUiSlice';

import { Text } from '@/components/atoms';
import { DeleteIcon } from '@/public/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';

import { highlightSubtext } from '@/utils/tsxUtils';

const HiddenCustomSettings: React.FC = () => {
  const { t } = useCustomTranslation("Settings.HiddenCustomSettings");
  const dispatch = useAppDispatch();

  const words = useAppSelector(state => state.data.words);
  const userData = useAppSelector(state => state.userData.userData);

  const hiddenWordIdsSet = new Set(userData.hiddenWordIds);
  const customWordIdsSet = new Set(userData.customWordIds);

  const [hiddenSearchValue, setHiddenSearchValue] = useState('');
  const [customSearchValue, setCustomSearchValue] = useState('');

  const hiddenWords = words.filter(wordObject => hiddenWordIdsSet.has(wordObject.id));
  const customWords = words.filter(wordObject => customWordIdsSet.has(wordObject.id));

  const hiddenWordsFiltered = hiddenWords.filter(wordObject => wordObject.word.indexOf(hiddenSearchValue) !== -1)
  const customWordsFiltered = customWords.filter(wordObject => wordObject.word.indexOf(customSearchValue) !== -1)


  const handleRemoveHiddenWord = (wordId: string) => {
    dispatch(removeHiddenWordId(wordId));
  }

  const handleRemoveCustomWord = (wordId: string) => {
    dispatch(removeCustomWordId(wordId));
  }

  const isHiddenCustomSettingsVisible = useAppSelector(state => state.settingsUi.isHiddenCustomSettingsVisible);



  const hiddenCustomSectionClassName = `${styles.hiddenCustomSection} 
    ${isHiddenCustomSettingsVisible ? styles.hiddenCustomSectionVisible : ''}`;

  const handleToggleSection = () => {
    dispatch(updateIsHiddenCustomSettingsVisible(!isHiddenCustomSettingsVisible))
  }

  return (
    <>
      <SectionLabel 
        handleToggleSection={handleToggleSection} 
        labelText={t("labelText")}
        isVisible={isHiddenCustomSettingsVisible} 
      />
      
      <section className={hiddenCustomSectionClassName}>

        <div className={styles.hiddenCustomContainer}>
          <Text className={styles.hiddenCustomLabel} as="h3">{t("HiddenSettings.removeHiddenLabel")}</Text>
          <input 
            className={styles.hiddenCustomSearch}
            placeholder={t("HiddenSettings.placeholder")}
            value={hiddenSearchValue}
            onChange={(event) => setHiddenSearchValue(event.target.value)}
          />
          <div className={styles.hiddenCustomWordsContainer}>
            {
              hiddenWordsFiltered.length ? 
                hiddenWordsFiltered.map(wordObject => {
                  const highlightedWord = highlightSubtext(wordObject.word, hiddenSearchValue)
                  if (!highlightedWord) return null;
                  return (
                    <div key={'hidden' + wordObject.id} className={styles.hiddenCustomWordContainer}>
                      <span className={styles.hiddenCustomWordText}>{highlightedWord}</span>
                      <DeleteIcon onClick={() => handleRemoveHiddenWord(wordObject.id)} className={styles.hiddenCustomDeleteIcon} />
                    </div> 
                  )
                })
              : hiddenWords.length ?
                  <Text className={styles.notFoundText}>{t("HiddenSettings.noWordsText")}</Text> 
                  : <Text className={styles.notFoundText}>{t("HiddenSettings.noHiddenWordsText")} </Text>
            }
          </div>
        </div>

        <div className={styles.hiddenCustomContainer}>
          <Text className={styles.hiddenCustomLabel} as="h3">{t("CustomSettings.removeCustomLabel")} </Text>
          <input 
            className={styles.hiddenCustomSearch}
            placeholder={t("CustomSettings.placeholder")}
            value={customSearchValue}
            onChange={(event) => setCustomSearchValue(event.target.value)}
          />
          <div className={styles.hiddenCustomWordsContainer}>
            {
              customWordsFiltered.length ? 
                customWordsFiltered.map(wordObject => {
                  const highlightedWord = highlightSubtext(wordObject.word, customSearchValue)
                  if (!highlightedWord) return null;
                  return (
                    <div key={'custom' + wordObject.id} className={styles.hiddenCustomWordContainer}>
                      <span className={styles.hiddenCustomWordText}>{highlightedWord}</span>
                      <DeleteIcon onClick={() => handleRemoveCustomWord(wordObject.id)} className={styles.hiddenCustomDeleteIcon} />
                    </div> 
                  )
                })
              : hiddenWords.length ?
                  <Text className={styles.notFoundText}>{t("CustomSettings.noWordsText")}</Text> 
                  : <Text className={styles.notFoundText}>{t("CustomSettings.noCustomWordsText")}</Text>
            }
          </div>
        </div>

      </section>
    </>
  )
}

export default HiddenCustomSettings;