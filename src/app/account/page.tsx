"use client"

import styles from './styles.module.css';

import { useAppDispatch } from '@/store/store';
import { updateIsSignOutPopupActive, updateIsDeletePopupActive } from '@/store/accountUiSlice';

import { Text, Button } from '@/components/atoms';
import { AccountPopups } from '@/components/Popups';

const AccountPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const openDeletePopup = () => {
    dispatch(updateIsDeletePopupActive(true));
  }

  const openSignOutPopup = () => {
    dispatch(updateIsSignOutPopupActive(true));
  }

  return (
    <>
      <main className={styles.mainContainer}>
        <Text text="Account Settings:" as="h2" />
        <Button text="Sign Out" className={styles.blankButton} onClick={openSignOutPopup} />
        <Button text="Delete Account" className={`${styles.blankButton} ${styles.deleteButton}`} onClick={openDeletePopup} />
        <AccountPopups />
      </main>
    </>
  )
}

export default AccountPage;