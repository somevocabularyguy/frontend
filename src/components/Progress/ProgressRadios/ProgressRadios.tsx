import styles from './ProgressRadios.module.css';
import { useState } from 'react';

import { Word } from '@/types';
import { useCustomTranslation } from '@/hooks';

import { Text } from '@/components/atoms'; 

import { useAppSelector } from '@/store/store';

interface ProgressRadiosProps {
  wordsMap: Map<string, Word>;
  selectedWordId: string;
  setSelectedWordId: React.Dispatch<React.SetStateAction<string>>;
}


const ProgressRadios: React.FC<ProgressRadiosProps> = ({ wordsMap, selectedWordId, setSelectedWordId }) => {

  const t = useCustomTranslation("Progress.ProgressRadios");

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

  const highlightSubtext = (text: string, subtext: string) => {
    const index = text.toLowerCase().indexOf(subtext.toLowerCase());

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
          if (!wordObject) return;
          if (wordObject.word.toLowerCase().indexOf(wordsDataSearchValue.toLowerCase()) === -1) return;

          const wordName = highlightSubtext(wordObject.word, wordsDataSearchValue);
          
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