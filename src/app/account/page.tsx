"use client"

import { useState, useEffect, useRef } from 'react';
import styles from './styles.module.css';

import { Text, Button } from '@/components/atoms';
import { logout, deleteAccount } from '@/lib/api';

const AccountPage: React.FC = () => {
  const shouldSkipCleanupRef = useRef(false);

  const [isSignOutPopupActive, setIsSignOutPopupActive] = useState(false);
  const [isDeletePopupActive, setIsDeletePopupActive] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    return () => {
      if (!shouldSkipCleanupRef.current) {
        setIsSignOutPopupActive(false);
        setIsDeletePopupActive(false);
        setDeleting(false);
        setIsDeleted(false);
      }
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
    shouldSkipCleanupRef.current = true; 

    setDeleting(true);
    const response = await deleteAccount();
    if (response.status === 202) {
      setIsDeleted(true);
      setDeleting(false);
    }

    shouldSkipCleanupRef.current = false; 
  }

  const openDeletePopup = () => {
    setIsDeletePopupActive(true)
  }

  const openSignOutPopup = () => {
    setIsSignOutPopupActive(true)
  }

  const closePopup = () => {
    if (isDeletePopupActive) {
      setIsDeletePopupActive(false);
    }
    if (isSignOutPopupActive) {
      setIsSignOutPopupActive(false);
    }
  }

  const handleProgressLink = () => {
    window.location.href = "http://localhost:3000/progress";
  }

  const handleMainLink = () => {
    window.location.href = "http://localhost:3000/";
  }

  const overlayClassName = `${styles.overlay} ${isDeletePopupActive || isSignOutPopupActive ? styles.overlayVisible : ''}`;
  const deletePopupClassName = `${styles.popup} ${isDeletePopupActive ? styles.deletePopupVisible : ''}`
  const signOutPopupClassName = `${styles.popup} ${isSignOutPopupActive ? styles.signOutPopupVisible : ''}`
  const deletedClassName = `${styles.deleted} ${isDeleted ? styles.deletedVisible : ''}`

  if (deleting) return <h2>loading...</h2> //todo: Will Change

  return (
    <>
      <main className={styles.mainContainer}>
        <Text text="Account Settings:" as="h2" />
        <Button text="Sign Out" className={styles.buttonType1} onClick={openSignOutPopup} />
        <Button text="Delete Account" className={`${styles.buttonType1} ${styles.deleteButton}`} onClick={openDeletePopup} />

        <section className={signOutPopupClassName}>
          <p className={styles.signOutPopupText}>
            You can delete your local progress data in the 
            <span className={styles.singOutProgressText}> Progress Page </span>
            later.
          </p>
          <Button text="Go Back" className={styles.buttonType1} onClick={closePopup} />
          <Button text="Sign Out" className={`${styles.buttonType1} ${styles.signOutButton}`} onClick={handleLogout} />
        </section>

        <section className={deletePopupClassName}>
          <Text 
            text="All information associated with this account will be permanently deleted after 15 days." 
            className={styles.deletePopupText}
          />
          <Button text="Go Back" className={styles.buttonType1} onClick={closePopup} />
          <Button text="Delete Account" className={`${styles.buttonType1} ${styles.deleteButton}`} onClick={handleDeleteAccount} />
        </section>

        <div className={overlayClassName} onClick={closePopup}></div>

        <section className={deletedClassName}>
          <div className={styles.deletedContainer}>
            <article className={styles.deletedTextContainer}>
              <Text text="Your data on our servers will be permanently deleted in 15 days." className={styles.deletedText} />
              <Text text="You can cancel deletion by signing in within that time." className={styles.deletedText} />
            </article>
            <article className={styles.progressInfoContainer}>
              You can delete your progress in the
              <Text text=" Progress Page " className={styles.progressLink} onClick={handleProgressLink} as="span"/>.
            </article>
            <Text text="Go To Main page" className={styles.deletedButton} onClick={handleMainLink} as="span" />
          </div>
        </section>
      </main>
    </>
  )
}

export default AccountPage;