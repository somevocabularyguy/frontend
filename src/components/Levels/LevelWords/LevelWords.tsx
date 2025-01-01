import React, { useState, useEffect } from 'react';
import styles from './LevelWords.module.css';
import { Word } from '@/types';

import { Text, Line, TText } from '@/components/atoms';

import { useCustomTranslation } from '@/hooks';
import { extractParts } from '@/utils/generalUtils';

import { useAppSelector } from '@/store/store';

const LevelWords: React.FC  = () => {
  const t = useCustomTranslation('Levels.LevelWords');

  const hoveredLevelObject = useAppSelector(state => state.appState.hoveredLevelObject);

  const returnHoveredLevelText = () => {
    let hoveredLevelText = '';
    if (hoveredLevelObject) {
      const { string, number } = extractParts(hoveredLevelObject.levelName);
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
        {hoveredLevelObject && hoveredLevelObject.wordIds.map((id, index) => (
          <div 
            className={styles.wordContainer}
            key={`hoveredWord${index}`} 
          >
            <TText 
              className={styles.levelWord} 
              wordId={id}
              dataKey='word'
            />
          </div>
        ))}
      </article>
    </section>
  )
}

export default LevelWords;