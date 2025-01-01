import { useEffect } from 'react';
import styles from './DeletePopup.module.css';

import { deleteAccount } from '@/lib/api';
import { Text, Button } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateLoadingState } from '@/store/loadingSlice';
import { updateIsDeletePopupVisible } from '@/store/accountUiSlice';

const DeletePopup: React.FC = () => {
  const t = useCustomTranslation("Popups.DeletePopup");
  const dispatch = useAppDispatch();

  const isDeletePopupVisible = useAppSelector(state => state.accountUi.isDeletePopupVisible);

  useEffect(() => {
    return () => {
      dispatch(updateIsDeletePopupVisible(false));
    }
  }, []);

  const handleDeleteAccount = async () => {
    dispatch(updateLoadingState(true));
    try {
    const response = await deleteAccount();
      if (response.status === 202) {
        window.alert(t("deletedAlert"));
        window.location.href = 'http://localhost:3000/settings';
        dispatch(updateLoadingState(false));
      }
    } catch (error) {
      dispatch(updateLoadingState(false));
      window.alert(t("deleteAlert"));
    }
  }

  const closePopup = () => {
    if (isDeletePopupVisible) {
      dispatch(updateIsDeletePopupVisible(false));
    }
  }

  const deletePopupClassName = `${styles.popup} ${isDeletePopupVisible ? styles.popupVisible : ''}`

  return (
    <section className={deletePopupClassName}>
      <Text className={styles.popupText}>{t("text1")}</Text>
      <Text className={styles.popupText}>{t("text2")}</Text>
      <div className={styles.buttonsContainer}>
        <Button text={t("backButton")} className={styles.blankButton} onClick={closePopup} />
        <Button text={t("deleteButton")} className={`${styles.blankButton} ${styles.deleteButton}`} onClick={handleDeleteAccount} />
      </div>
    </section>
  )
}

export default DeletePopup;