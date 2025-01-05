import styles from './GeneralProgress.module.css';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsProgressDeletePopupVisible } from '@/store/progressUiSlice';

import { Text, Button } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';

const GeneralProgress: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation('Progress.GeneralProgress')

  const openProgressDeletePopup = () => {
    dispatch(updateIsProgressDeletePopupVisible(true));
  }

  const userData = useAppSelector(state => state.userData.userData);

  const totalTimeSpent = userData.totalUseTime;
  const hours = Math.floor(totalTimeSpent / (1000 * 60 * 60));
  const minutes = Math.floor(totalTimeSpent / (1000 * 60));
  const seconds = Math.floor((totalTimeSpent % (1000 * 60)) / 1000);

  const returnDoubleDigit = (number: number) => {
    return number.toString().padStart(2, '0');
  };

  let timeSpentText = `${returnDoubleDigit(hours)}:${returnDoubleDigit(minutes)}:${returnDoubleDigit(seconds)}`;

  return (
    <span className={styles.container}>
      <div className={styles.timeSpentContainer}>
        <Text className={styles.timeSpentLabel}>{t('timeSpentLabel')}</Text>
        <Text className={styles.timeSpentNumber}>{timeSpentText}</Text>
      </div>
      <Button className={styles.deleteProgressButton} text={t('deleteButton')} onClick={openProgressDeletePopup} />
    </span>
  )
}

export default GeneralProgress;