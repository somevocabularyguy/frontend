"use client";

import { useEffect } from 'react';
import styles from './Sidebar.module.css';

import { usePathname } from 'next/navigation'
import Link from 'next/link';

import { updateIsSidebarVisible } from '@/store/uiSlice';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsSignInPopupVisible, updateIsSignOutPopupVisible } from '@/store/accountUiSlice';

import { Line, Text, Button } from '@/components/atoms';

import { MainIcon, PracticeIcon, FeedbackIcon, ProgressIcon, InfoIcon, SettingsIcon } from '#/public/icons';
import { useCustomTranslation } from '@/hooks';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const t = useCustomTranslation("Sidebar");

  const isSidebarVisible = useAppSelector(state => state.ui.isSidebarVisible);
  const isSignedIn = useAppSelector(state => state.userSettings.isSignedIn)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
      const thresholdInRem = 16;
      const clientXInRem = event.clientX / rootFontSize;

      if (clientXInRem < thresholdInRem && !isSidebarVisible) {
        dispatch(updateIsSidebarVisible(true));
      } else if (clientXInRem >= thresholdInRem && isSidebarVisible) {
        dispatch(updateIsSidebarVisible(false));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isSidebarVisible, dispatch]);

  const currentPath = usePathname()

  const returnLinkClass = (linkPath: string) => {
    let linkClass = `${styles.sidebarLink} `
    if (linkPath === currentPath) {
      linkClass += styles.activeLink;
    }
    return linkClass;
  }

  const sidebarClassName = `${styles.sidebarContainer} ${isSidebarVisible ? styles.sidebarVisible : ''}`

  const openSignInPopup = () => {
    dispatch(updateIsSignInPopupVisible(true));
  }

  const openSignOutPopup = () => {
    dispatch(updateIsSignOutPopupVisible(true));
  }

  return (
    <>
      <Link href="/" className={styles.mainLink}>
        <MainIcon height="3.75rem"/>
      </Link>

      <div className={sidebarClassName}>
        <div className={styles.blankDiv}></div>

        <Line width="11.875rem" height="0.1rem" className={styles.linkDividerLine}/>

        <Link href="/" className={returnLinkClass('/')}>
          <PracticeIcon width="1.8rem" height="1.8rem" style={{ padding: '0.225rem'}}/>
          <Text className={styles.sidebarLinkText}>{t("practice")}</Text>
        </Link>
        <Link href="/settings" className={returnLinkClass('/settings')}>
          <SettingsIcon width="2.25rem" height="2.25rem" />
          <Text className={styles.sidebarLinkText}>{t("settings")}</Text>
        </Link>
        <Link href="/progress" className={returnLinkClass('/progress')}>
          <ProgressIcon width="2.25rem" height="2.25rem" />
          <Text className={styles.sidebarLinkText}>{t("progress")}</Text>
        </Link>

        <Line width="11.875rem" height="0.1rem" className={styles.linkDividerLine}/>

        <Link href="/feedback" className={returnLinkClass('/feedback')}>
          <FeedbackIcon height="2.25rem" width="2.25rem" />
          <Text className={styles.sidebarLinkText}>{t("feedback")}</Text>
        </Link>
        <Link href="/about" className={returnLinkClass('/about')}>
          <InfoIcon width="2.25rem" height="2.25rem" fill="#e8eaed" />
          <Text className={styles.sidebarLinkText}>{t('about')}</Text>
        </Link>

        <Line width="11.875rem" height="0.1rem" className={styles.linkDividerLine}/>

        {isSignedIn ? 
          <Button text={t("signOut")} className={styles.signOutButton} onClick={openSignOutPopup} />
          :
          <Button text={t("signIn")} className={styles.signInButton} onClick={openSignInPopup} />
        }

      </div>
    </>
  )
}

export default Sidebar;