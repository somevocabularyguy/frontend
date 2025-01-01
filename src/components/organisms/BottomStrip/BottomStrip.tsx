import styles from './BottomStrip.module.css';

import { LevelsToggleIcon } from '@/public/icons';
import { Text, Button } from '@/components/atoms';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { toggleIsLevelsVisible } from '@/store/uiSlice';
import { updateIsRandom } from '@/store/wordSlice';


const BottomStrip: React.FC = () => {
  const dispatch = useAppDispatch();

  const isLevelsVisible = useAppSelector(state => state.ui.isLevelsVisible);
  const isRandom = useAppSelector(state => state.word.isRandom);


  const toggleLevels = () => {
    dispatch(toggleIsLevelsVisible(!isLevelsVisible))
  }

  const classNameForPracticeButton = `${styles.toggleButton} ${isRandom ? '' : styles.toggleButtonActive}`; 
  const classNameForRandomButton =  `${styles.toggleButton} ${isRandom ? styles.toggleButtonActive : ''}`;
  const classNameForLevelsToggleIcon = isLevelsVisible ? styles.levelsToggleIconRotated : styles.levelsToggleIcon

  return (
    <section className={styles.bottomStrip}>
      <Button 
        text="Practice" 
        onClick={() => dispatch(updateIsRandom(false))} 
        className={classNameForPracticeButton} 
      />
      <Button 
        text="Random" 
        onClick={() => dispatch(updateIsRandom(true))} 
        className={classNameForRandomButton} 
      />
      <div className={styles.levelsToggleContainer} onClick={toggleLevels}>
        <Text text="Select Levels" className={styles.selectLevelsLabel} as="h2" />
        <LevelsToggleIcon className={classNameForLevelsToggleIcon} />
      </div>
    </section>
  )
}

export default BottomStrip;