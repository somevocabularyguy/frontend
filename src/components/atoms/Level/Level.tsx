"use client";

import React from 'react';
import styles from './Level.module.css';
import { RGB } from '@/types';

import { useAppSelector } from '@/store/store';

interface LevelProps {
  levelName: string;
  levelNumber: number;
  colorValue: RGB;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onMouseEnter: React.MouseEventHandler<HTMLElement>;
}

const Level: React.FC<LevelProps> = ({ levelName, levelNumber, colorValue, onChange, onMouseEnter }) => {

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  return (
    <label
      htmlFor={levelName}
      style={{backgroundColor: `rgb(${colorValue.r}, ${colorValue.g}, ${colorValue.b})`}}
      className={`${styles.checkboxLabel} ${checkedLevels.includes(levelName) ? 
        styles.checkboxChecked : styles.checkboxNotChecked}`}
      onMouseEnter={onMouseEnter}
    >
      <input  
        id={levelName}
        className={styles.checkbox}
        type="checkbox"
        name={levelName}
        checked={checkedLevels.includes(levelName)}
        onChange={onChange}
      />
      lv{levelNumber}
    </label>
  )
}

export default Level;