import styles from './BottomStrip.module.css';

import { ArrowIcon } from '#/public/icons';
import { Text, Button } from '@/components/atoms';

import { useAppDispatch, useAppSelector } from '@/store/store';
import { updateIsLevelsVisible } from '@/store/uiSlice';
import { updateIsRandom } from '@/store/wordSlice';

import { useCustomTranslation } from '@/hooks';

const BottomStrip: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation('Levels.BottomStrip');

  const isLevelsVisible = useAppSelector(state => state.ui.isLevelsVisible);
  const isRandom = useAppSelector(state => state.word.isRandom);


  const toggleLevels = () => {
    dispatch(updateIsLevelsVisible(!isLevelsVisible))
  }

  const classNameForPracticeButton = `${styles.toggleButton} ${isRandom ? '' : styles.toggleButtonActive}`; 
  const classNameForRandomButton =  `${styles.toggleButton} ${isRandom ? styles.toggleButtonActive : ''}`;
  const classNameForLevelsToggleIcon = isLevelsVisible ? styles.levelsToggleIconRotated : styles.levelsToggleIcon

  return (
    <section className={styles.bottomStrip}>
      <Button 
        text={t("practiceButtonText")} 
        onClick={() => dispatch(updateIsRandom(false))} 
        className={classNameForPracticeButton} 
      />
      <Button 
        text={t("randomButtonText")} 
        onClick={() => dispatch(updateIsRandom(true))} 
        className={classNameForRandomButton} 
      />
      <div className={styles.levelsToggleContainer} onClick={toggleLevels}>
        <Text className={styles.selectLevelsLabel} as="h2">{t("selectLevelsText")}</Text>
        <ArrowIcon className={classNameForLevelsToggleIcon} />
      </div>
    </section>
  )
}

export default BottomStrip;