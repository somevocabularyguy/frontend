import styles from './ProgressRadios.module.css';
import { useState } from 'react';

import { Word } from '@/types';
import { useCustomTranslation } from '@/hooks';

import { highlightSubtext } from '@/utils/tsxUtils';

import { useAppSelector } from '@/store/store';

interface ProgressRadiosProps {
  wordsMap: Map<string, Word>;
  selectedWordId: string;
  setSelectedWordId: React.Dispatch<React.SetStateAction<string>>;
}

const ProgressRadios: React.FC<ProgressRadiosProps> = ({ wordsMap, selectedWordId, setSelectedWordId }) => {

  const { t } = useCustomTranslation("Progress.ProgressRadios");

  const [wordsDataSearchValue, setWordsDataSearchValue] = useState('');

  const returnClassNameForRadioText = (wordId: string) => {
    let className = styles.radioText; 
    if (selectedWordId === wordId) {
      className += ' ';
      className += styles.radioTextSelected;
    }
    return className;
  }

  const wordsData = useAppSelector(state => state.userData.userData.wordsData); 

  return (
    <section className={styles.radioContainer}>
      <input 
        className={styles.wordsDataSearch}
        placeholder={t("searchPlaceholder")}
        value={wordsDataSearchValue}
        onChange={(event) => setWordsDataSearchValue(event.target.value)}
      />
      <div className={styles.radioTextContainer}>
        {wordsData[0] ? wordsData.map(wordData => {

          const wordObject = wordsMap.get(wordData.id);
          if (!wordObject) return null;

          const wordName = highlightSubtext(wordObject.word, wordsDataSearchValue);
          if (!wordName) return null;          

          return (
            <span
              key={`progressRadioText${wordObject.id}`} 
              className={returnClassNameForRadioText(wordObject.id)} 
              onClick={() => setSelectedWordId(wordObject.id)} 
            >{wordName}</span>
          )
        }) : <h3 className={styles.notFound}>{t("noProgress")}</h3>} 
      </div>
    </section>
  )
}

export default ProgressRadios;