import { useEffect } from 'react';
import styles from './ProgressDeletePopup.module.css';

import { deleteProgressData } from '@/lib/api';
import { Text, Button } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';

import { updateIsLoading } from '@/store/loadingSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateWordsData, updateUserUseTime } from '@/store/userDataSlice';
import { updateIsProgressDeletePopupVisible } from '@/store/progressUiSlice';

const DeletePopup: React.FC = () => {
  const t = useCustomTranslation("Popups.ProgressDeletePopup");
  const dispatch = useAppDispatch();

  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn);
  const isProgressDeletePopupVisible = useAppSelector(state => state.progressUi.isProgressDeletePopupVisible);

  useEffect(() => {
    return () => {
      dispatch(updateIsProgressDeletePopupVisible(false));
    }
  }, []);

  const handleDeleteProgress = async () => {
    dispatch(updateIsLoading(true));

    dispatch(updateWordsData([]));
    dispatch(updateUserUseTime(0));
    if (isSignedIn) {
      try {
        await deleteProgressData();
      } catch (error) {
        window.alert(t("deleteAlert"));
        console.log(error);
      }
    }
    dispatch(updateIsProgressDeletePopupVisible(false));
    dispatch(updateIsLoading(false));
  }

  const closePopup = () => {
    if (isProgressDeletePopupVisible) {
      dispatch(updateIsProgressDeletePopupVisible(false));
    }
  }

  const progressDeletePopupClassName = `${styles.popup} ${isProgressDeletePopupVisible ? styles.popupVisible : ''}`

  return (
    <section className={progressDeletePopupClassName}>
      <Text className={styles.popupText}>{isSignedIn ? t("text1") : t("text1-signedIn")}</Text>
      <Text className={styles.popupText}>{t("text2")}</Text>
      <div className={styles.buttonsContainer}>
        <Button text={t("backButton")} className={styles.blankButton} onClick={closePopup} />
        <Button text={t("deleteButton")} className={`${styles.blankButton} ${styles.deleteButton}`} onClick={handleDeleteProgress} />
      </div>
    </section>
  )
}

export default DeletePopup;