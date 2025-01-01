import styles from './Levels.module.css';

import LevelBox from './LevelBox';
import LevelWords from './LevelWords';
import CurrentWords from './CurrentWords';
import BottomStrip from './BottomStrip';

import { Line } from '@/components/atoms';

import { useAppSelector } from '@/store/store';

const Levels: React.FC = () => {

  const isLevelsVisible = useAppSelector(state => state.ui.isLevelsVisible);

  const classNameForMainGrid = `${styles.mainGrid} ${isLevelsVisible ? styles.levelsVisible : ''}`;

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

export default Levels;