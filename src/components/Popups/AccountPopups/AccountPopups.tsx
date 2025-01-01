import { useEffect } from 'react';
import styles from './AccountPopups.module.css';

import Link from 'next/link';

import { logout, deleteAccount } from '@/lib/api';
import { Text, Button } from '@/components/atoms';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateLoadingState } from '@/store/dataSlice';
import { updateIsSignOutPopupActive, updateIsDeletePopupActive } from '@/store/accountUiSlice';

const AccountPopup: React.FC = () => {
  const isSignOutPopupActive = useAppSelector(state => state.accountUi.isSignOutPopupActive);
  const isDeletePopupActive = useAppSelector(state => state.accountUi.isDeletePopupActive);


  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(updateIsSignOutPopupActive(false));
      dispatch(updateIsDeletePopupActive(false));
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

  const handleDeleteAccount = async () => {
    dispatch(updateLoadingState(true));
    try {
    const response = await deleteAccount();
      if (response.status === 202) {
        window.location.href = 'http://localhost:3000/settings';
        dispatch(updateLoadingState(false));
      }
    } catch (error) {
      dispatch(updateLoadingState(false));
      window.alert('Error Deleting Account!')
    }
  }

  const closePopup = () => {
    if (isDeletePopupActive) {
      dispatch(updateIsDeletePopupActive(false));
    }
    if (isSignOutPopupActive) {
      dispatch(updateIsSignOutPopupActive(false));
    }
  }

  const deletePopupClassName = `${styles.popup} ${isDeletePopupActive ? styles.deletePopupVisible : ''}`
  const signOutPopupClassName = `${styles.popup} ${isSignOutPopupActive ? styles.signOutPopupVisible : ''}`

  return (
    <>
      <section className={signOutPopupClassName}>
        <span className={styles.popupText}>
          You can delete your local progress data later at the
          <Link className={styles.progressLink} href="/progress">
            <Text text="Progress Page" className={styles.progressLinkText} as="span" />
          </Link>
        </span>
        <div className={styles.buttonsContainer}>
          <Button text="Go Back" className={styles.blankButton} onClick={closePopup} />
          <Button text="Sign Out" className={`${styles.blankButton} ${styles.signOutButton}`} onClick={handleLogout} />
        </div>
      </section>

      <section className={deletePopupClassName}>
        <Text 
          text="Your data on our servers will be permanently deleted after 15 days." 
          className={styles.popupText}
          as="span"
        />
        <Text 
          text="You can cancel deletion by signing in until that time." 
          className={styles.popupText}
          as="span"
        />
        <div className={styles.buttonsContainer}>
          <Button text="Go Back" className={styles.blankButton} onClick={closePopup} />
          <Button text="Delete Account" className={`${styles.blankButton} ${styles.deleteButton}`} onClick={handleDeleteAccount} />
        </div>
      </section>
    </>
  )
}

export default AccountPopup;