import React from 'react';
import { Text } from '@/components/atoms';
import { useTranslate, useCustomTranslation } from '@/hooks';

import styles from './MainLabels.module.css';

import { useAppSelector } from '@/store/store';

const MainLabels: React.FC = () => {
  const { t } = useCustomTranslation("Main.MainLabels");

  const translate = useTranslate();

  const displayWordObject = useAppSelector(state => state.word.displayWordObject);
  const isRandom = useAppSelector(state => state.word.isRandom);
  const isShown = useAppSelector(state => state.word.isShown);


  return (
    <section className={styles.container}>
      <div className={styles.wordLabelContainer}>
        <div style={{ width: '6.75rem' }}></div>
        <Text 
          className={styles.wordLabel} 
          onClick={displayWordObject?.id ? 
            () => translate(displayWordObject.word) : undefined}
          as="p"
        >{displayWordObject?.word || (isRandom ? t("randomText") : t("practiceText"))}</Text>
      </div>

      <div className={styles.otherLabelsContainer}>
        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("definitionText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {isShown && 
              <Text  
                className={styles.dynamicLabel} 
                onClick={displayWordObject?.id && isShown ? 
                  () => translate(displayWordObject.definition) : undefined}
              >{displayWordObject?.definition || ''}</Text>
            }
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("exampleText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {isShown && 
              <Text  
                className={styles.dynamicLabel} 
                onClick={displayWordObject?.id && isShown ? 
                  () => translate(displayWordObject.example) : undefined}
              >{isShown && displayWordObject?.example || ''}</Text>
            }
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("synonymsText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {(displayWordObject && isShown) ? 
              displayWordObject.synonyms.map((synonym, index, array) => (
                <React.Fragment key={synonym + index}>
                  <Text 
                    className={styles.dynamicLabel}
                    onClick={() => translate(synonym)}
                  >{synonym}</Text>
                  {index !==  array.length - 1 && <Text>-</Text>}
                </React.Fragment>
              ))
            : <Text></Text>}
          </article>
        </div>

        <div className={styles.shownLabelGroup}>
          <Text className={styles.headLabel}>{t("antonymsText")}</Text>
          <article className={styles.dynamicLabelContainer}>
            {(displayWordObject && isShown) ? 
              displayWordObject.antonyms.map((antonym, index, array) => (
                <React.Fragment key={antonym + index}>
                  <Text 
                    className={styles.dynamicLabel}
                    onClick={() => translate(antonym)}
                  >{antonym}</Text>
                  {index !==  array.length - 1 && <Text>-</Text>}
                </React.Fragment>
              ))
            : <Text></Text>}
          </article>
        </div>

      </div>
    </section>
  )
}

export default MainLabels;