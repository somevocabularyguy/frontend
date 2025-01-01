import React from 'react';
import { Text, Line } from '@/components/atoms/index';
import { TextArray } from '@/components/molecules/index';
import styles from './LevelWords.module.css';

import { useAppSelector } from '@/store/store';

const LevelWords: React.FC  = () => {

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
        <TextArray 
          array={hoveredLevelWords} 
          arrayName='levelWords'
          itemClassName={styles.levelWord} 
          textType='block' 
        />
      </article>
    </section>
  )
}

export default LevelWords;