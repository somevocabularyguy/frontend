import { useEffect } from 'react';
import styles from './SignOutPopup.module.css';

import Link from 'next/link';

import { logout } from '@/lib/api';
import { Text, Button } from '@/components/atoms';
import { useCustomTranslation } from '@/hooks';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsSignOutPopupVisible } from '@/store/accountUiSlice';

const SignOutPopup: React.FC = () => {
  const t = useCustomTranslation("Popups.SignOutPopup");
  const dispatch = useAppDispatch();

  const isSignOutPopupVisible = useAppSelector(state => state.accountUi.isSignOutPopupVisible);

  useEffect(() => {
    return () => {
      dispatch(updateIsSignOutPopupVisible(false));
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await logout();
      if (response.status === 200) {
        window.location.href = 'http://localhost:3000';
      }
    } catch (error) {
      console.log(error);
    }
  }

  const closePopup = () => {
    if (isSignOutPopupVisible) {
      dispatch(updateIsSignOutPopupVisible(false));
    }
  }

  const signOutPopupClassName = `${styles.popup} ${isSignOutPopupVisible ? styles.popupVisible : ''}`

  return (
    <section className={signOutPopupClassName}>
      <span className={styles.popupText}>
        {t("text")}
        <Link className={styles.progressLink} href="/settings">
          <Text className={styles.progressLinkText}>{t("link")}</Text>
        </Link>
      </span>
      <div className={styles.buttonsContainer}>
        <Button text={t("backButton")} className={styles.blankButton} onClick={closePopup} />
        <Button text={t("signOutButton")} className={`${styles.blankButton} ${styles.signOutButton}`} onClick={handleLogout} />
      </div>
    </section>
  )
}

export default SignOutPopup;