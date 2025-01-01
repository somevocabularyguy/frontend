"use client";

import styles from './styles.module.css';

import { useState } from 'react';
import { Word, WordData } from '@/types';

import { WordProgressDisplay, ProgressRadios } from '@/components/organisms';

import { useAppSelector } from '@/store/store';

const ProgressPage: React.FC = () => {

  const [selectedWordId, setSelectedWordId] = useState('')

  const userData = useAppSelector(state => state.userData.userData);
  const wordsData = userData.wordsData;
  const wordsDataMap = new Map<string, WordData>();
  for (let i = 0; i < wordsData.length; i++) {
    wordsDataMap.set(wordsData[i].id, wordsData[i]);
  }

  const words = useAppSelector(state => state.data.words);
  const wordsMap = new Map<string, Word>();

  for (let i = 0; i < words.length; i++) {
    wordsMap.set(words[i].id, words[i]);
  }

  if (!selectedWordId && wordsData[0]) {
    setSelectedWordId(wordsData[0].id);
  }

  const selectedWordData = wordsDataMap.get(selectedWordId);
  const selectedWordObject = wordsMap.get(selectedWordId);

  
  return (
    <section className={styles.container}>
      <ProgressRadios wordsMap={wordsMap} selectedWordId={selectedWordId} setSelectedWordId={setSelectedWordId} />
      <WordProgressDisplay selectedWordData={selectedWordData} selectedWordObject={selectedWordObject} />
    </section>
  )
}



export default ProgressPage;