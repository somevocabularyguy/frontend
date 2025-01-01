import { useEffect } from 'react';

import styles from './LevelSection.module.css';
import { Word } from '@/types';

import { LevelBox, LevelWords, CurrentWords, BottomStrip } from '@/components/organisms';
import { Line } from '@/components/atoms';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateBatch } from '@/store/appStateSlice';

const LevelSection: React.FC = () => {

  const words = useAppSelector(state => state.data.words);
  const isLevelsVisible = useAppSelector(state => state.ui.isLevelsVisible);
  const checkedLevels = useAppSelector(state => state.appState.checkedLevels);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkedLevelsSet = new Set(checkedLevels);
    const newBatch: Word[] = words.filter(wordObject => checkedLevelsSet.has(wordObject.levelName));
    dispatch(updateBatch(newBatch));
  }, [checkedLevels, words, dispatch])

  const classNameForMainGrid = `${styles.mainGrid} ${isLevelsVisible ? styles.levelsOpen : ''}`;

  return (
    <>
      <div className={classNameForMainGrid}>
        <LevelWords />
        <Line height="19.375rem" />
        <LevelBox />
        <Line height="19.375rem" />
        <CurrentWords />
        <Line width="57.5rem" className={styles.stripLine} />
      </div>
      <BottomStrip />
    </>
  )
}

export default LevelSection;