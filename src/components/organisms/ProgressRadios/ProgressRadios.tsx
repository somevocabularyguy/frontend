import styles from './ProgressRadios.module.css';

import { Word } from '@/types';

import { Text } from '@/components/atoms'; 

import { useAppSelector } from '@/store/store';

interface ProgressRadiosProps {
  wordsMap: Map<string, Word>;
  selectedWordId: string;
  setSelectedWordId: React.Dispatch<React.SetStateAction<string>>;
}

const ProgressRadios: React.FC<ProgressRadiosProps> = ({ wordsMap, selectedWordId, setSelectedWordId }) => {

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
    <section className={styles.radioTextContainer}>
      {wordsData[0] ? wordsData.map(wordData => {

        const wordObject = wordsMap.get(wordData.id);
        if (!wordObject) return;
        const wordName = wordObject.word;
        
        return (
          <Text
            key={`progressRadioText${wordObject.id}`}
            text={wordName} 
            className={returnClassNameForRadioText(wordObject.id)} 
            onClick={() => setSelectedWordId(wordObject.id)} 
            as="span"
          />
        )
      }) : <h3 className={styles.notFound}>No Progress Data Found!</h3>} 
    </section>
  )
}

export default ProgressRadios;