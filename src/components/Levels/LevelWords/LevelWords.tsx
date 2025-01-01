import React from 'react';
import { Text, Line } from '@/components/atoms';
import { TextArray } from '@/components/molecules';
import styles from './LevelWords.module.css';

import { useTranslate } from '@/hooks';

import { useAppSelector } from '@/store/store';

const LevelWords: React.FC  = () => {

  const translate = useTranslate()

  const words = useAppSelector(state => state.data.words);
  const hoveredLevel = useAppSelector(state => state.appState.hoveredLevel);

  let hoveredLevelWords: string[] = [];
  if (hoveredLevel) {
    const filteredWordObjects = words.filter(wordObject => wordObject.levelName === hoveredLevel)
    hoveredLevelWords = filteredWordObjects.map(wordObject => wordObject.word);
  }

  return (
    <section className={styles.mainGrid}>
      <Text text={hoveredLevel || ''} className={styles.hoveredLevelHeader} as='h2' />
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