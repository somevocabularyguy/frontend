"use client";

import React from 'react';
import { Level } from '@/components/atoms/index';
import styles from './LevelArray.module.css';

import { useAppSelector } from '@/store/store';

interface LevelArrayProps {
  levelKey: string;
}
const LevelArray: React.FC<LevelArrayProps> = ({ levelKey }) => {

  const levels = useAppSelector(state => state.appState.levels);
  // console.log("🚀 ~ file: LevelArray.tsx:15 ~ levels:", levels);

  const filteredLevels = levels.filter(levelObject => levelObject.levelName.startsWith(levelKey));
  // console.log("🚀 ~ file: LevelArray.tsx:17 ~ filteredLevels:", filteredLevels);
  
  return (
    <section className={styles.levelsContainer}>
      {filteredLevels.map(levelObject => {
        return (
          <Level 
            key={levelObject.levelName} 
            levelObject={levelObject}
          />
        )
      })}
    </section>
  )
}

export default LevelArray;