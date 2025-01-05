import styles from './ProgressRadios.module.css';
import { useState } from 'react';

import { useCustomTranslation } from '@/hooks';

import { highlightSubtext } from '@/utils/tsxUtils';
import { Text } from '@/components/atoms';

import { useAppSelector } from '@/store/store';

interface ProgressRadiosProps {
  selectedWordId: string;
  setSelectedWordId: React.Dispatch<React.SetStateAction<string>>;
}

const ProgressRadios: React.FC<ProgressRadiosProps> = ({ selectedWordId, setSelectedWordId }) => {

  const t = useCustomTranslation("Progress.ProgressRadios");

  const [wordsDataSearchValue, setWordsDataSearchValue] = useState('');

  const userData = useAppSelector(state => state.userData.userData); 
  const wordsData = userData.wordsData;

  const wordsLanguage = userData.languageArray[0];
  const wordResources = useAppSelector(state => state.language.wordResources); 

  const filteredWordsData = wordsData.filter(wordData => (
    wordResources[wordsLanguage][wordData.id].word.includes(wordsDataSearchValue)
  ));

  const returnClassNameForRadioText = (wordId: string) => {
    let className = styles.radioText; 
    if (selectedWordId === wordId) {
      className += ' ';
      className += styles.radioTextSelected;
    }
    return className;
  }

  return (
    <section className={styles.radioContainer}>
      <input 
        className={styles.wordsDataSearch}
        placeholder={t("searchPlaceholder")}
        value={wordsDataSearchValue}
        onChange={(event) => setWordsDataSearchValue(event.target.value)}
      />
      <div className={styles.radioTextContainer}>
        {filteredWordsData.length ? filteredWordsData.map(wordData => {

          const word = wordResources[wordsLanguage][wordData.id].word;
          const wordName = highlightSubtext(word, wordsDataSearchValue);
          if (!wordName) return null;          

          return (
            <Text
              key={`progressRadioText${wordData.id}`} 
              className={returnClassNameForRadioText(wordData.id)} 
              onClick={() => setSelectedWordId(wordData.id)} 
            >{wordName}</Text>
          )
        }) : wordsData.length ? 
            <Text as="h3" className={styles.notFound}>{t("noResult")}</Text>
            : <Text as="h3" className={styles.notFound}>{t("noProgress")}</Text>
        } 
      </div>
    </section>
  )
}

export default ProgressRadios;