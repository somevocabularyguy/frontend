"use client";

import styles from './Progress.module.css';

import { useState } from 'react';
import { WordData } from '@/types';

import ProgressRadios from './ProgressRadios';
import WordProgressDisplay from './WordProgressDisplay';
import GeneralProgress from './GeneralProgress';

import { useAppSelector } from '@/store/store';

const Progress: React.FC = () => {

  const [selectedWordId, setSelectedWordId] = useState('')

  const wordsData = useAppSelector(state => state.userData.userData.wordsData);

  const wordsDataMap = new Map<string, WordData>();
  for (let i = 0; i < wordsData.length; i++) {
    wordsDataMap.set(wordsData[i].id, wordsData[i]);
  }

  if (!selectedWordId && wordsData[0]) {
    setSelectedWordId(wordsData[0].id);
  }

  const selectedWordData = wordsDataMap.get(selectedWordId);

  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <section className={styles.leftSection}>
          <WordProgressDisplay 
            selectedWordData={selectedWordData} 
          />
          <ProgressRadios  
            selectedWordId={selectedWordId} 
            setSelectedWordId={setSelectedWordId} 
          />
        </section>
        <GeneralProgress />
      </div>
    </section>
  )
}



export default Progress;