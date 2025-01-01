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

  const filteredLevels = levels.filter(levelObject => levelObject.levelName.startsWith(levelKey));

  return (
    <section className={styles.levelsContainer}>
      {filteredLevels.map(levelObject => {
        const levelName = levelObject.levelName;
        const levelColor = levelObject.colorValue;
        return (
          <Level 
            key={levelName} 
            levelName={levelName} 
            colorValue={levelColor} 
          />
        )
      })}
    </section>
  )
}

export default LevelArray;