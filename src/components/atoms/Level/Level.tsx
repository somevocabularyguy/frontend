"use client";

import React from 'react';
import styles from './Level.module.css';
import { RGB } from '@/types';

import { Text } from '@/components/atoms';
import { extractParts } from '@/utils/generalUtils';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { addCheckedLevel, removeCheckedLevel, updateHoveredLevel } from '@/store/appStateSlice';

interface LevelProps {
  levelName: string;
  colorValue: RGB;
}

const Level: React.FC<LevelProps> = ({ levelName, colorValue }) => {
  const dispatch = useAppDispatch()

  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);

  const handleLevelOnHover = () => {
    dispatch(updateHoveredLevel(levelName))
  }

 const handleLevelChange = () => {
    if (checkedLevels.includes(levelName)) {
      dispatch(removeCheckedLevel(levelName))
    } else {
      dispatch(addCheckedLevel(levelName))
    }
  }

  const levelNumber = extractParts(levelName).number;

  const levelStyle = { backgroundColor: `rgb(${colorValue.r}, ${colorValue.g}, ${colorValue.b})`};
  const levelClassName = `${styles.level} ${checkedLevels.includes(levelName) ? styles.levelChecked : ''}`

  return (
    <div
      style={levelStyle}
      className={levelClassName}
      onMouseEnter={handleLevelOnHover}
      onClick={handleLevelChange}
    >
      <Text>{'lv' + levelNumber}</Text>
    </div>
  )
}

export default Level;