"use client";

import React from 'react';
import { Level } from '@/components/atoms/index';
import styles from './LevelArray.module.css';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateHoveredLevel, updateCheckedLevels } from '@/store/appStateSlice';


const extractNumberFromLevelName = (levelName: string) => {
  const match = levelName.match(/\d+/);
  return match ? parseInt(match[0], 10) : null;
}

interface LevelArrayProps {
  levelKey: string;
}
const LevelArray: React.FC<LevelArrayProps> = ({ levelKey }) => {
  const dispatch = useAppDispatch();

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);
  const levels = useAppSelector(state => state.appState.levels);

  const filteredLevels = levels.filter(levelObject => levelObject.levelName.startsWith(levelKey));

  const handleLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    const newCheckedLevels = checked ? 
      [...checkedLevels, name] : checkedLevels.filter(level => level !== name);
    dispatch(updateCheckedLevels(newCheckedLevels));
  };

  return (
    <section className={styles.levelsContainer}>
      {filteredLevels.map(levelObject => {
        const levelName = levelObject.levelName;
        const levelColor = levelObject.colorValue;
        const levelNumber = extractNumberFromLevelName(levelName);
        if (!levelNumber) return;
        return (
          <Level 
            key={levelName} 
            levelName={levelName} 
            levelNumber={levelNumber} 
            colorValue={levelColor} 
            onChange={handleLevelChange} 
            onMouseEnter={() => {
              dispatch(updateHoveredLevel(levelObject.levelName))
              localStorage.setItem('hoveredLevel', JSON.stringify(levelObject.levelName))
            }} 
          />
        )
      })}
    </section>
  )
}

export default LevelArray;