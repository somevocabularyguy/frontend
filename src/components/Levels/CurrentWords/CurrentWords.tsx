"use client"
import React, { useState, useRef } from 'react';
import { Text, Line, Button } from '@/components/atoms';
import { ScrollRail } from '@/components/ui';
import styles from './CurrentWords.module.css';

import { useAppSelector } from '@/store/store';

const CurrentWords: React.FC = () => {

  const batch = useAppSelector(state => state.appState.batch);
  const [isCopied, setIsCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentWordsText: string = batch.map(wordObject => wordObject.word).join(', ');


  const copyToClipboard = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    navigator.clipboard.writeText(currentWordsText);
    setIsCopied(true);
     timeoutRef.current = setTimeout(() => {
      setIsCopied(false)
    }, 2400);
  }

  return (

    <div className={styles.mainDiv}>
      <section className={styles.labelGrid}>
        <Text text="Current Words" as="h2" className={styles.label}/>
        <div className={styles.amount}>{batch.length}</div>
      </section>
      <Line width="10.5rem"/>
      <article className={styles.wordBox}>
        <Text text={currentWordsText} className={styles.word} as="span"/>
        <ScrollRail height="14.6875rem" className={styles.scrollRail} lineSize="0.125rem"/>
      </article>
      <section className={styles.copySection}>
        <article className={`${styles.messageBox} ${isCopied ? styles.visible : styles.hidden}`}>Copied To Clipboard!</article>
        <Button text="Copy" className={styles.copyButton} onClick={copyToClipboard} />
      </section>
    </div>
  )
}

export default CurrentWords;