import React from 'react';
import styles from './LevelWords.module.css';

import { Text, Line } from '@/components/atoms';

import { useTranslate, useCustomTranslation } from '@/hooks';
import { extractParts } from '@/utils/generalUtils';

import { useAppSelector } from '@/store/store';

const LevelWords: React.FC  = () => {
  const t = useCustomTranslation('Levels.LevelWords');

  const translate = useTranslate()

  const words = useAppSelector(state => state.data.words);
  const hoveredLevel = useAppSelector(state => state.appState.hoveredLevel);

  let hoveredLevelWords: string[] = [];
  if (hoveredLevel) {
    const filteredWordObjects = words.filter(wordObject => wordObject.levelName === hoveredLevel)
    hoveredLevelWords = filteredWordObjects.map(wordObject => wordObject.word);
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
      <Text text={returnHoveredLevelText()} className={styles.hoveredLevelHeader} as='h2' />
      <Line width={'9.75rem'} />
      <article>
        {hoveredLevelWords.map((wordString, index) => (
          <Text 
            key={`hoveredWord${index}`} 
            text={wordString} 
            className={styles.levelWord} 
            as='span'
            onClick={() => translate(wordString)}
          />
        ))}
      </article>
    </section>
  )
}

export default LevelWords;