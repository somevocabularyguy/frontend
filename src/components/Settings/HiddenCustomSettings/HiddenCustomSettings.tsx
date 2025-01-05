import styles from './HiddenCustomSettings.module.css';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeHiddenWordId, removeCustomWordId } from '@/store/userDataSlice';
import { updateIsHiddenCustomSettingsVisible } from '@/store/settingsUiSlice';

import { Text, TText } from '@/components/atoms';
import { DeleteIcon } from '#/public/icons';
import { SectionLabel } from '../reuseable';
import { useCustomTranslation } from '@/hooks';

const HiddenCustomSettings: React.FC = () => {
  const t = useCustomTranslation("Settings.HiddenCustomSettings");
  const dispatch = useAppDispatch();

  const userData = useAppSelector(state => state.userData.userData);
  const wordResources = useAppSelector(state => state.language.wordResources);

  const hiddenWordIds = userData.hiddenWordIds;
  const customWordIds = userData.customWordIds;
  const wordsLanguage = userData.languageArray[0];

  const [hiddenSearchValue, setHiddenSearchValue] = useState('');
  const [customSearchValue, setCustomSearchValue] = useState('');

  const hiddenWordIdsFiltered = hiddenWordIds.filter(wordId => 
    wordResources[wordsLanguage][wordId].word.includes(hiddenSearchValue))
  const customWordIdsFiltered = customWordIds.filter(wordId => 
    wordResources[wordsLanguage][wordId].word.includes(customSearchValue))

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
            {hiddenWordIdsFiltered.length ? 
              hiddenWordIdsFiltered.map(id => (
                <div key={'hidden' + id} className={styles.hiddenCustomWordContainer}>
                  <TText 
                    wordId={id} 
                    dataKey="word" 
                    className={styles.hiddenCustomWordText}
                    highlightKey={hiddenSearchValue}
                  />
                  <DeleteIcon onClick={() => handleRemoveHiddenWord(id)} className={styles.hiddenCustomDeleteIcon} />
                </div> 
              ))
            : hiddenWordIds.length ?
                <Text className={styles.notFoundText}>{t("HiddenSettings.noResultText")}</Text> 
                : <Text className={styles.notFoundText}>{t("HiddenSettings.noHiddenWordsText")} </Text>
            }
          </div>
        </div>

        <div className={styles.hiddenCustomContainer}>
          <Text className={styles.hiddenCustomLabel} as="h3">{t("CustomSettings.removeCustomLabel")}</Text>
          <input 
            className={styles.hiddenCustomSearch}
            placeholder={t("CustomSettings.placeholder")}
            value={customSearchValue}
            onChange={(event) => setCustomSearchValue(event.target.value)}
          />
          <div className={styles.hiddenCustomWordsContainer}>
            {customWordIdsFiltered.length ? 
              customWordIdsFiltered.map(id => (
                <div key={'custom' + id} className={styles.hiddenCustomWordContainer}>
                  <TText 
                    wordId={id} 
                    dataKey="word" 
                    className={styles.hiddenCustomWordText}
                    highlightKey={customSearchValue}
                  />
                  <DeleteIcon onClick={() => handleRemoveCustomWord(id)} className={styles.hiddenCustomDeleteIcon} />
                </div> 
              ))
            : customWordIds.length ?
                <Text className={styles.notFoundText}>{t("CustomSettings.noResultText")}</Text> 
                : <Text className={styles.notFoundText}>{t("CustomSettings.noCustomWordsText")} </Text>
            }
          </div>
        </div>

      </section>
    </>
  )
}

export default HiddenCustomSettings;