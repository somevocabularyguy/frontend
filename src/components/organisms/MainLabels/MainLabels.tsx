import React from 'react';
import { Text } from '@/components/atoms';
import { TextArray } from '@/components/molecules';
import { useContextMenu, useTranslate } from '@/hooks';

import styles from './MainLabels.module.css';

import { useAppSelector } from '@/store/store';

const MainLabels: React.FC = () => {
  const handleContextMenu = useContextMenu();
  const translate = useTranslate();

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const isShown = useAppSelector(state => state.word.isShown);


  return (
    <section className={styles.mainGrid}>
      <Text 
        text={displayWordObject?.word || (isRandom ? 'Random' : 'Practice')} className={styles.wordLabel} 
        onContextMenu={handleContextMenu} 
        onClick={displayWordObject ? 
          () => translate(displayWordObject.word) : 
        undefined}
      />

      <Text text="Definition:" className={styles.headLabel} />
      <article className={styles.shownTextContainer}>
        {isShown ? 
          <Text 
            text={displayWordObject?.definition || ''} 
            className={styles.dynamicLabel} 
            onClick={displayWordObject?.id && isShown ? 
              () => translate(displayWordObject.definition) : undefined}
          /> 
        : <Text text='' />}
      </article>

      <Text text="Example:" className={styles.headLabel} />
      <article className={styles.shownTextContainer}>
        {isShown ? 
          <Text 
            text={displayWordObject?.example || ''}
            className={styles.dynamicLabel} 
            onClick={displayWordObject?.id && isShown ? 
              () => translate(displayWordObject.example) : undefined}
          /> 
        : <Text text='' />}
      </article>

      <Text text="Synonyms:" className={styles.headLabel} />
      <article className={styles.shownTextContainer}>
        {(displayWordObject && isShown) ? 
          <TextArray 
            array={displayWordObject.synonyms} 
            arrayName='synonyms' 
            itemClassName={styles.dynamicLabel}
            textType="inline"
          />
        : <Text text='' />}
      </article>

      <Text text="Antonyms:" className={styles.headLabel} />
      <article className={styles.shownTextContainer}>
        {(displayWordObject && isShown) ? 
          <TextArray 
            array={displayWordObject.antonyms} 
            arrayName='antonyms' 
            itemClassName={styles.dynamicLabel}
            textType="inline"
          />
        : <Text text='' />}
      </article>
    </section>
  )
}

export default MainLabels;