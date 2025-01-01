import React from 'react';
import styles from './LevelWords.module.css';
import { Word } from '@/types';

import { Text, Line } from '@/components/atoms';

import { useTranslate, useCustomTranslation } from '@/hooks';
import { extractParts } from '@/utils/generalUtils';

import { useAppSelector } from '@/store/store';

const LevelWords: React.FC  = () => {
  const { t } = useCustomTranslation('Levels.LevelWords');

  const translate = useTranslate()

  const words = useAppSelector(state => state.data.words);
  const hoveredLevel = useAppSelector(state => state.appState.hoveredLevel);

  let filteredWordObjects: Word[] = [];
  if (hoveredLevel) {
    filteredWordObjects = words.filter(wordObject => wordObject.levelName === hoveredLevel)
  }

  const returnHoveredLevelText = () => {
    let hoveredLevelText = '';
    if (hoveredLevel) {
      const { string, number } = extractParts(hoveredLevel);
      if (string) {
        hoveredLevelText =  t(string) + number;
      }
    }
    return hoveredLevelText;
  }

  return (
    <section className={styles.mainGrid}>
      <Text className={styles.hoveredLevelHeader} as='h2'>{returnHoveredLevelText()}</Text>
      <Line width={'9.75rem'} />
      <article>
        {filteredWordObjects.map((wordObject, index) => (
          <Text 
            key={`hoveredWord${index}`} 
            className={styles.levelWord} 
            onClick={() => translate(wordObject.id)}
          >{wordObject.word}</Text>
        ))}
      </article>
    </section>
  )
}

export default LevelWords;