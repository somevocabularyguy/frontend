"use client";

import { useEffect } from 'react';
import styles from './Sidebar.module.css';

import { usePathname } from 'next/navigation'
import Link from 'next/link';

import { useAppSelector, useAppDispatch } from '@/store/store';
import { updateIsSidebarVisible } from '@/store/uiSlice';
import { updateIsSignInPopupVisible } from '@/store/accountUiSlice';

import { Line, Text, Button } from '@/components/atoms';

import { MainIcon, HomeIcon, FeedbackIcon, ProgressIcon, InfoIcon, SettingsIcon, AccountIcon } from '@/public/icons';
import { useCustomTranslation } from '@/hooks';

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { t } = useCustomTranslation("Sidebar");

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

  return (
    <>
      <Link href="/" className={styles.mainLink}>
        <MainIcon height="3.75rem"/>
      </Link>

      <div className={sidebarClassName}>
        <div className={styles.blankDiv}></div>

        <Line width="11.875rem" height="0.1rem" className={styles.linkDividerLine}/>

        <Link href="/" className={returnLinkClass('/')}>
          <HomeIcon width="2.25rem" height="2.25rem" />
          <Text className={styles.sidebarLinkText}>{t("home")}</Text>
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

        {/* <Link href="/user-guide" className={returnLinkClass('/user-guide')}>
          <GuideIcon height="2rem" width="2.25rem" />
          <Text text="How To Use" className={styles.sidebarLinkText} as="span" />
        </Link> */}
        <Link href="/feedback" className={returnLinkClass('/feedback')}>
          <FeedbackIcon height="2.25rem" width="2.25rem" />
          <Text className={styles.sidebarLinkText}>{t("feedback")}</Text>
        </Link>
        <Link href="/about" className={returnLinkClass('/about')}>
          <InfoIcon width="2.25rem" height="2.25rem" />
          <Text className={styles.sidebarLinkText}>{t('about')}</Text>
        </Link>

        <Line width="11.875rem" height="0.1rem" className={styles.linkDividerLine}/>

        {isSignedIn ? 
          <Link href="/account" className={returnLinkClass('/about')}>
            <AccountIcon width="2.25rem" height="2.25rem" />
            <Text className={styles.sidebarLinkText}>{t("account")}</Text>
          </Link>
          :
          <Button text={t("signIn")} className={styles.signInButton} onClick={openSignInPopup} />
        }

      </div>
    </>
  )
}

export default Sidebar;