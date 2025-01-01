import styles from './HiddenCustomSettings.module.css';
import { useState } from 'react';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { removeHiddenWordId, removeCustomWordId } from '@/store/userDataSlice';
import { updateIsHiddenCustomSettingsVisible } from '@/store/settingsUiSlice';

import { Text } from '@/components/atoms';
import { DeleteIcon } from '@/public/icons';
import { SectionLabel } from '../reuseable';

const HiddenCustomSettings: React.FC = () => {
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

  const highlightSubtext = (text: string, subtext: string) => {
    const index = text.indexOf(subtext);

    const before = text.slice(0, index);
    const match = text.slice(index, index + subtext.length);
    const after = text.slice(index + subtext.length);

    return (
      <>
        {before}
        <Text text={match} className={styles.highlightedSubtext} as="span" />
        {after}
      </>
    );
  }; 

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
        labelText="Hidden And Custom Words" 
        isVisible={isHiddenCustomSettingsVisible} 
      />
      
      <section className={hiddenCustomSectionClassName}>

        <div className={styles.hiddenCustomContainer}>
          <Text className={styles.hiddenCustomLabel} text="Remove From Hidden" as="h3"/>
          <input 
            className={styles.hiddenCustomSearch}
            placeholder="Search Word..."
            value={hiddenSearchValue}
            onChange={(event) => setHiddenSearchValue(event.target.value)}
          />
          <div className={styles.hiddenCustomWordsContainer}>
            {
              hiddenWordsFiltered.length ? 
                hiddenWordsFiltered.map(wordObject => {
                  const highlightedWord = highlightSubtext(wordObject.word, hiddenSearchValue)
                  return (
                    <div key={'hidden' + wordObject.id} className={styles.hiddenCustomWordContainer}>
                      <span className={styles.hiddenCustomWordText}>{highlightedWord}</span>
                      <DeleteIcon onClick={() => handleRemoveHiddenWord(wordObject.id)} className={styles.hiddenCustomDeleteIcon} />
                    </div> 
                  )
                })
              : hiddenWords.length ?
                  <Text text="No Words Found With Your Search" className={styles.notFoundText} /> 
                  : <Text text="No Hidden Words" className={styles.notFoundText} />
            }
          </div>
        </div>

        <div className={styles.hiddenCustomContainer}>
          <Text className={styles.hiddenCustomLabel} text="Remove From Custom" as="h3"/>
          <input 
            className={styles.hiddenCustomSearch}
            placeholder="Search Word..."
            value={customSearchValue}
            onChange={(event) => setCustomSearchValue(event.target.value)}
          />
          <div className={styles.hiddenCustomWordsContainer}>
            {
              customWordsFiltered.length ? 
                customWordsFiltered.map(wordObject => {
                  const highlightedWord = highlightSubtext(wordObject.word, customSearchValue)
                  return (
                    <div key={'custom' + wordObject.id} className={styles.hiddenCustomWordContainer}>
                      <span className={styles.hiddenCustomWordText}>{highlightedWord}</span>
                      <DeleteIcon onClick={() => handleRemoveCustomWord(wordObject.id)} className={styles.hiddenCustomDeleteIcon} />
                    </div> 
                  )
                })
              : hiddenWords.length ?
                  <Text text="No Words Found With Your Search" className={styles.notFoundText} /> 
                  : <Text text="No Custom Words" className={styles.notFoundText} />
            }
          </div>
        </div>

      </section>
    </>
  )
}

export default HiddenCustomSettings;