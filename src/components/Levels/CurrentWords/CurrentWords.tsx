"use client"
import styles from './CurrentWords.module.css';
import React, { useState, useRef } from 'react';

import { Text, Line, Button } from '@/components/atoms';
import { ScrollRail } from '@/components/ui';

import { useAppSelector } from '@/store/store';
import { useCustomTranslation } from '@/hooks';

const CurrentWords: React.FC = () => {
  const t = useCustomTranslation('Levels.CurrentWords');

  const batch = useAppSelector(state => state.appState.batch);
  const wordsLanguage = useAppSelector(state => state.userData.userData.languageArray[0]);
  const wordResources = useAppSelector(state => state.language.wordResources);

  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const words: string[] = batch.map(wordObject => wordResources[wordsLanguage][wordObject.id].word)

  const copyToClipboard = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    navigator.clipboard.writeText(words.join(', '));
    setIsCopied(true);
     timeoutRef.current = setTimeout(() => {
      setIsCopied(false)
    }, 2400);
  }

  return (

    <div className={styles.mainDiv}>
      <section className={styles.labelGrid}>
        <Text className={styles.label} as="h2">{t('label')}</Text>
        <div className={styles.amount}>{batch.length}</div>
      </section>
      <Line width="10.5rem"/>
      <article className={styles.wordBox}>
        {words.map((word, index) => (
          <React.Fragment key={word + index}>
            <Text>{word}</Text>
            {index !== words.length - 1 && <Text>{', '}</Text>}
          </React.Fragment>
        ))}
        <ScrollRail height="14.6875rem" className={styles.scrollRail} lineSize="0.125rem"/>
      </article>
      <section className={styles.copySection}>
        <article className={`${styles.messageBox} ${isCopied ? styles.visible : styles.hidden}`}>{t("copiedAlert")}</article>
        <Button text={t('copyButtonText')} className={styles.copyButton} onClick={copyToClipboard} />
      </section>
    </div>
  )
}

export default CurrentWords;