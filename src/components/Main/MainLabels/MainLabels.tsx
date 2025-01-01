import React from 'react';
import { Text } from '@/components/atoms';
import { TextArray } from '@/components/molecules';
import { useTranslate } from '@/hooks';

import styles from './MainLabels.module.css';

import { useAppSelector } from '@/store/store';

const MainLabels: React.FC = () => {
  const translate = useTranslate();

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const isShown = useAppSelector(state => state.word.isShown);


  return (
    <section className={styles.container}>
      <div className={styles.wordLabelContainer}>
        <div style={{ width: '6.75rem' }}></div>
        <Text 
          text={displayWordObject?.word || (isRandom ? 'Random' : 'Practice')} className={styles.wordLabel} 
          onClick={displayWordObject?.id ? 
            () => translate(displayWordObject.word) : undefined}
        />
      </div>

      <div className={styles.otherLabelsContainer}>
        <div className={styles.shownLabelGroup}>
          <Text text="Definition:" className={styles.headLabel} />
          <article className={styles.dynamicLabelContainer}>
            {isShown && 
              <Text 
                text={displayWordObject?.definition || ''} 
                className={styles.dynamicLabel} 
                onClick={displayWordObject?.id && isShown ? 
                  () => translate(displayWordObject.definition) : undefined}
              /> 
            }
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text text="Example:" className={styles.headLabel} />
          <article className={styles.dynamicLabelContainer}>
            {isShown && 
              <Text 
                text={isShown && displayWordObject?.example || ''} 
                className={styles.dynamicLabel} 
                onClick={displayWordObject?.id && isShown ? 
                  () => translate(displayWordObject.example) : undefined}
              /> 
            }
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text text="Synonyms:" className={styles.headLabel} />
          <article className={styles.dynamicLabelContainer}>
            {(displayWordObject && isShown) ? 
              displayWordObject.synonyms.map((synonym, index, array) => (
                <React.Fragment key={synonym + index}>
                  <Text 
                    text={synonym}
                    className={styles.dynamicLabel}
                    as="span"
                    onClick={() => translate(synonym)}
                  />
                  {index !==  array.length - 1 && <Text text="-"/>}
                </React.Fragment>
              ))
            : <Text text='' />}
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text text="Antonyms:" className={styles.headLabel} />
          <article className={styles.dynamicLabelContainer}>
            {(displayWordObject && isShown) ? 
              displayWordObject.antonyms.map((antonym, index, array) => (
                <React.Fragment key={antonym + index}>
                  <Text 
                    text={antonym}
                    className={styles.dynamicLabel}
                    as="span"
                    onClick={() => translate(antonym)}
                  />
                  {index !==  array.length - 1 && <Text text="-"/>}
                </React.Fragment>
              ))
            : <Text text='' />}
          </article>
        </div>

      </div>
    </section>
  )
}

export default MainLabels;