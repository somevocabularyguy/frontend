import { Text } from '@/components/atoms';
import { useAppSelector } from '@/store/store';
import { useState, useEffect } from 'react';
import { highlightSubtext } from '@/utils/tsxUtils';

import styles from './TText.module.css';

interface TTextProps {
  wordId: string;
  dataKey?: 'word' | 'meaning' | 'example';
  arrayKey?: 'synonyms' | 'antonyms';
  arrayIndex?: number;
  className?: string;
  highlightKey?: string;
}

const TText: React.FC<TTextProps> = ({ wordId, dataKey, arrayKey, className, arrayIndex, highlightKey }) => {
  const languageArray = useAppSelector(state => state.userData.userData.languageArray)
  const wordResources = useAppSelector(state => state.language.wordResources)

  const [dataIndex, setDataIndex] = useState(0);
  const [dataArray, setDataArray] = useState<string[]>(() => {
    let array: string[] = [];
    if (dataKey) {
      array = languageArray.map(language => wordResources[language][wordId][dataKey]);
    } else if (arrayKey && arrayIndex) {
      array = languageArray.map(language => wordResources[language][wordId][arrayKey][arrayIndex]);
    }
    return array;
  });

  useEffect(() => {
    setDataIndex(0);
  }, [wordId])

  useEffect(() => {
    let array: string[] = [];
    if (dataKey) {
      array = languageArray.map(language => wordResources[language][wordId][dataKey]);
    } else if (arrayKey &&  arrayIndex !== undefined) {
      array = languageArray.map(language => wordResources[language][wordId][arrayKey][arrayIndex]);
    }
    setDataArray(array);
  }, [languageArray, wordId, dataKey, arrayKey, arrayIndex])

  const mergedClassName = `${styles.text} ${className || ''}`

  const handleClick = () => {
    setDataIndex(prev => prev === dataArray.length - 1 ? 0 : prev + 1);
  }

  let word: string | React.JSX.Element = dataArray[dataIndex];

  if (highlightKey && dataIndex === 0) {
    word = highlightSubtext(word, highlightKey);
  }

  return (
    <Text 
      className={mergedClassName}
      onClick={handleClick}
    >{word}</Text>
  );
};

export default TText;
